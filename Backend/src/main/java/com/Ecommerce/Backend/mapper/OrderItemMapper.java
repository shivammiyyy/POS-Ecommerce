package com.Ecommerce.Backend.mapper;

import com.Ecommerce.Backend.model.OrderItem;
import com.Ecommerce.Backend.payload.dto.OrderItemDTO;

public class OrderItemMapper {
    public static OrderItemDTO toDTO(OrderItem item) {

        if (item == null) {
            return null;
        }

        return OrderItemDTO.builder()
                .id(item.getId())
                .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .product(ProductMapper.toDTO(item.getProduct()))
                .build();
    }
}
