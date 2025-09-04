package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.BranchDTO;

import java.util.List;

public interface BranchService {

    BranchDTO createBranch(BranchDTO branchDTO, User user);
    BranchDTO updateBranch(Long id, BranchDTO branchDTO, User user);
    BranchDTO deleteBranch(Long id);

    List<BranchDTO> getAllBranchesByStoreId(Long storeId);
    BranchDTO getBranchById(Long id);
}
