import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { CartProvider, useCartContext } from './contexts/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import FoodDetailModal from './components/FoodDetailModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import About from './pages/About';
import GalleryPage from './pages/GalleryPage';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import type { MenuItem } from './data/menu';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const { toast, addItem } = useCartContext();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar transparent={isHome} onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <FoodDetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onAddToCart={(item, qty, size) => addItem(item, qty, size)}
      />
      <Toast message={toast} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home onViewDetail={setDetailItem} />}
          />
          <Route
            path="/menu"
            element={<MenuPage onViewDetail={setDetailItem} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer />

      {/* Mobile floating order button */}
      {location.pathname !== '/checkout' && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
          <Link
            to="/menu"
            className="flex items-center justify-center w-full py-3.5 bg-[#AA110D] text-[#F9F2E7] font-semibold rounded-full shadow-lg shadow-[#AA110D]/20 text-sm"
          >
            ORDER NOW
          </Link>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
