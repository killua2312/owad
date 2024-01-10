"use client";
import { create } from "zustand";

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));

const usePlayVideo = create((set) => ({
  playVideo: false,
  setPlayVideo: (bool) => set({ playVideo: bool }),
}));

export { useSearchStore, usePlayVideo };
