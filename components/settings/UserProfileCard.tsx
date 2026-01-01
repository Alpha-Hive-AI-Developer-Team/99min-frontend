"use client";

import React from 'react';

interface UserProfileCardProps {
  name: string;
  email: string;
  initial?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  initial,
}) => {
  const getInitial = () => {
    if (initial) return initial.toUpperCase();
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-inputBg mt-4  rounded-xl p-4 flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-orange rounded-xl flex items-center justify-center shrink-0">
        <span className="text-white text-2xl font-bold">{getInitial()}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-textBlack truncate">{name}</h2>
        <p className="text-textGray text-sm truncate">{email}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;

