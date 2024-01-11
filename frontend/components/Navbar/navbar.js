"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import SearchComponent from "./search";
import Wallet from "./wallet";
import AccountMenu from "./profile";
import Sidebar from "./sidebar";
import { useAuthStore } from "@/lib/store";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const routerCallback = () => {
    router.push("/auth");
  };

  useEffect(() => {
    checkAuth(routerCallback);
  }, [isAuthenticated]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="h-7vh shadow-3d border-b-2">
      <nav className="w-11/12 h-full flex flex-row justify-between items-center mx-auto my-0">
        <div className="flex flex-row w-1/3 gap-10">
          <div className="flex flex-row items-center gap-2 lg:gap-10">
            <Button
              variant="ghost"
              onClick={toggleSidebar}
              className="mx-4 text-2xl lg:hidden"
            >
              <RxHamburgerMenu />
            </Button>
            <Link href="/">
              <h1 className="text-center font-black w-1/3">OWAD</h1>
            </Link>
          </div>
          <div className="hidden lg:flex flex-row justify-between w-2/3">
            <Link href="/" className={`${pathname === "/" ? "font-bold" : ""}`}>
              Home
            </Link>
            <Link
              href="/myList"
              className={`${pathname === "/myList" ? "font-bold" : ""}`}
            >
              My List
            </Link>
            <Link
              href="/anime"
              className={`${pathname === "/anime" ? "font-bold" : ""}`}
            >
              Anime
            </Link>
            <Link
              href="/movies"
              className={`${pathname === "/movies" ? "font-bold" : ""}`}
            >
              Movies
            </Link>
          </div>
        </div>
        <div className="flex justify-end lg:flex-row gap-10 items-center w-5/12">
          <SearchComponent />
          <div className="hidden lg:block">
            <Wallet />
          </div>
          <div className="hidden lg:block">
            <AccountMenu />
          </div>
        </div>
        {isSidebarOpen && <Sidebar />}
      </nav>
    </header>
  );
};

export default Navbar;
