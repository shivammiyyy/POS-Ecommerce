import { AuthProvider } from "./AuthContext";
import { StoreProvider } from "./StoreContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import { OrderProvider } from "./OrderContext";
import { PaymentProvider } from "./PaymentContext";
import { CustomerProvider } from "./CustomerContext";
import { EmployeeProvider } from "./EmployeeContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <StoreProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <PaymentProvider>
                <CustomerProvider>
                  <EmployeeProvider>
                    {children}
                  </EmployeeProvider>
                </CustomerProvider>
              </PaymentProvider>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </StoreProvider>
    </AuthProvider>
  );
};

export default AppProviders;
