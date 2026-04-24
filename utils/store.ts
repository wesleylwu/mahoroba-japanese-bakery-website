import { ActionTypes, CartType } from "@/src/types/Type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartsStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item) {
        set((state) => {
          const existingItem = state.products.find((p) => p.id === item.id);

          if (existingItem) {
            const updatedProducts = state.products.map((p) =>
              p.id === item.id
                ? { ...p, quantity: p.quantity + item.quantity }
                : p,
            );
            return {
              products: updatedProducts,
              totalItems: state.totalItems + item.quantity,
              totalPrice: state.totalPrice + item.price * item.quantity,
            };
          }

          return {
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price * item.quantity,
          };
        });
      },

      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price * item.quantity,
        }));
      },

      updateQuantity(id, newQuantity) {
        set((state) => {
          const item = state.products.find((p) => p.id === id);
          if (!item) return state;

          const quantityDifference = newQuantity - item.quantity;

          return {
            products: state.products.map((p) =>
              p.id === id ? { ...p, quantity: newQuantity } : p,
            ),
            totalItems: state.totalItems + quantityDifference,
            totalPrice: state.totalPrice + item.price * quantityDifference,
          };
        });
      },
    }),
    { name: "cart" },
  ),
);
