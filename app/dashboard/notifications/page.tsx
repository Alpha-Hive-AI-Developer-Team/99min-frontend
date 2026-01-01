"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import NotificationCard, { Notification } from '@/components/dashboard/NotificationCard';
import { Bell, MessageSquare, Clock, CheckCircle2, InfoIcon } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'response',
      icon: <Bell className="w-5 h-5 text-orange" />,
      iconBgColor: 'bg-[#FFF5EB]',
      title: 'New response to your ad',
      description: 'Someone responded to "Need someone to walk my dog"',
      timestamp: '19m ago',
      isUnread: true,
    },
    {
      id: '2',
      type: 'message',
      icon: <MessageSquare className="w-5 h-5 text-orange" />,
      iconBgColor: 'bg-[#FFF5EB]',
      title: 'New message',
      description: 'You have a new message in "Quick photo editing needed"',
      timestamp: '36m ago',
      isUnread: true,
    },
    {
      id: '3',
      type: 'expiring',
      icon: <Clock className="w-5 h-5 text-red-500" />,
      iconBgColor: 'bg-[#FEF2F2]',
      title: 'Ad expiring soon',
      description: 'Your ad "Help moving furniture" expires in 18 minutes',
      timestamp: '59m ago',
      isUnread: false,
    },
    {
      id: '4',
      type: 'system',
      icon:<InfoIcon className="w-5 h-5 text-green-500" />,
      iconBgColor: 'bg-[#DCFCE7]',
      title: 'Welcome to 99min!',
      description: 'Start posting tasks and connect with helpers nearby',
      timestamp: '2h ago',
      isUnread: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-inputBg">
        <div className="max-w-4xl bg-white mx-auto  py-8">
          {/* Header */}
          <div className="mb-6 border-b px-8 border-lightGrey pb-4">
            <h1 className="text-3xl font-black text-textBlack mb-2">Notifications</h1>
            <p className="text-textGray text-base">Stay updated on your tasks</p>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() => {
                  // Handle notification click
                  console.log('Notification clicked:', notification.id);
                }}
              />
            ))}
          </div>

          {/* Empty State (if no notifications) */}
          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-textGray mx-auto mb-4 opacity-50" />
              <p className="text-textGray text-lg">No notifications yet</p>
              <p className="text-textGray text-sm mt-2">You'll see updates here when they arrive</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;

