"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send } from 'lucide-react';
import CallModal from './CallModal';
import ChatMenu from './ChatMenu';
import ReportUserModal from './ReportUserModal';

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean; // true for outgoing, false for incoming
}

interface ChatInterfaceProps {
  contactName: string;
  contactInitial: string;
  isOnline: boolean;
  onBack: () => void;
  messages?: ChatMessage[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  contactName,
  contactInitial,
  isOnline,
  onBack,
  messages: initialMessages = [],
}) => {
  // Default messages if none provided
  const defaultMessages: ChatMessage[] = [
    {
      id: '1',
      text: "Hi! I saw your dog walking request. I'm available right now!",
      timestamp: '9:54 AM',
      isSent: false,
    },
    {
      id: '2',
      text: 'Perfect! Are you experienced with large dogs?',
      timestamp: '9:57 AM',
      isSent: true,
    },
    {
      id: '3',
      text: 'Yes, I have a German Shepherd myself. Golden retrievers are wonderful!',
      timestamp: '9:59 AM',
      isSent: false,
    },
    {
      id: '4',
      text: 'Great! Can you meet at the park entrance?',
      timestamp: '10:02 AM',
      isSent: true,
    },
    {
      id: '5',
      text: 'Great! I can be there in 15 minutes.',
      timestamp: '10:04 AM',
      isSent: false,
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages.length > 0 ? initialMessages : defaultMessages
  );
  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [isVoiceCallModalOpen, setIsVoiceCallModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportUserModalOpen, setIsReportUserModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        timestamp: timeString,
        isSent: true,
      };
      
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-inputBg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shrink-0">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-textBlack" />
        </button>
        
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 bg-orange rounded-full flex items-center justify-center">
            <span className="text-white text-base font-bold">{contactInitial.toUpperCase()}</span>
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>

        {/* Name and Status */}
        <div className="flex-1 min-w-0">
          <h2 className="text-textBlack font-bold text-base">{contactName}</h2>
          <p className={`text-sm ${isOnline ? 'text-green-500' : 'text-textGray'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setIsVoiceCallModalOpen(true)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Phone className="w-5 h-5 text-textGray" />
          </button>
          <button 
            onClick={() => setIsVideoCallModalOpen(true)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Video className="w-5 h-5 text-textGray" />
          </button>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-textGray" />
            </button>
            {isMenuOpen && (
              <ChatMenu
                onReportUser={() => {
                  setIsReportUserModalOpen(true);
                  setIsMenuOpen(false);
                }}
                onMuteNotifications={() => {
                  console.log('Mute notifications');
                  setIsMenuOpen(false);
                }}
                onViewAdDetails={() => {
                  console.log('View ad details');
                  setIsMenuOpen(false);
                }}
                onBlockUser={() => {
                  console.log('Block user');
                  setIsMenuOpen(false);
                }}
                onDeleteChat={() => {
                  console.log('Delete chat');
                  setIsMenuOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[75%]">
              <div
                className={`rounded-2xl px-4 py-2.5 ${
                  message.isSent
                    ? 'bg-orange text-white'
                    : 'bg-lightGrey text-textBlack'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <p className="text-textGray text-xs mt-1 px-1">
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-inputBg rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-orange transition-all text-textBlack placeholder:text-textGray"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2.5 bg-orange text-white rounded-xl hover:bg-orangeHover transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Call Modals */}
      <CallModal
        isOpen={isVideoCallModalOpen}
        onClose={() => setIsVideoCallModalOpen(false)}
        contactName={contactName}
        contactInitial={contactInitial}
        callType="video"
      />
      <CallModal
        isOpen={isVoiceCallModalOpen}
        onClose={() => setIsVoiceCallModalOpen(false)}
        contactName={contactName}
        contactInitial={contactInitial}
        callType="voice"
      />

      {/* Report User Modal */}
      <ReportUserModal
        isOpen={isReportUserModalOpen}
        onClose={() => setIsReportUserModalOpen(false)}
        onSubmit={(reason, details) => {
          console.log('Report user:', { reason, details });
        }}
        userName={contactName}
      />
    </div>
  );
};

export default ChatInterface;

