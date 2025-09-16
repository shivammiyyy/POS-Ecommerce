package com.Ecommerce.Backend.mapper;

import com.Ecommerce.Backend.model.Order;
import com.Ecommerce.Backend.model.Product;
import com.Ecommerce.Backend.model.Refund;
import com.Ecommerce.Backend.model.ShiftReport;
import com.Ecommerce.Backend.payload.dto.OrderDto;
import com.Ecommerce.Backend.payload.dto.ProductDTO;
import com.Ecommerce.Backend.payload.dto.RefundDTO;
import com.Ecommerce.Backend.payload.dto.ShiftReportDTO;

import java.util.List;
import java.util.stream.Collectors;

public class ShiftReportMapper {

    public static ShiftReportDTO toDTO(ShiftReport entity) {

        return ShiftReportDTO.builder()
                .id(entity.getId())
                .shiftEnd(entity.getShiftEnd())
                .shiftStart(entity.getShiftStart())
                .totalSales(entity.getTotalSales())
                .totalOrders(entity.getTotalOrders())
                .totalRefunds(entity.getTotalRefunds())
                .netSale(entity.getNetSale())
                .cashier(UserMapper.toDTO(entity.getCashier()))
                .branch(BranchMapper.toDto(entity.getBranch()))
                .branchId(entity.getBranch().getId())
                .cashierId(entity.getCashier().getId())
                .recentOrders(MapOrders(entity.getRecentOrders()))
                .topSellingProducts(MapProducts(entity.getTopSellingProducts()))
                .refunds(MapRefunds(entity.getRefunds()))
                .paymentSummaries(entity.getPaymentSummaries())
                .build();

    }

    private static List<RefundDTO> MapRefunds(List<Refund> refunds) {
        if(refunds == null || refunds.isEmpty()) { return null;}

        return refunds.stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    private static List<ProductDTO> MapProducts(List<Product> topSellingProducts) {
        if(topSellingProducts == null || topSellingProducts.isEmpty()) { return null;}

        return topSellingProducts.stream().map(ProductMapper::toDTO).collect(Collectors.toList());
    }

    private static List<OrderDto> MapOrders(List<Order> recentOrders) {
        if(recentOrders == null || recentOrders.isEmpty()) { return null;}

        return recentOrders.stream().map(OrderMapper::toDto).collect(Collectors.toList());

    }

}
