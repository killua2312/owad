"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = token != null;

    if (!isAuthenticated) {
      localStorage.setItem("redirectTo", router.asPath);

      router.push("/login");
    }
  }, [router]);
};
