import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import CategoriesPage from "./pages/shop/CategoriesPage";
import ProductDetailsPage from "./pages/shop/ProductDetailsPage";
import CartPage from "./pages/cart/CartPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Forgotpassword from "./pages/auth/Forgotpassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import CheckOutPage from "./pages/cart/CheckOutPage";
import OrderConfirmationPage from "./pages/cart/OrderConfirmationPage";
import OrderHistory from "./pages/account/OrderHistory";
import SavedItemsPage from "./pages/account/SavedItemsPage";
import AdressPage from "./pages/account/AdressPage";
import AccountSetting from "./pages/account/AccountSetting";
import OrderDetailPage from "./pages/account/OrderDetailPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AminProductPage from "./pages/admin/AminProductPage";
import AminProductFormPage from "./pages/admin/AminProductFormPage";
import AminOrdersPage from "./pages/admin/AminOrdersPage";
import AdminCustomerPage from "./pages/admin/AdminCustomerPage";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import MainLayout from "./layouts/MainLayout";
import AccountLayoyt from "./layouts/AccountLayoyt";
import AccountOverviewPage from "./pages/account/AccountOverviewPage";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget-password" element={<Forgotpassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* pages that need a login: shoppers who are not logged in are sent to login first if they try to access these pages */}

            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route
              path="/order-confirmation/:orderId"
              element={<OrderConfirmationPage />}
            />

            {/* Account pages: account menu on the left  */}
            <Route path="/account" element={<AccountLayoyt />}>
              <Route index element={<AccountOverviewPage />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="address" element={<AdressPage />} />
              <Route path="saved" element={<SavedItemsPage />} />
              <Route path="settings" element={<AccountSetting />} />
            </Route>

            {/* order details is full width in the design, so ithas no account menu */}

            <Route
              path="/account/orders/:orderId"
              element={<OrderDetailPage />}
            />
          </Route>

          {/* shipping, returns, FAQs, About, terms, privacy....(one route each, all using info page) */}

          {/* {infoPages.map((page) => {
            return
            <Route key={page.path} path={page.path} />
          })} */}
          <Route path="*" element={<NotFound />} />
          {/* Admin login: no layout */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin pages: admin menu + top bar, no store header or footer, only admins get in */}
          <Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<AminProductPage />} />
              <Route path="products/new" element={<AminProductFormPage />} />
              <Route
                path="products/:productId/edit"
                element={<AminProductFormPage />}
              />
              <Route path="orders" element={<AminOrdersPage />} />
              <Route path="customers" element={<AdminCustomerPage />} />
              <Route path="categories" element={<AdminCategoryPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />

              {/* Any other admin address shows the 404 page inside the admin layout */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
