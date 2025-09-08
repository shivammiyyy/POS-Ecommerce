package com.Ecommerce.Backend.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface StripeService {
    PaymentIntent createPaymentIntent(Long amount, String currency, String description) throws StripeException;
}
