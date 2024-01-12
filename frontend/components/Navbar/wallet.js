"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useWalletStore, useAuthStore } from "@/lib/store";

const Wallet = () => {
  // add wallet balance logic
  const { amount, fetchAmount } = useWalletStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchAmount();
  }, [amount, isAuthenticated]);
  return (
    <Button variant="outline">
      <Link
        href="/wallet"
        className="flex flex-row gap-1 justify-center items-center"
      >
        <MdAccountBalanceWallet className="text-2xl mr-2" />
        <h4>{amount}</h4>
      </Link>
    </Button>
  );
};

export default Wallet;
