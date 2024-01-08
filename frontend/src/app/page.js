"use client";
import "./globals.css";
import useAuth from "@/utils/useAuth";

export default function Home() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading....</div>;
  }

  return <main className="">Authenticated</main>;
}
