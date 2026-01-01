"use client";

import React from 'react';
import { LogOut } from 'lucide-react';

interface LogOutButtonProps {
  onClick?: () => void;
}

const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-lightRed text-red font-bold py-4 px-4 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
    >
      <LogOut className="w-5 h-5" />
      Log Out
    </button>
  );
};

export default LogOutButton;

