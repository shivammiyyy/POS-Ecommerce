package com.Ecommerce.Backend.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StripePaymentResponse {
    private String clientSecret; // For frontend payment confirmation
    public StripePaymentResponse(String clientSecret) {
        this.clientSecret = clientSecret;
    }
    // constructor, getters, setters
}

