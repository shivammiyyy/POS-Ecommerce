package com.Ecommerce.Backend.payload.dto;

import com.Ecommerce.Backend.domain.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {


    private Long id;

    private String fullName;

    private String email;

    private String phone;

    private UserRole role;

    private Long branchId;
    private Long storeId;

    private String password;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLogin;

}
