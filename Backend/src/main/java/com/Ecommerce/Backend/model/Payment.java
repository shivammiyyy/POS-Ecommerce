package com.Ecommerce.Backend.model;

import com.Ecommerce.Backend.domain.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;
    private String provider; // "Stripe" or "Razorpay"
    private String paymentId; // Stripe PaymentIntent ID / Razorpay Payment ID
    private String orderRef;  // Razorpay order_id or Stripe clientSecret
    private Long amount; // in smallest currency unit (paise/cents)
    private String currency;
    private PaymentStatus status; // CREATED, SUCCESS, FAILED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

