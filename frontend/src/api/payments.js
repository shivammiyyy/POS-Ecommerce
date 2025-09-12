// src/api/payments.js
import axiosInstance from "./axios";

// Create a Stripe PaymentIntent
export const createPaymentIntent = async (amount, currency = "inr", description = "") => {
  const response = await axiosInstance.post("/api/payments/create-intent", {
    amount,
    currency,
    description,
  });
  return response.data;
};
