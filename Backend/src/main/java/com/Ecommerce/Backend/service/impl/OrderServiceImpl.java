package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.domain.OrderStatus;
import com.Ecommerce.Backend.domain.PaymentType;
import com.Ecommerce.Backend.mapper.OrderMapper;
import com.Ecommerce.Backend.model.*;
import com.Ecommerce.Backend.payload.dto.OrderDto;
import com.Ecommerce.Backend.repository.OrderRepository;
import com.Ecommerce.Backend.repository.ProductRepository;
import com.Ecommerce.Backend.service.OrderService;
import com.Ecommerce.Backend.service.StripeService;
import com.Ecommerce.Backend.service.UserService;
import com.stripe.model.PaymentIntent;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserService userService;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final StripeService stripeService;

    @Override
    public OrderDto createOrder(OrderDto orderDto) throws Exception {
        User cashier = userService.getCurrentUser();
        Branch branch = cashier.getBranch();
        if(branch == null){
            throw new Exception("Branch not found");
        }

        // Calculate total amount from items
        double total = orderDto.getItems().stream()
                .mapToDouble(itemDto -> {
                    Product product = productRepository.findById(itemDto.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemDto.getProductId()));
                    return product.getSellingPrice() * itemDto.getQuantity();
                })
                .sum();

        // Create a Stripe PaymentIntent
        PaymentIntent paymentIntent = stripeService.createPaymentIntent(
                Math.round(total * 100), // Amount in cents
                "usd",
                "Payment for order by cashier " + cashier.getId()
        );

        Order order = Order.builder()
                .branch(branch)
                .cashier(cashier)
                .customer(orderDto.getCustomer())
                .paymentType(orderDto.getPaymentType())
                .totalAmount(total)
                .stripePaymentIntentId(paymentIntent.getId())
                .paymentCompleted(false)
                .build();

        // Map order items now linking to order
        List<OrderItem> orderItems = orderDto.getItems().stream().map(
                itemDto -> {
                    Product product = productRepository.findById(itemDto.getProductId())
                            .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + itemDto.getProductId()));

                    return OrderItem.builder()
                            .product(product)
                            .quantity(itemDto.getQuantity())
                            .price(product.getSellingPrice() * itemDto.getQuantity())
                            .order(order)
                            .build();
                }
        ).toList();

        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        return OrderMapper.toDto(savedOrder);
    }

    // Other methods as before unchanged...

    @Override
    public OrderDto getOrderById(Long id) throws Exception {
        return orderRepository.findById(id)
                .map(OrderMapper::toDto)
                .orElseThrow(() -> new Exception("Order not found with id: " + id));
    }

    @Override
    public List<OrderDto> getOrdersByBranch(Long branchId,
                                            Long customerId,
                                            Long cashierId,
                                            PaymentType paymentType,
                                            OrderStatus orderStatus) {
        return orderRepository.findByBranchId(branchId).stream()
                .filter(order -> customerId==null ||
                        (order.getCustomer()!=null &&
                                order.getCustomer().getId().equals(customerId)))
                .filter(order -> cashierId==null ||
                        order.getCashier()!=null &&
                                order.getCashier().getId().equals(cashierId))
                .filter(order -> paymentType==null ||
                        order.getPaymentType() == paymentType)
                .map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByCahier(Long cashierId) {
        return orderRepository.findByCashierId(cashierId).stream()
                .map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(Long id) throws Exception {
        Order order = orderRepository.findById(id).orElseThrow(() -> new Exception("Order not found with id: " + id));
        orderRepository.delete(order);
    }

    @Override
    public List<OrderDto> getTodayOrdersByBranch(Long branchId)  {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();

        return orderRepository.findByBranchIdAndCreateAtBetween(branchId,start,end).stream()
                .map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByCustomerId(Long customerId){
        return orderRepository.findByCustomerId(customerId)
                .stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId)  {
        return orderRepository.findTop5ByBranchIdOrderByCreateAtDesc(branchId).stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }
}
