import { createContext, useContext, useState } from "react";
import { createPaymentIntent } from "../api/payments";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initPayment = async (amount, currency = "inr", description = "") => {
    setLoading(true);
    try {
      const intent = await createPaymentIntent(amount, currency, description);
      setPaymentIntent(intent);
      return intent;
    } catch (err) {
      setError(err.message || "Payment initialization failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{ paymentIntent, loading, error, initPayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error("usePayments must be used within PaymentProvider");
  return context;
};
