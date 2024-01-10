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

const AccountMenu = () => {
  // add conditional render, if loggedIn

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoPerson className="text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="outline" className="mx-auto my-0">
            <Link href="/auth">Login</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
