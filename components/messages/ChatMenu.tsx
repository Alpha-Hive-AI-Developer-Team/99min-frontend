"use client";

import React from 'react';
import { BellOff, Flag, UserX, Trash2 } from 'lucide-react';

interface ChatMenuProps {
  onMuteNotifications?: () => void;
  onViewAdDetails?: () => void;
  onBlockUser?: () => void;
  onReportUser?: () => void;
  onDeleteChat?: () => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({
  onMuteNotifications,
  onViewAdDetails,
  onBlockUser,
  onReportUser,
  onDeleteChat,
}) => {
  return (
    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg py-2 min-w-[200px] z-50 border border-gray-100">
      <button 
        onClick={onMuteNotifications}
        className="w-full flex items-center gap-3 text-left px-4 py-3 text-textBlack hover:bg-gray-50 transition-colors"
      >
        <BellOff className="w-5 h-5 text-textGray" />
        <span className="font-medium">Mute Notifications</span>
      </button>
      
      <button 
        onClick={onViewAdDetails}
        className="w-full flex items-center gap-3 text-left px-4 py-3 text-textBlack hover:bg-gray-50 transition-colors border-t border-gray-100"
      >
        <Flag className="w-5 h-5 text-textGray" />
        <span className="font-medium">View Ad Details</span>
      </button>
      
      <button 
        onClick={onBlockUser}
        className="w-full flex items-center gap-3 text-left px-4 py-3 text-red hover:bg-gray-50 transition-colors border-t border-gray-100"
      >
        <UserX className="w-5 h-5 text-red" />
        <span className="font-medium">Block User</span>
      </button>
      
      <button 
        onClick={onReportUser}
        className="w-full flex items-center gap-3 text-left px-4 py-3 text-red hover:bg-gray-50 transition-colors"
      >
        <Flag className="w-5 h-5 text-red" />
        <span className="font-medium">Report User</span>
      </button>
      
      <button 
        onClick={onDeleteChat}
        className="w-full flex items-center gap-3 text-left px-4 py-3 text-red hover:bg-gray-50 transition-colors border-t border-gray-100"
      >
        <Trash2 className="w-5 h-5 text-red" />
        <span className="font-medium">Delete Chat</span>
      </button>
    </div>
  );
};

export default ChatMenu;

