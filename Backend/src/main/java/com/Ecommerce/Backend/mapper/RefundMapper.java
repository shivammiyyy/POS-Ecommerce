package com.Ecommerce.Backend.mapper;

import com.Ecommerce.Backend.model.Refund;
import com.Ecommerce.Backend.payload.dto.RefundDTO;

public class RefundMapper {

    public static RefundDTO toDto(Refund refund) {
        return RefundDTO.builder()
                .id(refund.getId())
                .orderId(refund.getId())
                .reason(refund.getReason())
                .amount(refund.getAmount())
                .cashierName(refund.getCashier().getFullName())
                .branchId(refund.getBranch().getId())
                .shiftReportId(refund.getShiftReport() !=null ? refund.getShiftReport().getId() : null)
                .createdAt(refund.getCreatedAt())
                .build();
    }
}
