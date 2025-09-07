package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.BranchDTO;

import java.util.List;

public interface BranchService {

    BranchDTO createBranch(BranchDTO branchDTO) throws UserException;
    BranchDTO updateBranch(Long id, BranchDTO branchDTO ) throws Exception;
    void deleteBranch(Long id) throws Exception;

    List<BranchDTO> getAllBranchesByStoreId(Long storeId);
    BranchDTO getBranchById(Long id) throws Exception;
}
