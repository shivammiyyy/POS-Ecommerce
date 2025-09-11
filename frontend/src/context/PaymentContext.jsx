import { createContext, useContext, useState } from "react";
import { createPaymentIntent } from "../api/payments";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentIntent, setPaymentIntent] = useState(null);

  // 🆕 Create Stripe PaymentIntent
  const initPayment = async (amount) => {
    const intent = await createPaymentIntent(amount);
    setPaymentIntent(intent);
    return intent;
  };


  return (
    <PaymentContext.Provider
      value={{
        paymentIntent,
        initPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => useContext(PaymentContext);

