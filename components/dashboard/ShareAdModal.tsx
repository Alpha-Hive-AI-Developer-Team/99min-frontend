"use client";

import React, { useEffect } from 'react';
import { X, MessageCircle, Facebook, Twitter, Mail, Link2, Send, Linkedin } from 'lucide-react';

interface ShareAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare?: (platform: string) => void;
}

const shareOptions = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-green-500' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'email', label: 'Email', icon: Mail, color: 'text-gray-500' },
  { id: 'copylink', label: 'Copy Link', icon: Link2, color: 'text-orange' },
  { id: 'messenger', label: 'Messenger', icon: MessageCircle, color: 'text-blue-500' },
  { id: 'telegram', label: 'Telegram', icon: Send, color: 'text-blue-400' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
];

const ShareAdModal: React.FC<ShareAdModalProps> = ({
  isOpen,
  onClose,
  onShare,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleShare = (platform: string) => {
    if (onShare) {
      onShare(platform);
    }
    
    // Handle copy link separately
    if (platform === 'copylink') {
      navigator.clipboard.writeText(window.location.href);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-textBlack">Share Ad</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-textBlack" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Sharing Options Grid */}
          <div className="grid grid-cols-4 gap-4">
            {shareOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <IconComponent className={`w-8 h-8 ${option.color}`} />
                  <span className="text-xs font-medium text-textBlack text-center">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareAdModal;

