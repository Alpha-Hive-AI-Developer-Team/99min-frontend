"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MessagesPage from '@/components/messages/MessagesPage';

const MessagesRoute: React.FC = () => {
  return (
    <DashboardLayout>
      <MessagesPage />
    </DashboardLayout>
  );
};

export default MessagesRoute;

