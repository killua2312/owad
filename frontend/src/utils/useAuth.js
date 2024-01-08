"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      verifyToken(token).then((isValid) => {
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          router.push("/auth/login");
        }
      });
    }
  }, [router]);

  return isAuthenticated;
};

const verifyToken = async (token) => {
  const response = await fetch("http://localhost:5000/checkAuth", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
