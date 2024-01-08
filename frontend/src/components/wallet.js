"use client";
import Link from "next/link";
import { MdAccountBalanceWallet } from "react-icons/md";

const Wallet = () => {
  // add wallet balance logic

  return (
    <Link href="/wallet" className="flex flex-row gap-1 justify-center">
      <MdAccountBalanceWallet className="text-2xl" />
      <h4>2000</h4>
    </Link>
  );
};

export default Wallet;
