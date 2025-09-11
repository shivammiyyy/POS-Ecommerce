package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.payload.dto.BranchDTO;
import com.Ecommerce.Backend.payload.response.ApiResponse;
import com.Ecommerce.Backend.service.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/branches")
@RequiredArgsConstructor
public class BranchController {
    private final BranchService branchService;

    @PostMapping
    public ResponseEntity<BranchDTO> createBranch(@RequestBody BranchDTO branchDTO) throws UserException {

        BranchDTO createBranchDTO = branchService.createBranch(branchDTO);
        return ResponseEntity.ok().body(createBranchDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchDTO> getBranchById(@PathVariable Long id) throws Exception {

        BranchDTO createBranchDTO = branchService.getBranchById(id);
        return ResponseEntity.ok().body(createBranchDTO);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<BranchDTO>> getAllBranchesByStoreId(@PathVariable Long storeId)  {

        List<BranchDTO> createBranchDTO = branchService.getAllBranchesByStoreId(storeId);
        return ResponseEntity.ok().body(createBranchDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BranchDTO> updateBranch(@PathVariable Long id,
                                                  @RequestBody BranchDTO branchDTO) throws Exception {

        BranchDTO createBranchDTO = branchService.updateBranch(id, branchDTO);
        return ResponseEntity.ok().body(createBranchDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBranch(@PathVariable Long id) throws Exception {

        branchService.deleteBranch(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Success IN DELETING BRANCH");
        return ResponseEntity.ok(apiResponse);
    }

}
