"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SettingsSection from './SettingsSection';
import NotificationToggle from './NotificationToggle';

interface NotificationSettings {
  // Notification Channels
  pushNotifications: boolean;
  email: boolean;
  sms: boolean;
  
  // Notification Types
  newResponses: boolean;
  newMessages: boolean;
  adExpiring: boolean;
  taskReminders: boolean;
  systemUpdates: boolean;
  marketing: boolean;
}

interface NotificationsPageProps {
  onBack?: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBack }) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    email: true,
    sms: false,
    newResponses: true,
    newMessages: true,
    adExpiring: true,
    taskReminders: false,
    systemUpdates: true,
    marketing: false,
  });

  const handleToggle = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Notifications" onBack={onBack} maxWidth="7xl" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Notification Channels Section */}
        <SettingsSection title="NOTIFICATION CHANNELS">
          <div className="px-4">
            <NotificationToggle
              label="Push Notifications"
              description="Receive alerts on your device"
              enabled={settings.pushNotifications}
              onChange={(enabled) => handleToggle('pushNotifications', enabled)}
            />
            <NotificationToggle
              label="Email"
              description="Get updates via email"
              enabled={settings.email}
              onChange={(enabled) => handleToggle('email', enabled)}
            />
            <NotificationToggle
              label="SMS"
              description="Receive text messages"
              enabled={settings.sms}
              onChange={(enabled) => handleToggle('sms', enabled)}
            />
          </div>
        </SettingsSection>

        {/* Notification Types Section */}
        <SettingsSection title="NOTIFICATION TYPES">
          <div className="px-4">
            <NotificationToggle
              label="New Responses"
              description="When someone responds to your ad"
              enabled={settings.newResponses}
              onChange={(enabled) => handleToggle('newResponses', enabled)}
            />
            <NotificationToggle
              label="New Messages"
              description="When you receive a chat message"
              enabled={settings.newMessages}
              onChange={(enabled) => handleToggle('newMessages', enabled)}
            />
            <NotificationToggle
              label="Ad Expiring"
              description="15 minutes before ad expires"
              enabled={settings.adExpiring}
              onChange={(enabled) => handleToggle('adExpiring', enabled)}
            />
            <NotificationToggle
              label="Task Reminders"
              description="Upcoming tasks you committed to"
              enabled={settings.taskReminders}
              onChange={(enabled) => handleToggle('taskReminders', enabled)}
            />
            <NotificationToggle
              label="System Updates"
              description="App updates and announcements"
              enabled={settings.systemUpdates}
              onChange={(enabled) => handleToggle('systemUpdates', enabled)}
            />
            <NotificationToggle
              label="Marketing"
              description="Tips, offers, and promotions"
              enabled={settings.marketing}
              onChange={(enabled) => handleToggle('marketing', enabled)}
            />
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default NotificationsPage;

