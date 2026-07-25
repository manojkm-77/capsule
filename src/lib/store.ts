import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  images: string[];
}

interface UIStore {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

export const useStore = create<UIStore>((set) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  updateQuantity: (id, qty) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    })),
  wishlist: [],
  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((i) => i !== id)
        : [...state.wishlist, id],
    })),
}));
