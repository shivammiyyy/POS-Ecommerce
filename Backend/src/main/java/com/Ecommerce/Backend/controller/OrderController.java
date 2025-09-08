package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.domain.OrderStatus;
import com.Ecommerce.Backend.domain.PaymentType;
import com.Ecommerce.Backend.payload.dto.OrderDto;
import com.Ecommerce.Backend.service.OrderService;
import com.Ecommerce.Backend.repository.OrderRepository;
import com.Ecommerce.Backend.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @PostMapping()
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto)throws Exception {
        return ResponseEntity.ok(orderService.createOrder(orderDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id)throws Exception {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getOrderByBranch(@PathVariable Long branchId,
                                                           @RequestParam(required = false) Long customerId,
                                                           @RequestParam(required = false) Long cashierId,
                                                           @RequestParam(required = false) PaymentType paymentType,
                                                           @RequestParam(required = false) OrderStatus orderStatus)throws Exception {
        return ResponseEntity.ok(orderService.getOrdersByBranch(branchId, customerId, cashierId, paymentType, orderStatus));
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<OrderDto>> getOrderByCashierId(@PathVariable Long cashierId) {
        return ResponseEntity.ok(orderService.getOrdersByCahier(cashierId));
    }

    @GetMapping("/today/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getTodayOrder(@PathVariable Long branchId)throws Exception {
        return ResponseEntity.ok(orderService.getTodayOrdersByBranch(branchId));
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<List<OrderDto>> getCustomerOrder(@PathVariable Long id)throws Exception {
        return ResponseEntity.ok(orderService.getOrdersByCustomerId(id));
    }

    @GetMapping("/recent/{branchId}")
    public ResponseEntity<List<OrderDto>> getRecentOrder(@PathVariable Long branchId)throws Exception {
        return ResponseEntity.ok(orderService.getTop5RecentOrdersByBranchId(branchId));
    }

    // Endpoint to confirm payment by providing stripePaymentIntentId and orderId
    @PostMapping("/confirm-payment/{orderId}")
    public ResponseEntity<String> confirmPayment(@PathVariable Long orderId, @RequestParam String paymentIntentId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStripePaymentIntentId() != null && order.getStripePaymentIntentId().equals(paymentIntentId)) {
            order.setPaymentCompleted(true);
            orderRepository.save(order);
            return ResponseEntity.ok("Payment confirmed");
        } else {
            return ResponseEntity.badRequest().body("Invalid payment intent ID");
        }
    }
}
