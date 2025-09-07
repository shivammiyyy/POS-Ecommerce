package com.Ecommerce.Backend.payload.dto;

import com.Ecommerce.Backend.domain.PaymentType;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RefundDTO {
    private Long id;

    private OrderDto order;

    private Long orderId;

    private String reason;

    private Double amount;

//    private ShiftReport shiftReport;

    private Long shiftReportId;

    private UserDto cashier;
    private Long cashierId;

    private String cashierName;

    private BranchDTO branch;
    private Long branchId;

    private PaymentType paymentType;

    private LocalDateTime createdAt;
}
