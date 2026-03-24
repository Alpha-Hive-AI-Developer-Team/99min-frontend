// src/components/auth/SignupScreen.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/ui";
import { AuthPageLayout, AuthHeader, AuthFormFooter } from "./shared";
import { Toast } from "@/components/ui/Toast";
import OtpModal from "@/components/auth/OtpModal";
import { authApi } from "@/utils/api/auth.api";
import { setAccessToken } from "@/utils/api";
import { useAuth } from "@/store/auth-context";
import { signupSchema, SignupFormData } from "@/validators/auth-schema";
import { useI18n } from "@/contexts/i18n-context";
import en from "@/messages/en.json";

interface ToastState {
  message: string;
  type: "error" | "success" | "warning";
}

const SignupScreen: React.FC = () => {
  const { tr } = useI18n();
  const router = useRouter();
  const { setAuth } = useAuth();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmailState] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const showToast = (message: string, type: ToastState["type"] = "error") => {
    setToast(null);
    setTimeout(() => setToast({ message, type }), 10);
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      await authApi.signup({ name: data.name.trim(), email: data.email, password: data.password });
      setEmailState(data.email);
      setStep("otp");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      const normalized = message.toLowerCase();

      if (normalized.includes("already exists") || normalized.includes("already registered")) {
        // Existing-but-unverified account should continue in OTP flow.
        try {
          await authApi.resendSignupOtp({ email: data.email });
          setEmailState(data.email);
          setStep("otp");
        } catch (resendErr: unknown) {
          const resendMessage = resendErr instanceof Error ? resendErr.message : "";
          const resendNormalized = resendMessage.toLowerCase();

          if (resendNormalized.includes("already verified")) {
            showToast("This account is already verified. Please log in.", "warning");
          } else if (resendMessage) {
            showToast(resendMessage, "warning");
          } else {
            showToast("An account with this email already exists. Please log in.", "warning");
          }
        }
      } else if (message.includes("valid email") || message.includes("invalid email")) {
        showToast("Please enter a valid email address.", "error");
      } else if (message.includes("6 characters") || message.includes("too short")) {
        showToast("Password must be at least 6 characters.", "error");
      } else if (message.includes("required") || message.includes("All fields")) {
        showToast("Please fill in all required fields.", "error");
      } else {
        showToast(message || tr(en.auth.signupFailed), "error");
      }
    }
  };

  if (step === "otp") return (
    <OtpModal
      email={email}
      onBack={() => setStep("form")}
      onVerify={(result) => {
        if (result?.data?.accessToken && result?.data?.user) {
          setAccessToken(result.data.accessToken);
          setAuth(result.data.user, result.data.accessToken);
          router.push("/dashboard/explore");
          return;
        }
        router.push("/auth/login");
      }}
      purpose="signup"
    />
  );

  return (
    <AuthPageLayout backButtonHref="/" contentMaxWidth="sm">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
      <AuthHeader
        title={tr(en.auth.createAccount)}
        subtitle={tr(en.auth.joinSubtitle)}
        ticketSize="sm"
        titleSize="2xl"
        className="mb-6"
      />
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>

        {/* Name */}
        <div>
          <Input
            type="text"
            id="name"
            label={tr(en.auth.name)}
            placeholder={tr(en.auth.namePlaceholder)}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{tr(String(errors.name.message))}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            id="email"
            label={tr(en.auth.email)}
            placeholder={tr(en.auth.emailPlaceholder)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{tr(String(errors.email.message))}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            type="password"
            id="password"
            label={tr(en.auth.password)}
            placeholder={tr(en.auth.createPasswordPlaceholder)}
            showPasswordToggle
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{tr(String(errors.password.message))}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Input
            type="password"
            id="confirm-password"
            label={tr(en.auth.confirmPassword)}
            placeholder={tr(en.auth.confirmPasswordPlaceholder)}
            showPasswordToggle
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{tr(String(errors.confirmPassword.message))}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? tr(en.auth.creatingAccount) : tr(en.auth.createAccount)}
          </Button>
        </div>

        <AuthFormFooter
          question={tr(en.auth.alreadyHaveAccount)}
          linkText={tr(en.auth.login)}
          linkHref="/auth/login"
          className="mt-4"
        />

        <div className="pt-8 pb-4">
          <p className="text-center text-textGray text-xs px-4 leading-relaxed opacity-80">
            {tr(en.auth.termsNotice)}
          </p>
        </div>
      </form>
    </AuthPageLayout>
  );
};

export default SignupScreen;