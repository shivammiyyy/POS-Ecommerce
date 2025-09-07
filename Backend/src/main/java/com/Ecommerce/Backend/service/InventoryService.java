package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.payload.dto.InventoryDTO;

import java.util.List;

public interface InventoryService {
    InventoryDTO createInventory(InventoryDTO inventoryDTO) throws Exception;
    InventoryDTO updateInventory(Long id, InventoryDTO inventoryDTO) throws Exception;
    void deleteInventory(Long id) throws Exception;
    InventoryDTO getInventoryById(Long id) throws Exception;
    InventoryDTO getInventoryByProductIdAndBranchId(Long productId, Long branchId) throws Exception;
    List<InventoryDTO> getAllInventoryByBranchId(Long branchId);
}
