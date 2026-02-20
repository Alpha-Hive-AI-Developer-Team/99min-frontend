"use client";

import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  initial: string;
  /** FIX: imageUrl was passed from ProfilePage but this prop didn't exist */
  imageUrl?: string;
  onImageChange?: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  initial,
  imageUrl,
  onImageChange,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <div className="w-24 h-24 bg-orange rounded-full flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Profile avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-4xl font-bold">
              {initial.toUpperCase()}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onImageChange}
          className="absolute bottom-0 right-0 w-10 h-10 bg-orange rounded-full flex items-center justify-center border-4 border-white shadow-sm hover:bg-orangeHover transition-colors"
          aria-label="Change profile picture"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProfileAvatar;