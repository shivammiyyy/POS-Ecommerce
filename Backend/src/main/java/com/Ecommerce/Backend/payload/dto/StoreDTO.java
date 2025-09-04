package com.Ecommerce.Backend.payload.dto;

import com.Ecommerce.Backend.domain.StoreStatus;
import com.Ecommerce.Backend.model.StoreContact;
import com.Ecommerce.Backend.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
public class StoreDTO {

    private  Long id;

    private String brand;

    private UserDto StoreAdmin;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String description;

    private String StoreType;

    private StoreStatus status;

    private StoreContact contact;



}
