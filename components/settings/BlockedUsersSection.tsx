"use client";

import React from 'react';
import { UserX } from 'lucide-react';
import SettingsSection from './SettingsSection';

const BlockedUsersSection: React.FC = () => {
  return (
    <SettingsSection title="BLOCKED USERS">
      <div className="px-4 bg-inputBg py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
            <UserX className="w-8 h-8 text-textGray" />
          </div>
          <p className="text-textGray text-sm">No blocked users</p>
        </div>
      </div>
    </SettingsSection>
  );
};

export default BlockedUsersSection;

