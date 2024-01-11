"use client";
import { create } from "zustand";

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  checkAuth: async (routerCallback) => {
    console.log("checkAuth Called");
    const token = localStorage.getItem("token");
    if (!token) {
      routerCallback();
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/checkAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        routerCallback();
      } else if (response.ok) {
        set({ isAuthenticated: true });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      set({ isAuthenticated: false });
    }
  },
}));

export { useSearchStore, useAuthStore };
