"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import "../../globals.css";

const Page = () => {
  const router = useRouter();
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
      const response = await fetch("http://localhost:5000/api/signup/", {
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
        router.push("/auth/login");
      } else {
        console.log("signup failed");
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <div className="flex justify-center h-93">
      <div className="px-8 py-6 mt-4 text-left bg-secondaryBackground shadow-3d">
        <h3 className="text-2xl font-bold text-center">SignUp</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mt-4">
            <label className="block" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-primaryBackground border-primaryText rounded-xl ml-4 pl-4 h-8"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <label className="block" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-primaryBackground border-primaryText rounded-xl ml-4 pl-4 h-8"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <label className="block" htmlFor="password">
              Password:
            </label>
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-primaryBackground border-primaryText rounded-xl ml-4 pl-4 h-8"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <label className="block" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              type={formData.showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-primaryBackground border-primaryText rounded-xl ml-4 pl-4 h-8"
            />
          </div>
          <div className="mt-4">
            <label>
              <input
                type="checkbox"
                checked={formData.showPassword}
                onChange={handleCheckboxChange}
                className="mr-4"
              />
              Show Password
            </label>
          </div>
          <div className="w-full flex justify-center mt-4">
            <button type="submit" className="w-52 h-10 bg-accent rounded-xl">
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 flex gap-2">
          <h5>Already have an account</h5>
          <button className="bg-accent rounded-xl w-16 h-6">
            <Link href="/auth/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
