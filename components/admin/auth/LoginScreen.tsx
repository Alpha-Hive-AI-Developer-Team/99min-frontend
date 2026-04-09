"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/admin/auth/AuthLayout";
import { AuthInput, PrimaryButton } from "@/components/admin/auth/AuthComponents";
import { adminAuthApi } from "@/utils/api/admin.auth.api";
import { useAdminAuth } from "@/store/admin-auth-context";
import { setAccessToken } from "@/utils/api/client";
import { adminLoginSchema, AdminLoginFormData } from "@/validators/admin-auth-schema";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { setAdminAuth } = useAdminAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setError("");
    try {
      const res = await adminAuthApi.login(data);
      setAccessToken(res.data.accessToken);
      setAdminAuth(res.data.admin, res.data.accessToken);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      if (message.includes("Invalid email or password")) {
        setError("Invalid email or password.");
      } else if (message.includes("Admin accounts only")) {
        setError("This account does not have admin access.");
      } else {
        setError(message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout bgImage="/assets/images/login.png" bgAlt="Login background">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Log in
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Welcome back! Please enter your details.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex justify-end mb-6 mt-1">
          <Link
            href="/admin/auth/forgot-password"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Forgot password
          </Link>
        </div>

        <PrimaryButton type="submit" loading={isSubmitting} disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </PrimaryButton>
      </form>
    </AuthLayout>
  );
};

export default LoginScreen;