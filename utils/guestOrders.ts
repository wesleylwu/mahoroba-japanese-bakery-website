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
