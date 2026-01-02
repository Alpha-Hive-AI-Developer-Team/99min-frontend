"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import MessageThreadCard, { MessageThread } from './MessageThreadCard';
import ChatInterface from './ChatInterface';

const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);

  // Dummy data for message threads
  const messageThreads: MessageThread[] = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Great! I can be there in 15 minutes.',
      timestamp: '17m ago',
      unreadCount: 1,
      isOnline: true,
      initial: 'J',
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'I have experience with product photos. Can you share samples?',
      timestamp: '34m ago',
      unreadCount: 1,
      isOnline: true,
      initial: 'J',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastMessage: 'Thanks for your help today!',
      timestamp: '1h ago',
      unreadCount: undefined,
      isOnline: false,
      initial: 'M',
    },
    {
      id: '4',
      name: 'Emily Davis',
      lastMessage: 'Got everything on your list.',
      timestamp: '2h ago',
      unreadCount: undefined,
      isOnline: false,
      initial: 'E',
    },
    {
      id: '5',
      name: 'Frank Johnson',
      lastMessage: 'Just finished the project upc',
      timestamp: '1h ago',
      unreadCount: undefined,
      isOnline: false,
      initial: 'F',
    },
  ];

  const filteredThreads = messageThreads.filter((thread) =>
    thread.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleThreadClick = (thread: MessageThread) => {
    setSelectedThread(thread);
  };

  const handleBackToMessages = () => {
    setSelectedThread(null);
  };

  // Show chat interface if a thread is selected
  if (selectedThread) {
    return (
      <div className="bg-inputBg">
        <ChatInterface
          contactName={selectedThread.name}
          contactInitial={selectedThread.initial}
          isOnline={selectedThread.isOnline || false}
          onBack={handleBackToMessages}
        />
      </div>
    );
  }

  // Show messages list
  return (
    <div className="bg-inputBg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-black text-textBlack mb-6">Messages</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textGray" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-orange transition-all text-textBlack placeholder:text-textGray"
            />
          </div>
        </div>

        {/* Message Threads List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => (
              <MessageThreadCard
                key={thread.id}
                thread={thread}
                onClick={() => handleThreadClick(thread)}
              />
            ))
          ) : (
            <div className="p-8 text-center text-textGray">
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

