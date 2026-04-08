"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/admin/auth/AuthLayout";
import { AuthInput, PrimaryButton, OutlineButton } from "@/components/admin/auth/AuthComponents";
import { adminAuthApi } from "@/utils/api/admin.auth.api";
import { adminForgotPasswordSchema, AdminForgotPasswordFormData } from "@/validators/admin-auth-schema";

const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminForgotPasswordFormData>({
    resolver: zodResolver(adminForgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: AdminForgotPasswordFormData) => {
    setError("");
    try {
      await adminAuthApi.forgotPassword(data);
      // Store email for OTP screen
      sessionStorage.setItem("adminResetEmail", data.email);
      router.push("/admin/auth/otp");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      setError(message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout bgImage="/assets/images/forgot.png" bgAlt="Forgot password background">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Enter your email and we will send you a verification code.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <div className="mb-6 sm:mb-8">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="flex gap-3">
          <OutlineButton type="button" onClick={() => router.back()} className="flex-1">
            Back
          </OutlineButton>
          <PrimaryButton
            type="submit"
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
            className="flex-1"
          >
            Next
          </PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;