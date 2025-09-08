package com.Ecommerce.Backend.payload.dto;


import com.Ecommerce.Backend.domain.PaymentType;
import com.Ecommerce.Backend.model.Customer;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderDto {
    private Long id;

    private double totalAmount;

    private LocalDateTime createAt;

    private BranchDTO branch;

    private Long branchId;

    private UserDto cashier;

    private Customer customer;

    private Long customerId;

    private List<OrderItemDTO> items;

    private PaymentType paymentType;

    private String stripePaymentIntentId;

    private boolean paymentCompleted;

    private Long orderId ;
}
