package com.Ecommerce.Backend.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Embeddable
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreContact {
    private String address;

    @Email(message = "Invalid email format")
    private String email;
    private String phone;

}
