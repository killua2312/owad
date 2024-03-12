"use client";
import { useState, useEffect } from "react";
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
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";

const Signup = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // validate password
    if (formData.password !== formData.confirmPassword) {
      alert("passwords don't match!");
      return;
    }

    // validate username
    if (!/^[A-Za-z]{1,16}$/.test(formData.username)) {
      alert("username must be 1-16 alphabetic characters only");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        router.replace("/login");
      } else {
        console.log("signup failed");
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-93">
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>
            already have an accout,{" "}
            <Link href="/login" className="font-black text-xl">
              Login
            </Link>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                type="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
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
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">SignUp</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
