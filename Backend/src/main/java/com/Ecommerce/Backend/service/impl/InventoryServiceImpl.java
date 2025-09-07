package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.mapper.InventoryMapper;
import com.Ecommerce.Backend.model.Branch;
import com.Ecommerce.Backend.model.Inventory;
import com.Ecommerce.Backend.model.Product;
import com.Ecommerce.Backend.payload.dto.InventoryDTO;
import com.Ecommerce.Backend.repository.BranchRepository;
import com.Ecommerce.Backend.repository.InventoryRepository;
import com.Ecommerce.Backend.repository.ProductRepository;
import com.Ecommerce.Backend.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {
    private final InventoryRepository inventoryRepository;
    private final BranchRepository branchRepository;
    private final ProductRepository productRepository;
    @Override
    public InventoryDTO createInventory(InventoryDTO inventoryDTO) throws Exception {
        Branch branch = branchRepository.findById(inventoryDTO.getBrandId()).orElseThrow(
                ()-> new Exception("Branch not exist...")
        );
        Product product = productRepository.findById(inventoryDTO.getProductId()).orElseThrow(
                ()-> new Exception("Product not exist...")
        );
        Inventory inventory = InventoryMapper.toEntity(inventoryDTO, branch, product);
        Inventory savedInventory = inventoryRepository.save(inventory);
        return InventoryMapper.toDTO(savedInventory);
    }

    @Override
    public InventoryDTO updateInventory(Long id, InventoryDTO inventoryDTO) throws Exception {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(
                ()-> new Exception("Inventory not exist...")
        );
        inventory.setQuantity(inventoryDTO.getQuantity());
        Inventory savedInventory = inventoryRepository.save(inventory);
        return InventoryMapper.toDTO(savedInventory);
    }

    @Override
    public void deleteInventory(Long id) throws Exception {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(
                ()-> new Exception("Inventory not exist...")
        );
        inventoryRepository.delete(inventory);
    }

    @Override
    public InventoryDTO getInventoryById(Long id) throws Exception {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(
                ()-> new Exception("Inventory not exist...")
        );
        return InventoryMapper.toDTO(inventory);
    }

    @Override
    public InventoryDTO getInventoryByProductIdAndBranchId(Long productId, Long branchId){
        Inventory inventory = inventoryRepository.findByProductIdAndBranchId(productId, branchId);
        return InventoryMapper.toDTO(inventory);
    }

    @Override
    public List<InventoryDTO> getAllInventoryByBranchId(Long branchId) {
        List<Inventory> inventory = inventoryRepository.findByBranchId(branchId);
        return inventory.stream().map(
            InventoryMapper::toDTO
        ).collect(Collectors.toList());
    }
}
