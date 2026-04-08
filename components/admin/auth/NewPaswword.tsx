"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/admin/auth/AuthLayout";
import { AuthInput, PrimaryButton } from "@/components/admin/auth/AuthComponents";
import { adminAuthApi } from "@/utils/api/admin.auth.api";
import { adminResetPasswordSchema, AdminResetPasswordFormData } from "@/validators/admin-auth-schema";

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"] as const;
const strengthBarColors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"] as const;
const strengthTextColors = ["", "text-red-500", "text-yellow-500", "text-blue-500", "text-green-500"] as const;

const NewPasswordScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("adminResetToken");
    if (!token) router.replace("/admin/auth/forgot-password");
  }, [router]);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminResetPasswordFormData>({
    resolver: zodResolver(adminResetPasswordSchema),
    mode: "onChange",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const newPassword = useWatch({ control, name: "newPassword" }) ?? "";
  const strength = [
    newPassword.length >= 8,
    /[A-Z]/.test(newPassword),
    /[0-9]/.test(newPassword),
    /[^A-Za-z0-9]/.test(newPassword),
  ].filter(Boolean).length;

  const onSubmit = async (data: AdminResetPasswordFormData) => {
    const resetToken = sessionStorage.getItem("adminResetToken");
    if (!resetToken) {
      router.replace("/admin/auth/forgot-password");
      return;
    }
    try {
      await adminAuthApi.resetPassword({ resetToken, newPassword: data.newPassword });
      sessionStorage.removeItem("adminResetToken");
      sessionStorage.removeItem("adminResetEmail");
      router.push("/admin/auth/password-updated");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      setError("root", { message: message || "Something went wrong. Please try again." });
    }
  };

  return (
    <AuthLayout bgImage="/assets/images/new.png" bgAlt="Create new password background">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Create New Password
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Create a secure new password to protect your account.
        </p>
      </div>

      {errors.root && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors.root.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <AuthInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          hint="Must be at least 8 characters."
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        {newPassword.length > 0 && (
          <div className="mb-4 -mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i <= strength ? strengthBarColors[strength] : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            {strengthLabels[strength] && (
              <p className="text-xs text-gray-400">
                Strength:{" "}
                <span className={`font-medium ${strengthTextColors[strength]}`}>
                  {strengthLabels[strength]}
                </span>
              </p>
            )}
          </div>
        )}

        <AuthInput
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className="mt-2">
          <PrimaryButton
            type="submit"
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
          >
            Set New Password
          </PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default NewPasswordScreen;