"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SettingsSection from './SettingsSection';
import RadioButton from './RadioButton';
import NotificationToggle from './NotificationToggle';
import BlockedUsersSection from './BlockedUsersSection';
import { Button } from '@/components/ui';
import { Trash2 } from 'lucide-react';

interface PrivacyPageProps {
  onBack?: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private' | 'hidden'>('public');
  const [showLocation, setShowLocation] = useState(true);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [whoCanMessage, setWhoCanMessage] = useState<'everyone' | 'responders' | 'noone'>('everyone');

  const handleDownloadData = () => {
    console.log('Downloading data...');
    // Handle data download
  };

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
    // Handle account deletion (should open a confirmation modal)
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Privacy & Safety" onBack={onBack} maxWidth="7xl" />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Visibility Section */}
        <SettingsSection title="PROFILE VISIBILITY">
          <div className="px-4 py-2">
            <RadioButton
              name="profileVisibility"
              value="public"
              label="Public"
              description="Anyone can see your profile"
              checked={profileVisibility === 'public'}
              onChange={() => setProfileVisibility('public')}
            />
            <RadioButton
              name="profileVisibility"
              value="private"
              label="Private"
              description="Only people you chat with"
              checked={profileVisibility === 'private'}
              onChange={() => setProfileVisibility('private')}
            />
            <RadioButton
              name="profileVisibility"
              value="hidden"
              label="Hidden"
              description="Completely anonymous"
              checked={profileVisibility === 'hidden'}
              onChange={() => setProfileVisibility('hidden')}
            />
          </div>
        </SettingsSection>

        {/* Information Sharing Section */}
        <SettingsSection title="INFORMATION SHARING">
          <div className="px-4">
            <NotificationToggle
              label="Show Location"
              description="Display city/region on ads"
              enabled={showLocation}
              onChange={setShowLocation}
            />
            <NotificationToggle
              label="Show Phone Number"
              description="Share with responders"
              enabled={showPhoneNumber}
              onChange={setShowPhoneNumber}
            />
          </div>
        </SettingsSection>

        {/* Who Can Message You Section */}
        <SettingsSection title="WHO CAN MESSAGE YOU">
          <div className="px-4 py-2">
            <RadioButton
              name="whoCanMessage"
              value="everyone"
              label="Everyone"
              checked={whoCanMessage === 'everyone'}
              onChange={() => setWhoCanMessage('everyone')}
            />
            <RadioButton
              name="whoCanMessage"
              value="responders"
              label="Only Task Responders"
              checked={whoCanMessage === 'responders'}
              onChange={() => setWhoCanMessage('responders')}
            />
            <RadioButton
              name="whoCanMessage"
              value="noone"
              label="No One"
              checked={whoCanMessage === 'noone'}
              onChange={() => setWhoCanMessage('noone')}
            />
          </div>
        </SettingsSection>

        {/* Blocked Users Section */}
        <BlockedUsersSection />

        {/* Data & Privacy Section */}
        <SettingsSection title="DATA & PRIVACY">
          <div className="px-4 py-4 space-y-4">
            <button
              onClick={handleDownloadData}
              className="w-full px-4 bg-inputBg  py-4 rounded-xl text-left text-textBlack font-medium hover:text-orange transition-colors"
            >
              Download My Data
            </button>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleDeleteAccount}
              className="bg-lightRed text-red text-start  hover:bg-red-50 border-0"
            >

              <span className="text-red">      Delete My Account</span>
            </Button>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default PrivacyPage;

