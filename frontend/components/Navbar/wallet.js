"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdAccountBalanceWallet } from "react-icons/md";

const Wallet = () => {
  // add wallet balance logic

  return (
    <Button variant="outline">
      <Link
        href="/wallet"
        className="flex flex-row gap-1 justify-center items-center"
      >
        <MdAccountBalanceWallet className="text-2xl mr-2" />
        <h4>2000</h4>
      </Link>
    </Button>
  );
};

export default Wallet;
