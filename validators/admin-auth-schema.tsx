import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export const adminForgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});
export type AdminForgotPasswordFormData = z.infer<typeof adminForgotPasswordSchema>;

export const adminOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numbers only"),
});
export type AdminOtpFormData = z.infer<typeof adminOtpSchema>;

export const adminResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type AdminResetPasswordFormData = z.infer<typeof adminResetPasswordSchema>;