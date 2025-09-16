import { createContext, useContext, useMemo, useState } from "react";
import { createOrder } from "../api/orders";
import { createPaymentIntent } from "../api/payments";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.product.sellingPrice * item.quantity,
        0
      ),
    [cartItems]
  );

  const checkout = async (customerId, paymentType) => {
    setLoading(true);
    try {
      const paymentIntent = await createPaymentIntent(subtotal);
      const orderPayload = {
        customerId,
        paymentType,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };
      const order = await createOrder(orderPayload);
      setCartItems([]);
      return { paymentIntent, order };
    } catch (err) {
      setError(err.message || "Checkout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
