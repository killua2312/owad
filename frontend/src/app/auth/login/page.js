"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import "../../globals.css";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await fetch("http://localhost:5000/api/login/", {
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
        router.push("/");
      } else if (response.status === 401) {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-93">
      <div className="px-8 py-6 mt-4 text-left bg-secondaryBackground shadow-3d">
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 flex gap-2">
          <h5>Don't have an account</h5>
          <button className="bg-accent rounded-xl w-16 h-6">
            <Link href="/auth/signup">SignUp</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
