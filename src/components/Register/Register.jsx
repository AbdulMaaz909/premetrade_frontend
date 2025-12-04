"use client";
import { registerUser } from "@/service";
import { isSuccess } from "@/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const RegisterPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const schema = z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Enter a valid email" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Confirm Password is required" }),
      photo: z.any().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords must match",
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      // If a photo was selected, send multipart/form-data
      let payload = null;
      if (values.photo && values.photo.length > 0) {
        payload = new FormData();
        payload.append("name", values.name);
        payload.append("email", values.email);
        payload.append("password", values.password);
        payload.append("photo", values.photo[0]);
      } else {
        payload = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
      }

      const registerUserRes = await registerUser(payload);

      if (isSuccess(registerUserRes)) {
        toast.success("User registered successfully!");
        reset();
        router.push("/");
      } else {
        setMessage("Oops Something went wrong, please try again");
        toast.error("Failed to register");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to register!";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 m-1 border border-gray-300 rounded-md mb-1 focus:ring-2 focus:ring-black outline-none"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mb-2">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 m-1 border border-gray-300 rounded-md mb-1 focus:ring-2 focus:ring-black outline-none"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 m-1 border border-gray-300 rounded-md mb-1 focus:ring-2 focus:ring-black outline-none"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 m-1 border border-gray-300 rounded-md mb-1 focus:ring-2 focus:ring-black outline-none"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mb-2">
            {errors.confirmPassword.message}
          </p>
        )}

        <label className="block m-1 text-sm font-medium text-gray-700 mt-2 mb-1">
          Profile Photo (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full mb-3"
          {...register("photo")}
        />

        <button
          type="submit"
          className="w-full m-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
