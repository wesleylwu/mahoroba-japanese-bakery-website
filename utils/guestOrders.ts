import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mahoroba_guest_orders";

export const getGuestOrderIds = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (id) => typeof id === "string" && id.trim().length > 0,
      );
    }
    return [];
  } catch (e) {
    console.error("Failed to read guest orders from localStorage", e);
    return [];
  }
};

export const useGuestOrderIds = (): string[] => {
  const raw = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("guest_orders_updated", onStoreChange);
      window.addEventListener("storage", onStoreChange);
      return () => {
        window.removeEventListener("guest_orders_updated", onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    () => {
      if (typeof window === "undefined") return "[]";
      return localStorage.getItem(STORAGE_KEY) || "[]";
    },
    () => "[]",
  );

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === "string" && id.trim().length > 0)
      : [];
  } catch {
    return [];
  }
};

export const addGuestOrderId = (orderId: string): void => {
  if (typeof window === "undefined" || !orderId) return;
  try {
    const existing = getGuestOrderIds();
    if (!existing.includes(orderId)) {
      const updated = [orderId, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("guest_orders_updated"));
    }
  } catch (e) {
    console.error("Failed to save guest order ID to localStorage", e);
  }
};

export const removeGuestOrderId = (orderId: string): void => {
  if (typeof window === "undefined" || !orderId) return;
  try {
    const existing = getGuestOrderIds();
    const updated = existing.filter((id) => id !== orderId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("guest_orders_updated"));
  } catch (e) {
    console.error("Failed to remove guest order ID from localStorage", e);
  }
};
