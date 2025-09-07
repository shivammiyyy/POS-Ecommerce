package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.payload.dto.InventoryDTO;
import com.Ecommerce.Backend.payload.response.ApiResponse;
import com.Ecommerce.Backend.service.InventoryService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inventories")
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping()
    public ResponseEntity<InventoryDTO> create(
            @RequestBody InventoryDTO inventoryDTO
    )throws Exception {
        return ResponseEntity.ok(inventoryService.createInventory(inventoryDTO));
    }



    @PutMapping("/{id}")
    public ResponseEntity<InventoryDTO> update(
            @RequestBody InventoryDTO inventoryDTO,
            @PathVariable Long id
    )throws Exception {
        return ResponseEntity.ok(inventoryService.updateInventory( id ,inventoryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable Long id
    )throws Exception {
        inventoryService.deleteInventory(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Success IN DELETING INVENTORY");
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/branch/{branchId}/product/{productId}")
    public ResponseEntity<InventoryDTO> getInventoryByProductAndBranchId(
            @PathVariable Long productId,
            @PathVariable Long branchId
    )throws Exception {

        return ResponseEntity.ok(inventoryService
                .getInventoryByProductIdAndBranchId(productId,branchId));
    }
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<InventoryDTO>> getInventoryByBranchId(
            @PathVariable Long branchId
    )throws Exception {

        return ResponseEntity.ok(inventoryService.getAllInventoryByBranchId(branchId));
    }




}
