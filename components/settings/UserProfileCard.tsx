"use client";

import React from "react";
import Image from "next/image";

interface UserProfileCardProps {
  name: string;
  /** Optional — shown below the name when provided */
  email?: string;
  /** Optional pre-computed initial; falls back to first two letters of name */
  initial?: string;
  /** Optional avatar URL */
  avatar?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  initial,
  avatar,
}) => {
  const getInitial = () => {
    if (initial) return initial.toUpperCase();
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-inputBg mt-4 rounded-xl p-4 flex items-center gap-4 mb-6">
      {/* Avatar: show image if available, otherwise show initials */}
      <div className="w-16 h-16 bg-orange rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <span className="text-white text-2xl font-bold">{getInitial()}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-textBlack truncate">{name}</h2>
        {/* FIX: email is now optional — render only when provided */}
        {email && <p className="text-textGray text-sm truncate">{email}</p>}
      </div>
    </div>
  );
};

export default UserProfileCard;