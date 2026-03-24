// src/components/auth/LoginScreen.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/ui";
import { Toast } from "@/components/ui/Toast";
import { AuthPageLayout, AuthHeader, AuthFormFooter } from "./shared";
import OtpModal from "@/components/auth/OtpModal";
import { authApi } from "@/utils/api/auth.api";
import { useAuth } from "@/store/auth-context";
import { setAccessToken } from "@/utils/api";
import { loginSchema, LoginFormData } from "@/validators/auth-schema";
import { useI18n } from "@/contexts/i18n-context";
import en from "@/messages/en.json";

interface ToastState {
  message: string;
  type: "error" | "success" | "warning";
}

const LoginScreen: React.FC = () => {
  const { tr } = useI18n();
  const router = useRouter();
  const { setAuth } = useAuth();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const showToast = (message: string, type: ToastState["type"] = "error") => {
    setToast(null);
    setTimeout(() => setToast({ message, type }), 10);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await authApi.login({ email: data.email, password: data.password });
      setAccessToken(res.data.accessToken);
      setAuth(res.data.user, res.data.accessToken);
      router.push("/dashboard/explore");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";

      if (message.includes("No account found")) {
        showToast(tr(en.auth.accountNotFound), "error");
      } else if (
        message.toLowerCase().includes("not verified") ||
        message.toLowerCase().includes("verify your email")
      ) {
        setEmailForOtp(data.email.trim());
        setStep("otp");
      } else if (message.includes("Google") || message.includes("Facebook")) {
        showToast(message, "warning");
      } else if (message.includes("Invalid email or password")) {
        showToast(tr(en.auth.invalidCredentials), "error");
      } else {
        showToast(message || tr(en.auth.loginFailed), "error");
      }
    }
  };

  if (step === "otp") {
    return (
      <OtpModal
        email={emailForOtp}
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
  }

  return (
    <AuthPageLayout backButtonHref="/" contentMaxWidth="sm" contentClassName="justify-center">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}

      <AuthHeader title={tr(en.auth.welcomeBack)} subtitle={tr(en.auth.loginToContinue)} />
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

        {/* Email */}
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            label={tr(en.auth.email)}
            placeholder={tr(en.auth.emailPlaceholder)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-2">
          <Input
            type="password"
            id="password"
            label={tr(en.auth.password)}
            placeholder={tr(en.auth.passwordPlaceholder)}
            showPasswordToggle
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{tr(String(errors.password.message))}</p>
          )}
        </div>

        <div className="flex justify-end mb-6">
          <Link href="/auth/forgot-password">
            <Button type="button" variant="link" size="sm">{tr(en.auth.forgotPassword)}</Button>
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={!isValid || isSubmitting}>
          {isSubmitting ? tr(en.auth.loggingIn) : tr(en.auth.loginSubmit)}
        </Button>

        <AuthFormFooter
          question={tr(en.auth.noAccount)}
          linkText={tr(en.auth.signup)}
          linkHref="/auth/signup"
          className="mt-6"
        />
      </form>
    </AuthPageLayout>
  );
};

export default LoginScreen;