import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { CartProvider } from "./contexts/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { FloatingActions } from "./components/FloatingActions";
import { Toaster } from "./components/ui/sonner";

import Home from "./routes/index";
import Boats from "./routes/boats";
import Engines from "./routes/engines";
import Parts from "./routes/parts";
import Shop from "./routes/shop";
import Service from "./routes/service";
import Financing from "./routes/financing";
import Reviews from "./routes/reviews";
import Contact from "./routes/contact";
import Product from "./routes/product";
import Login from "./routes/login";
import Admin from "./routes/admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Off the chart</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That page seems to have drifted off course.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Back to shore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boats" element={<Boats />} />
              <Route path="/engines" element={<Engines />} />
              <Route path="/parts" element={<Parts />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/service" element={<Service />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <SiteFooter />
        <FloatingActions />
        <CartDrawer />
        <CheckoutModal />
        <Toaster />
      </div>
    </CartProvider>
  );
}
