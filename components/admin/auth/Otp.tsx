"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "@/components/admin/auth/AuthLayout";
import { OtpInput, PrimaryButton } from "@/components/admin/auth/AuthComponents";
import { adminAuthApi } from "@/utils/api/admin.auth.api";

// ── Zod schema (mirrors user otpSchema) ─────────────────────────────────────
const adminOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d{6}$/, "Code must contain only digits"),
});

type AdminOtpFormData = z.infer<typeof adminOtpSchema>;

// ────────────────────────────────────────────────────────────────────────────

const OtpScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resendKey, setResendKey] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(60);

  // Guard: must arrive here from forgot-password
  useEffect(() => {
    const stored = sessionStorage.getItem("adminResetEmail");
    if (!stored) {
      router.replace("/admin/auth/forgot-password");
      return;
    }
    setEmail(stored);
  }, [router]);

  // Resend countdown (mirrors user OtpModal)
  useEffect(() => {
    if (resendSeconds <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendSeconds]);

  const {
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminOtpFormData>({
    resolver: zodResolver(adminOtpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp");

  // Wire OtpInput (array-based) into react-hook-form (string-based)
  const handleOtpChange = (digits: string[]) => {
    const code = digits.join("");
    setValue("otp", code, { shouldValidate: true });
  };

  const onSubmit = async (data: AdminOtpFormData) => {
    if (!email) return;
    try {
      const res = await adminAuthApi.verifyResetOtp({ email, otp: data.otp });
      sessionStorage.setItem("adminResetToken", res.data.resetToken);
      router.push("/admin/auth/reset-password");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      const normalized = message.toLowerCase();

      if (normalized.includes("expired")) {
        setError("otp", { message: "OTP has expired. Please request a new one." });
      } else {
        setError("otp", { message: "Invalid code. Please try again." });
        // Clear the OTP inputs on wrong code (mirrors user flow)
        setValue("otp", "", { shouldValidate: false });
      }
    }
  };

  const handleResend = async () => {
    if (!canResend || !email) return;
    setValue("otp", "", { shouldValidate: false });
    setCanResend(false);
    setResendSeconds(60);
    setResendKey((k) => k + 1);
    try {
      await adminAuthApi.forgotPassword({ email });
    } catch (err: unknown) {
      setError("root", {
        message: err instanceof Error ? err.message : "Failed to resend OTP. Please try again.",
      });
    }
  };

  // Convert form string back to array for the OtpInput component
  const otpArray = otpValue.padEnd(6, "").split("").slice(0, 6) as string[];

  return (
    <AuthLayout bgImage="/assets/images/otp.png" bgAlt="OTP verification background">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          OTP Verification
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Enter the 6-digit verification code sent to{" "}
          <span className="font-medium text-gray-700">{email}</span>.
        </p>
      </div>

      {/* Root-level API errors (e.g. resend failure) */}
      {errors.root && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors.root.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mt-4 sm:mt-6 mb-2">
        <OtpInput value={otpArray} onChange={handleOtpChange} length={6} />
        </div>

        {/* Zod / API error on the OTP field */}
        {errors.otp && (
          <p className="text-center text-xs text-red-500 mt-2 mb-2">
            {errors.otp.message}
          </p>
        )}

      
{!canResend && (
  <p className="text-center text-sm text-gray-400 mb-2">
    Resend available in{" "}
    <span className="font-medium text-gray-600">{resendSeconds}s</span>
  </p>
)}

<p className="text-center text-sm text-gray-400 mb-6">
  Didn&apos;t receive the code?{" "}
  {canResend ? (
    <button
      type="button"
      onClick={handleResend}
      className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
    >
      Resend
    </button>
  ) : (
    <span className="opacity-70">Resend in {resendSeconds}s</span>
  )}
</p>

        <PrimaryButton
          type="submit"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          Submit
        </PrimaryButton>
      </form>
    </AuthLayout>
  );
};

export default OtpScreen;