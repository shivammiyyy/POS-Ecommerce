package com.Ecommerce.Backend.repository;

import com.Ecommerce.Backend.model.Refund;
import com.Ecommerce.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface RefundRepository extends JpaRepository<Refund, Long> {
    List<Refund> findByCashierIdAndCreatedAtBetween(Long cashierId,
                                                  LocalDateTime createdAt,
                                                  LocalDateTime createdAt2);

    List<Refund> findByCashierId(Long cashierId);
    List<Refund> findByShiftReportId(Long shiftReportId)
            throws Exception;
    List<Refund> findByBranchId(Long BranchId) throws Exception;
}
