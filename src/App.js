import { CommonProvider } from './contexts/common/commonContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';
import { ProductProvider } from './contexts/product/productContext';
import { CartProvider } from './contexts/cart/cartContext';
import { UserProvider } from './contexts/user/userContext';
import { OrderProvider } from './contexts/order/orderContext';
import { AddressProvider } from './contexts/address/addressContext';
import { ProductReviewProvider } from './contexts/review/productReview';

const App = () => {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <AddressProvider>
              <OrderProvider>
                <ProductReviewProvider>
                  <CommonProvider>
                    <FiltersProvider>
                      <Header />
                      <RouterRoutes />
                      <Footer />
                      <BackTop />
                    </FiltersProvider>
                  </CommonProvider>
                </ProductReviewProvider>
              </OrderProvider>
            </AddressProvider>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </>
  );
};

export default App;
