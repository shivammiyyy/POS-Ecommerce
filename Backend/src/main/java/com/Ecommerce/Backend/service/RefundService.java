package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.payload.dto.RefundDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface RefundService {

    RefundDTO createRefund(RefundDTO refundDTO) throws Exception;
    List<RefundDTO> getAllRefunds() throws Exception;
    List<RefundDTO> getRefundByCashier(Long cashierId) throws Exception;
    List<RefundDTO> getRefundByShiftReport(Long shiftReportId) throws Exception;
    List<RefundDTO> findByCashierIdAndCreatedAtBetween(Long cashierId, LocalDateTime startDate, LocalDateTime endDate);

    List<RefundDTO> getRefundByBranch(Long branchId) throws Exception;
    RefundDTO getRefundById(Long refundId) throws Exception;

    void deleteRefund(Long refundId) throws Exception;
}
