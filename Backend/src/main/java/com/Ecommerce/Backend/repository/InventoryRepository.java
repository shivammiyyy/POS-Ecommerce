package com.Ecommerce.Backend.repository;

import com.Ecommerce.Backend.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Inventory findByProductIdAndBranchId(Long brandId, Long productId);
    List<Inventory> findByBranchId(Long branchId);

}
