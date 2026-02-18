// src/validators/auth.schemas.ts
// Single source of truth for all auth form validation rules

import { z } from "zod";

// ─── Reusable field rules ─────────────────────────────────────────────────────

const emailField = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(6, "Password must be at least 6 characters");

const otpField = z
  .string()
  .min(1, "OTP is required")
  .length(6, "OTP must be exactly 6 digits")
  .regex(/^\d{6}$/, "OTP must contain only numbers");

// ─── Signup ───────────────────────────────────────────────────────────────────

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error appears under confirmPassword field
  });

export type SignupFormData = z.infer<typeof signupSchema>;

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  // ⚠️ No min(6) here — we don't want to tell attackers the length requirement
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ─── OTP verify ───────────────────────────────────────────────────────────────

export const otpSchema = z.object({
  otp: otpField,
});

export type OtpFormData = z.infer<typeof otpSchema>;

// ─── Forgot password ──────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ─── Reset password ───────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    newPassword: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
