"use client";
import React, { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "@/components/search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wallet from "./wallet";
import Sidebar from "./sidebar";

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-secondaryBackground h-7vh shadow-3d">
      <div className="w-11/12 h-full flex flex-row justify-between items-center mx-auto my-0">
        <div className="flex flex-row w-1/3 gap-10">
          <div className="flex flex-row gap-2 lg:gap-10">
            <button onClick={toggleSidebar} className="mx-4 lg:hidden">
              <RxHamburgerMenu />
            </button>
            <Link href="/">
              <h1 className="text-center font-black w-1/3">OWAD</h1>
            </Link>
          </div>
          <div className="hidden lg:flex flex-row justify-between w-2/3">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-highlight" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/myList"
              className={`${pathname === "/myList" ? "text-highlight" : ""}`}
            >
              My List
            </Link>
            <Link
              href="/anime"
              className={`${pathname === "/anime" ? "text-highlight" : ""}`}
            >
              Anime
            </Link>
            <Link
              href="/movies"
              className={`${pathname === "/movies" ? "text-highlight" : ""}`}
            >
              Movies
            </Link>
          </div>
        </div>
        <div className="flex justify-end lg:flex-row gap-10 items-center w-5/12">
          <Search />
          <div className="hidden lg:block">
            <Wallet />
          </div>
          <IoPerson className="text-2xl hidden lg:block" />
        </div>
        {isSidebarOpen && <Sidebar />}
      </div>
    </nav>
  );
};

export default Navbar;
