// src/api/payments.js
import axiosInstance from "./axios";

export const createPaymentIntent = async (amount, currency = "inr", description = "") => {
  const response = await axiosInstance.post("/api/payments/create-payment-intent", {
    amount,
    currency,
    description,
  });
  return response.data;
};

// Optional: Add confirm payment API if backend supports it
// export const confirmPayment = async (orderId, paymentData) => {
//   const response = await axiosInstance.post(`/api/payments/confirm-payment/${orderId}`, paymentData);
//   return response.data;
// };
