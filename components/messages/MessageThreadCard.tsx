"use client";

import React from 'react';

export interface MessageThread {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  initial: string;
}

interface MessageThreadCardProps {
  thread: MessageThread;
  onClick?: () => void;
}

const MessageThreadCard: React.FC<MessageThreadCardProps> = ({
  thread,
  onClick,
}) => {
  const { name, lastMessage, timestamp, unreadCount, isOnline, initial } = thread;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">{initial.toUpperCase()}</span>
        </div>
        {/* Online Status Indicator */}
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-textBlack font-bold text-base">{name}</h3>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="text-textGray text-xs">{timestamp}</span>
            {unreadCount && unreadCount > 0 && (
              <div className="w-5 h-5 bg-orange rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{unreadCount}</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-textGray text-sm line-clamp-2">{lastMessage}</p>
      </div>
    </button>
  );
};

export default MessageThreadCard;

