import { createContext, useContext, type ReactNode } from 'react';
import { useCart, type CartItem } from '../hooks/useCart';
import type { MenuItem, MenuItemSize } from '../data/menu';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, size?: MenuItemSize) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  toast: string | null;
  getItemKey: (ci: CartItem) => string;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}
