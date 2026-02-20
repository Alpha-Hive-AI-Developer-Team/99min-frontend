"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import { useProfile } from "@/hooks/UseProfile";
import { UpdateProfilePayload } from "@/services/settings.service";

interface ProfilePageProps {
  onBack?: () => void;
  onSubmit?: (data: UpdateProfilePayload) => void;
}

/**
 * Safely converts a dob value (Date object, ISO string, or undefined) to a
 * yyyy-MM-dd string suitable for an <input type="date" />.
 */
function formatDobForInput(dob: string | Date | undefined | null): string {
  if (!dob) return "";
  // FIX: dob could be a JS Date from the API, not just an ISO string.
  // Calling .split("T") on a Date object would throw.
  const date = new Date(dob);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onSubmit }) => {
  const router = useRouter();
  const { profile, loading, saving, error, handleUpdateProfile } = useProfile();

  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  const handleSubmit = async (data: UpdateProfilePayload) => {
    const success = await handleUpdateProfile(data);
    if (success && onSubmit) onSubmit(data);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <PageHeader title="Profile" onBack={handleBack} maxWidth="7xl" />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse mx-auto" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Profile" onBack={handleBack} maxWidth="7xl" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>
        )}

        <ProfileAvatar
          initial={profile?.name?.[0]?.toUpperCase() ?? "?"}
          imageUrl={profile?.avatar}
          onImageChange={() => console.log("Change image")}
        />

        <ProfileForm
          defaultValues={{
            name: profile?.name ?? "",
            username: profile?.username ?? "",
            bio: profile?.bio ?? "",
            phone: profile?.phone ?? "",
            // FIX: safely handle dob whether it's a Date object or an ISO string
            dob: formatDobForInput(profile?.dob),
          }}
          saving={saving}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProfilePage;