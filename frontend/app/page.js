"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MediaList from "@/components/media/mediaList";
import { useAuthStore } from "@/lib/store";
import DisclaimerDialoge from "@/components/Disclaimer/DisclaimerDialoge";

export default function Home() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();

  const routerCallback = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth(routerCallback);
    }
  }, []);

  return (
    <main className="w-full overflow-hidden">
      <DisclaimerDialoge />
      <MediaList />
    </main>
  );
}
