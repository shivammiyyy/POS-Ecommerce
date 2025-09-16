import { AuthProvider } from "./AuthContext";
import { StoreProvider } from "./StoreContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import { OrderProvider } from "./OrderContext";
import { PaymentProvider } from "./PaymentContext";
import { CustomerProvider } from "./CustomerContext";
import { EmployeeProvider } from "./EmployeeContext";
import { BranchProvider } from "./BranchContext";
import { CategoryProvider } from "./CategoryContext";
import { RefundProvider } from "./RefundContext";
import { InventoryProvider } from "./InventoryContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <BranchProvider>
      <StoreProvider>
        <ProductProvider>
          <CategoryProvider>
          <CartProvider>
            <InventoryProvider>
            <OrderProvider>
              <PaymentProvider>
                <RefundProvider>
                <CustomerProvider>
                  <EmployeeProvider>
                    {children}
                  </EmployeeProvider>
                </CustomerProvider>
                </RefundProvider>
              </PaymentProvider>
            </OrderProvider>
            </InventoryProvider>
          </CartProvider>
          </CategoryProvider>
        </ProductProvider>
      </StoreProvider>
      </BranchProvider>
    </AuthProvider>
  );
};

export default AppProviders;
