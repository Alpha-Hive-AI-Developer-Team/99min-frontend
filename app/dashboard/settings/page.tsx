"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SettingsHeader from '@/components/settings/SettingsHeader';
import UserProfileCard from '@/components/settings/UserProfileCard';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsItem from '@/components/settings/SettingsItem';
import LogOutButton from '@/components/settings/LogOutButton';
import ProfilePage from '@/components/settings/ProfilePage';
import NotificationsPage from '@/components/settings/NotificationsPage';
import LocationPage from '@/components/settings/LocationPage';
import PrivacyPage from '@/components/settings/PrivacyPage';
import HelpCenterPage from '@/components/settings/HelpCenterPage';
import { User, Bell, MapPin, CreditCard, Shield, HelpCircle, Lock } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    router.push('/auth/login');
  };

  const handleProfileSubmit = (data: any) => {
    console.log('Profile saved:', data);
    setShowProfile(false);
  };

  // Show Profile page if showProfile is true
  if (showProfile) {
    return (
      <DashboardLayout>
        <ProfilePage
          onBack={() => setShowProfile(false)}
          onSubmit={handleProfileSubmit}
        />
      </DashboardLayout>
    );
  }

  // Show Notifications page if showNotifications is true
  if (showNotifications) {
    return (
      <DashboardLayout>
        <NotificationsPage onBack={() => setShowNotifications(false)} />
      </DashboardLayout>
    );
  }

  // Show Location page if showLocation is true
  if (showLocation) {
    return (
      <DashboardLayout>
        <LocationPage onBack={() => setShowLocation(false)} />
      </DashboardLayout>
    );
  }

  // Show Privacy page if showPrivacy is true
  if (showPrivacy) {
    return (
      <DashboardLayout>
        <PrivacyPage onBack={() => setShowPrivacy(false)} />
      </DashboardLayout>
    );
  }

  // Show Help Center page if showHelpCenter is true
  if (showHelpCenter) {
    return (
      <DashboardLayout>
        <HelpCenterPage onBack={() => setShowHelpCenter(false)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen  bg-inputBg">
        <div className="max-w-4xl bg-white mx-auto px-4">
          <SettingsHeader />

          {/* User Profile Card */}
          <UserProfileCard
            name="John Doe"
            email="john.doe@example.com"
            initial="J"
          />

          {/* ACCOUNT Section */}
          <SettingsSection title="ACCOUNT">
            <div className="px-4">
              <SettingsItem
                icon={<User className="w-5 h-5" />}
                label="Profile"
                onClick={() => setShowProfile(true)}
              />
            </div>
            <div className="px-4">
              <SettingsItem
                icon={<Bell className="w-5 h-5" />}
                label="Notifications"
                onClick={() => setShowNotifications(true)}
              />
            </div>
            <div className="px-4">
              <SettingsItem
                icon={<MapPin className="w-5 h-5" />}
                label="Location"
                onClick={() => setShowLocation(true)}
              />
            </div>
          </SettingsSection>

          {/* BILLING Section */}
          <SettingsSection title="BILLING">
            <div className="px-4">
              <SettingsItem
                icon={<CreditCard className="w-5 h-5" />}
                label="Payment Methods"
                onClick={() => console.log('Payment Methods clicked')}
              />
            </div>
            <div className="px-4">
              <SettingsItem
                icon={<Shield className="w-5 h-5" />}
                label="Subscriptions"
                href="/dashboard/subscriptions"
              />
            </div>
          </SettingsSection>

          {/* SUPPORT Section */}
          <SettingsSection title="SUPPORT">
            <div className="px-4">
              <SettingsItem
                icon={<HelpCircle className="w-5 h-5" />}
                label="Help Center"
                onClick={() => setShowHelpCenter(true)}
              />
            </div>
            <div className="px-4">
              <SettingsItem
                icon={<Lock className="w-5 h-5" />}
                label="Privacy & Safety"
                onClick={() => setShowPrivacy(true)}
              />
            </div>
          </SettingsSection>

          {/* Log Out Button */}
          <div className="mb-8">
            <LogOutButton onClick={handleLogout} />
          </div>

          {/* Version Footer */}
          <div className="text-center">
            <p className="text-textGray text-xs">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;

