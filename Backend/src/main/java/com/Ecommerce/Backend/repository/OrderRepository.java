package com.Ecommerce.Backend.repository;

import com.Ecommerce.Backend.model.Order;
import com.Ecommerce.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByBranchId(Long branchId);
    List<Order> findByCashierId(Long cashierId);
    List<Order> findByBranchIdAndCreateAtBetween(Long BranchId, LocalDateTime from, LocalDateTime to);
    List<Order> findByCashierAndCreateAtBetween(User cashier, LocalDateTime from, LocalDateTime to);

    List<Order> findTop5ByBranchIdOrderByCreateAtDesc(Long branchId);

}
