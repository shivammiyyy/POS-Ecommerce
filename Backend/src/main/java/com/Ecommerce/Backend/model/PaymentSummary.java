package com.Ecommerce.Backend.model;

import com.Ecommerce.Backend.domain.PaymentType;
import lombok.Data;

@Data
public class PaymentSummary {
    private PaymentType type;
    private Double totalAmount;
    private int transactionCount;;
    private Double percentage;
}
