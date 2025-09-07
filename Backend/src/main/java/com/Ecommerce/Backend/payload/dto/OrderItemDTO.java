package com.Ecommerce.Backend.payload.dto;

import com.Ecommerce.Backend.model.Order;
import com.Ecommerce.Backend.model.Product;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemDTO {
    private Long id;

    private Integer quantity;

    private Double price;
    private ProductDTO product;

    private Long productId;

    private Long orderId;

    private OrderDto order;

}
