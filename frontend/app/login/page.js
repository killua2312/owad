"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok || response.status === 200) {
        const { token } = data;
        localStorage.setItem("token", token);

        // for full home page reload
        window.location.href = "/";
      } else if (response.status === 401) {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-93">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Didn&apos;t register yet,{" "}
            <Link href="/signup" className="font-black text-xl">
              Signup
            </Link>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={formData.showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 fles items-center pr-2 pt-2 cursor-pointer"
                  onClick={handleCheckboxChange}
                >
                  {formData.showPassword ? <FaEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
