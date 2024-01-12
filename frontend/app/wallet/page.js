"use client";
import { useState, useEffect } from "react";
import { useAuthStore, useWalletStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WalletPage = () => {
  const { isAuthenticated } = useAuthStore();
  const [value, setValue] = useState("");
  const { amount, fetchAmount } = useWalletStore();

  useEffect(() => {
    fetchAmount();
  }, [amount]);

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue)) {
      setValue(newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/wallet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: value,
        }),
      });

      if (response.ok) {
        fetchAmount();
      } else {
        alert("Transaction Failed");
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  if (!isAuthenticated) {
    return <h2>Loading....</h2>;
  }

  return (
    <main className="w-2/5 h-93 mx-auto my-0">
      <div className="h-[20%]">
        <h2 className="text-center text-5xl font-bold m-10">Wallet</h2>
        <form onSubmit={handleSubmit} className="flex flex-row gap-5">
          <Input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Enter Amount"
          />
          <Button type="submit">Add money</Button>
        </form>
      </div>
      <div>
        <h2 className="text-center text-xl my-4 border-b-2 pb-5">
          Transaction History
        </h2>
        <div></div>
      </div>
    </main>
  );
};

export default WalletPage;
