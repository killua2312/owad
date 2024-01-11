"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirectToLogin();
      return;
    }

    verifyToken(token).then((isValid) => {
      if (!isValid) {
        redirectToLogin();
      } else {
        setIsChecking(false);
      }
    });
  }, [router]);

  const redirectToLogin = () => {
    localStorage.setItem("redirectTo", location.href);
    router.push("/auth");
  };

  return isChecking;
};

const verifyToken = async (token) => {
  try {
    const response = await fetch("http://localhost:5000/checkAuth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    } else if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
