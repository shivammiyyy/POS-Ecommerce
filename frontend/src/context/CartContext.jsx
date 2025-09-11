import { createContext, useContext, useState, useMemo } from "react";
import { createOrder } from "../api/orders";
import { createPaymentIntent } from "../api/payments";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ➕ Add item
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

  // ➖ Remove item
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // 🔄 Update quantity
  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // 💰 Totals
  const total = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.product.sellingPrice * item.quantity,
        0
      ),
    [cartItems]
  );

  // 🛒 Checkout: create payment + order
  const checkout = async (customerId, paymentType) => {
    // 1️⃣ Create Payment Intent (Stripe)
    const paymentIntent = await createPaymentIntent(total);

    // 2️⃣ Create Order linked to that intent
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
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
