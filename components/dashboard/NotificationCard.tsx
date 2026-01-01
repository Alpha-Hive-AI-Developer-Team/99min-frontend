"use client";

import React, { ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'response' | 'message' | 'expiring' | 'system';
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onClick,
}) => {
  const { icon, iconBgColor, title, description, timestamp, isUnread } = notification;

  return (
    <div
      onClick={onClick}
      className={`${isUnread ? 'bg-iconBg' : 'bg-white'}  p-4  flex items-start gap-4 cursor-pointer  transition-colors ${
        onClick ? '' : ''
      }`}
    >
      {/* Icon */}
      <div className={`w-12 h-12  rounded-xl flex items-center justify-center shrink-0`}>
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-textBlack font-bold mb-1">{title}</h4>
        <p className="text-textGray text-sm mb-1 line-clamp-2">{description}</p>
        <p className="text-textGray text-xs">{timestamp}</p>
      </div>

      {/* Unread Indicator */}
      {isUnread && (
        <div className="w-2 h-2 bg-orange rounded-full shrink-0 mt-2"></div>
      )}
    </div>
  );
};

export default NotificationCard;

