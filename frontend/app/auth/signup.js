"use client";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

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
      const response = await fetch("http://localhost:5000/api/signup", {
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
        alert("Registration Successfull, Now log in");
      } else {
        console.log("signup failed");
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>
          already have an accout, Switch to login
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent classname="space-y-2">
          <div className="space-y-1">
            <Label hrmlFor="username">Username</Label>
            <Input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type={formData.showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Checkbox
              checked={formData.showPassword}
              onCheckedChange={handleCheckboxChange}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Show Password
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">SignUp</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Signup;
