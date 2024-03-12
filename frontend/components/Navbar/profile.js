"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";

const AccountMenu = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  const routerCallback = () => {
    window.location.href = "/login";
  };

  const handleClick = () => {
    localStorage.removeItem("token");
    checkAuth(routerCallback);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoPerson className="text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {isAuthenticated ? (
            <Button
              variant="outline"
              className="mx-auto my-0"
              onClick={handleClick}
            >
              Logout
            </Button>
          ) : (
            <Button variant="outline" className="mx-auto my-0">
              <Link href="/auth">Login</Link>
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
