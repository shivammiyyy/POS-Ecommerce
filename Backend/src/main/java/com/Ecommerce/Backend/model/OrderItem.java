package com.Ecommerce.Backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer quantity;

    private Double price;
    @ManyToOne
    private Product product;

    @ManyToOne
    private Order order;

    @Transient
    private Long productId;
}
