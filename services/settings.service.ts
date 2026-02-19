import { request } from "@/utils/api/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
  userId: string;
  name?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  phone?: string;
  dob?: string;
  tasksPosted: number;
  tasksCompleted: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  name?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  phone?: string;
  dob?: string;
}

export interface LocationSettings {
  shareLocation: boolean;
  defaultRadius: number;
  autoDetect: boolean;
}

export interface UpdateLocationPayload {
  shareLocation?: boolean;
  defaultRadius?: number;
  autoDetect?: boolean;
  label?: string;
  coordinates?: [number, number]; // [lng, lat]
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  showPhone: boolean;
  showEmail: boolean;
  showLocation: boolean;
  allowMessages: boolean;
}

export interface UpdatePrivacyPayload {
  profileVisibility?: "public" | "private" | "friends";
  showPhone?: boolean;
  showEmail?: boolean;
  showLocation?: boolean;
  allowMessages?: boolean;
}

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
  newResponse: boolean;
  taskExpiring: boolean;
  taskAccepted: boolean;
  marketing: boolean;
  weeklyDigest: boolean;
}

export interface UpdateNotificationSettingsPayload {
  push?: boolean;
  email?: boolean;
  sms?: boolean;
  newResponse?: boolean;
  taskExpiring?: boolean;
  taskAccepted?: boolean;
  marketing?: boolean;
  weeklyDigest?: boolean;
}

export interface PaymentMethod {
  _id: string;
  userId: string;
  stripePaymentMethodId: string;
  type: "card" | "paypal" | "bank_account";
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface AddPaymentMethodPayload {
  stripePaymentMethodId: string;
  type: "card" | "paypal" | "bank_account";
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  isDefault?: boolean;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function getProfile(): Promise<{ success: boolean; data: Profile }> {
  return request("/api/profile");
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<{ success: boolean; message: string; data: Profile }> {
  return request("/api/profile", { method: "PATCH", body: JSON.stringify(payload) });
}

// ─── Location Settings ────────────────────────────────────────────────────────

export async function getLocationSettings(): Promise<{ success: boolean; data: LocationSettings }> {
  return request("/api/profile/settings/location");
}

export async function updateLocationSettings(
  payload: UpdateLocationPayload
): Promise<{ success: boolean; message: string; data: LocationSettings }> {
  return request("/api/profile/settings/location", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// ─── Privacy Settings ─────────────────────────────────────────────────────────

export async function getPrivacySettings(): Promise<{ success: boolean; data: PrivacySettings }> {
  return request("/api/profile/settings/privacy");
}

export async function updatePrivacySettings(
  payload: UpdatePrivacyPayload
): Promise<{ success: boolean; message: string; data: PrivacySettings }> {
  return request("/api/profile/settings/privacy", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// ─── Notification Settings ────────────────────────────────────────────────────

export async function getNotificationSettings(): Promise<{
  success: boolean;
  data: NotificationSettings;
}> {
  return request("/api/profile/settings/notifications");
}

export async function updateNotificationSettings(
  payload: UpdateNotificationSettingsPayload
): Promise<{ success: boolean; message: string; data: NotificationSettings }> {
  return request("/api/profile/settings/notifications", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// ─── Payment Methods ──────────────────────────────────────────────────────────

export async function getPaymentMethods(): Promise<{ success: boolean; data: PaymentMethod[] }> {
  return request("/api/payment-methods");
}

export async function addPaymentMethod(
  payload: AddPaymentMethodPayload
): Promise<{ success: boolean; data: PaymentMethod }> {
  return request("/api/payment-methods", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function setDefaultPaymentMethod(
  methodId: string
): Promise<{ success: boolean; data: PaymentMethod }> {
  return request(`/api/payment-methods/${methodId}`, {
    method: "PATCH",
    body: JSON.stringify({ isDefault: true }),
  });
}

export async function deletePaymentMethod(
  methodId: string
): Promise<{ success: boolean; data: { message: string } }> {
  return request(`/api/payment-methods/${methodId}`, { method: "DELETE" });
}