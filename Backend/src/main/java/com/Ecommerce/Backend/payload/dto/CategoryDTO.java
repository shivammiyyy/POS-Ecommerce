package com.Ecommerce.Backend.payload.dto;

import com.Ecommerce.Backend.model.Store;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryDTO {
    private Long id;

    private String name;

//    private Store store;

    private Long storeId;
}
