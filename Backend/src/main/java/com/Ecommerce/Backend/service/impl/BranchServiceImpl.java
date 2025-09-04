package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.BranchDTO;
import com.Ecommerce.Backend.repository.BranchRepository;
import com.Ecommerce.Backend.service.BranchService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    @Override
    public BranchDTO createBranch(BranchDTO branchDTO, User user) {
        return null;
    }

    @Override
    public BranchDTO updateBranch(Long id, BranchDTO branchDTO, User user) {
        return null;
    }

    @Override
    public BranchDTO deleteBranch(Long id) {
        return null;
    }

    @Override
    public List<BranchDTO> getAllBranchesByStoreId(Long storeId) {
        return List.of();
    }

    @Override
    public BranchDTO getBranchById(Long id) {
        return null;
    }
}
