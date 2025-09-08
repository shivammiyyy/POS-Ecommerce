package com.Ecommerce.Backend.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StripePaymentRequest {
    private Long amount;
    private String currency;
    private String description;
    // getters and setters
}
