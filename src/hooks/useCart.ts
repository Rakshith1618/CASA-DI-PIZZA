import { useState, useEffect, useCallback } from 'react';
import type { MenuItem, MenuItemSize } from '../data/menu';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSize?: MenuItemSize;
}

const CART_KEY = 'casa-di-pizza-cart';

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function getCartItemKey(item: MenuItem, size?: MenuItemSize): string {
  return size ? `${item.id}-${size.label}` : item.id;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((menuItem: MenuItem, quantity: number = 1, size?: MenuItemSize) => {
    setItems((prev) => {
      const key = getCartItemKey(menuItem, size);
      const existing = prev.find((ci) => getCartItemKey(ci.item, ci.selectedSize) === key);
      if (existing) {
        return prev.map((ci) =>
          getCartItemKey(ci.item, ci.selectedSize) === key
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [...prev, { item: menuItem, quantity, selectedSize: size }];
    });
    const sizeLabel = size ? ` (${size.label})` : '';
    setToast(`${menuItem.name}${sizeLabel} added to cart ✓`);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const getItemKey = useCallback((ci: CartItem): string => {
    return getCartItemKey(ci.item, ci.selectedSize);
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((ci) => getCartItemKey(ci.item, ci.selectedSize) !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((ci) => getCartItemKey(ci.item, ci.selectedSize) !== key));
      return;
    }
    setItems((prev) =>
      prev.map((ci) =>
        getCartItemKey(ci.item, ci.selectedSize) === key ? { ...ci, quantity } : ci
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = items.reduce(
    (sum, ci) => sum + (ci.selectedSize?.price ?? ci.item.price) * ci.quantity,
    0
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    toast,
    getItemKey,
  };
}
