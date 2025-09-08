package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.model.Order;
import com.Ecommerce.Backend.payload.request.StripePaymentRequest;
import com.Ecommerce.Backend.payload.response.StripePaymentResponse;
import com.Ecommerce.Backend.repository.OrderRepository;
import com.Ecommerce.Backend.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor

public class PaymentController {

    private final StripeService stripeService;
    private final OrderRepository orderRepository;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<StripePaymentResponse> createPaymentIntent(@RequestBody StripePaymentRequest request) {
        try {
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(
                    request.getAmount(),
                    request.getCurrency(),
                    request.getDescription());

            return ResponseEntity.ok(new StripePaymentResponse(paymentIntent.getClientSecret()));
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/confirm-payment/{orderId}")
    public ResponseEntity<?> confirmPayment(@PathVariable Long orderId, @RequestParam String paymentIntentId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStripePaymentIntentId().equals(paymentIntentId)) {
            order.setPaymentCompleted(true);
            orderRepository.save(order);
            return ResponseEntity.ok("Payment confirmed");
        }
        return ResponseEntity.badRequest().body("Invalid payment intent");
    }
}

