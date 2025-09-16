package com.Ecommerce.Backend.payload.dto;

import com.Ecommerce.Backend.model.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ShiftReportDTO {
    private Long id;

    private LocalDateTime shiftStart;
    private LocalDateTime shiftEnd;

    private Double totalSales;
    private Double totalRefunds;
    private Double netSale;
    private int totalOrders;

    private UserDto cashier;

    private Long cashierId;
    private Long branchId;

    private BranchDTO branch;

    private List<PaymentSummary> paymentSummaries;

    private List<ProductDTO> topSellingProducts;

    private List<OrderDto> recentOrders;

    private List<RefundDTO> refunds;
}
