package com.Ecommerce.Backend.mapper;

import com.Ecommerce.Backend.model.Branch;
import com.Ecommerce.Backend.model.Store;
import com.Ecommerce.Backend.payload.dto.BranchDTO;

public class BranchMapper {

    public static BranchDTO toDto(Branch branch) {

        return BranchDTO.builder()
                .id(branch.getId())
                .name(branch.getName())
                .address(branch.getAddress())
                .phone(branch.getPhone())
                .email(branch.getEmail())
                .closeTime(branch.getCloseTime())
                .openTime(branch.getOpenTime())
                .workingDays(branch.getWorkingDays())
                .storeId(branch.getStore()!=null?branch.getStore().getId():null)
                .createdAt(branch.getCreatedAt())
                .updatedAt(branch.getUpdatedAt())
                .build();
    }

    public static Branch toEntity(BranchDTO branchDTO, Store store) {
        return Branch.builder()
                .id(branchDTO.getId())
                .name(branchDTO.getName())
                .address(branchDTO.getAddress())
                .phone(branchDTO.getPhone())
                .email(branchDTO.getEmail())
                .closeTime(branchDTO.getCloseTime())
                .openTime(branchDTO.getOpenTime())
                .workingDays(branchDTO.getWorkingDays())
                .store(store) // set relationship
                .createdAt(branchDTO.getCreatedAt())
                .updatedAt(branchDTO.getUpdatedAt())
                .build();
    }

}
