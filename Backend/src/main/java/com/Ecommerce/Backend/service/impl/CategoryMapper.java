package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.model.Category;
import com.Ecommerce.Backend.payload.dto.CategoryDTO;

public class CategoryMapper {

    public static CategoryDTO toDTO(Category category) {
        return CategoryDTO.builder()
                .name(category.getName())
                .storeId(category.getStore()!=null?category.getStore().getId():null)
                .build();
    }
}
