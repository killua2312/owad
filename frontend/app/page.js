"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MediaList from "@/components/media/mediaList";
import { useAuthStore } from "@/lib/store";

export default function Home() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();

  const routerCallback = () => {
    router.push("/auth");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth(routerCallback);
    }
  }, []);

  return (
    <main className="w-full overflow-hidden">
      <MediaList />
    </main>
  );
}
