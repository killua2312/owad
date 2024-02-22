"use client";
import { create } from "zustand";

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: "",
  checkAuth: async (routerCallback) => {
    const token = localStorage.getItem("token");
    if (!token) {
      routerCallback();
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/checkAuth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        routerCallback();
      } else if (response.ok) {
        const role = localStorage.getItem("role");
        set({ isAuthenticated: true, role: role });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      set({ isAuthenticated: false });
    }
  },
}));

const useWalletStore = create((set) => ({
  amount: 0,
  fetchAmount: async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/wallet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      } else if (response.ok) {
        const { amount } = await response.json();
        set({ amount: amount });
      }
    } catch (error) {
      console.error("Error Verifying token:", error);
    }
  },
}));

export { useSearchStore, useAuthStore, useWalletStore };
