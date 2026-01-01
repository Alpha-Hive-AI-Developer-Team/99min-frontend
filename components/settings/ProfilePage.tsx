"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/shared/PageHeader';
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './ProfileForm';

interface ProfilePageProps {
  onBack?: () => void;
  onSubmit?: (data: any) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onSubmit }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleSubmit = async (data: any) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      console.log('Profile saved:', data);
      // Don't navigate back automatically - let the modal handle it
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Profile" onBack={handleBack} maxWidth="7xl" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileAvatar initial="J" onImageChange={() => console.log('Change image')} />
        <ProfileForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProfilePage;

