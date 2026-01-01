"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SettingsItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, onClick, href }) => {
  const content = (
    <div className="flex items-center justify-between w-full py-3">
      <div className="flex items-center gap-3">
        <div className="text-textBlack">{icon}</div>
        <span className="text-textBlack font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-textGray" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:bg-gray-50 rounded-lg transition-colors">
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left hover:bg-gray-50 rounded-lg transition-colors"
    >
      {content}
    </button>
  );
};

export default SettingsItem;

