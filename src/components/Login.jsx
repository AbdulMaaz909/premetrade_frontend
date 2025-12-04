"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { checkUserLogin } from "@/service";
import { isSuccess } from "@/utilities";
import { toast } from "react-toastify";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const schema = z.object({
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "abdulmaaz827@gmail.com", password: "123123" },
  });

  const onSubmit = async (values) => {
    try {
      const checkUserLoginRes = await checkUserLogin(values);
      if (isSuccess(checkUserLoginRes)) {
        toast.success("User Login Successfully");
        const { token, photo } = checkUserLoginRes.data || {};
        localStorage.setItem("token", token);
        if (photo) localStorage.setItem("profile", photo);
        router.push("/dashboard");
      } else {
        setMessage("Invalid user or password!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 m-2 border border-gray-300 rounded-md mb-1 focus:ring-2 focus:ring-black outline-none"
          {...register("email")}
        />
        {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 m-2 border border-gray-300 rounded-md mb-1 focus:ring-2 focus:ring-black outline-none"
          {...register("password")}
        />
        {errors.password && <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-black m-2 text-white py-3 rounded-md hover:bg-gray-800 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don`t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
