// Purpose: App route shell with lazy page loading and transitions.
// Callers: React root.
// Deps: router, Framer Motion, shared shell components.
// API: default app component.
// Side effects: none.
import { lazy, Suspense, type ReactNode, type ErrorInfo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router";
import { Component } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { getCurrentAdmin, getCurrentUser, isAdminAuthenticated, isAuthenticated } from "./data/mockAccount";

const HomePage = lazy(() => import("./pages/Home"));
const KatalogPage = lazy(() => import("./pages/Katalog"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const HistoryPage = lazy(() => import("./pages/History"));
const PaymentPage = lazy(() => import("./pages/Payment"));
const ReturnPage = lazy(() => import("./pages/Return"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetail"));
const ProductListingPage = lazy(() => import("./pages/ProductListing"));
const ProfileSubpage = lazy(() => import("./pages/ProfileSubpage"));
const AboutPage = lazy(() => import("./pages/About"));
const WishlistPage = lazy(() => import("./pages/Wishlist"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));

class RouteErrorBoundary extends Component<{ children: ReactNode }, { error: string }> {
  state = { error: "" };
  static getDerivedStateFromError(error: Error) { return { error: error.message || "Halaman gagal dimuat" }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info); }
  render() { return this.state.error ? <div className="min-h-[70dvh] bg-[#fdfdfd] px-6 pt-28 text-[#db3022]">{this.state.error}</div> : this.props.children; }
}

const {
  AdminDashboard,
  AdminProducts,
  AdminProductForm,
  AdminCategories,
  AdminCategoryForm,
  AdminCustomers,
  AdminOrders,
  AdminOrderDetail,
  AdminReturns,
  AdminReports,
  AdminAccount,
} = {
  AdminDashboard: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminDashboard }))),
  AdminProducts: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminProducts }))),
  AdminProductForm: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminProductForm }))),
  AdminCategories: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminCategories }))),
  AdminCategoryForm: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminCategoryForm }))),
  AdminCustomers: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminCustomers }))),
  AdminOrders: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminOrders }))),
  AdminOrderDetail: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminOrderDetail }))),
  AdminReturns: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminReturns }))),
  AdminReports: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminReports }))),
  AdminAccount: lazy(() => import("./pages/Admin").then((m) => ({ default: m.AdminAccount }))),
};

function UserGuestRoute({ children }: { children: ReactNode }) {
  if (!getCurrentUser()?.token) return children;
  return <Navigate to="/katalog" replace />;
}

function AdminGuestRoute({ children }: { children: ReactNode }) {
  if (!getCurrentAdmin()?.token) return children;
  return <Navigate to="/admin" replace />;
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }: { children: ReactNode }) {
  if (!isAdminAuthenticated()) return <Navigate to="/admin/login" replace />;
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      key={location.pathname}
      initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 will-change-transform"
    >
      <RouteErrorBoundary>
      <Suspense fallback={<div className="min-h-[70dvh] bg-[#fdfdfd]" />}>
        <Routes location={location}>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/katalog/series/:series" element={<ProtectedRoute><ProductListingPage /></ProtectedRoute>} />
          <Route path="/katalog/search" element={<ProtectedRoute><ProductListingPage /></ProtectedRoute>} />
          <Route path="/katalog/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          <Route path="/katalog" element={<ProtectedRoute><KatalogPage /></ProtectedRoute>} />
          <Route path="/tentang-kami" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/pembayaran" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/return" element={<ProtectedRoute><ReturnPage /></ProtectedRoute>} />
          <Route path="/pengembalian" element={<ProtectedRoute><ReturnPage /></ProtectedRoute>} />
          <Route path="/login" element={<UserGuestRoute><LoginPage /></UserGuestRoute>} />
          <Route path="/admin/login" element={<AdminGuestRoute><LoginPage /></AdminGuestRoute>} />
          <Route path="/register" element={<UserGuestRoute><RegisterPage /></UserGuestRoute>} />
          <Route path="/forgot-password" element={<UserGuestRoute><ForgotPasswordPage /></UserGuestRoute>} />
          <Route path="/reset-password" element={<UserGuestRoute><ForgotPasswordPage /></UserGuestRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/profil/pesanan" element={<ProtectedRoute><ProfileSubpage kind="orders" /></ProtectedRoute>} />
          <Route path="/profil/alamat" element={<ProtectedRoute><ProfileSubpage kind="address" /></ProtectedRoute>} />
          <Route path="/profil/pembayaran" element={<ProtectedRoute><ProfileSubpage kind="payment" /></ProtectedRoute>} />
          <Route path="/profil/riwayat-transaksi" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/profil/ulasan" element={<ProtectedRoute><ProfileSubpage kind="reviews" /></ProtectedRoute>} />
          <Route path="/profil/pengaturan" element={<ProtectedRoute><ProfileSubpage kind="settings" /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/orders/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/returns/new" element={<ProtectedRoute><ReturnPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/products/new" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
          <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
          <Route path="/admin/categories/new" element={<AdminRoute><AdminCategoryForm /></AdminRoute>} />
          <Route path="/admin/categories/:id/edit" element={<AdminRoute><AdminCategoryForm /></AdminRoute>} />
          <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/orders/:id" element={<AdminRoute><AdminOrderDetail /></AdminRoute>} />
          <Route path="/admin/returns" element={<AdminRoute><AdminReturns /></AdminRoute>} />
          <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
          <Route path="/admin/account" element={<AdminRoute><AdminAccount /></AdminRoute>} />
          <Route path="/admin/account/edit" element={<AdminRoute><AdminAccount /></AdminRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
      </RouteErrorBoundary>
    </motion.main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans selection:bg-brand-deep selection:text-white">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
