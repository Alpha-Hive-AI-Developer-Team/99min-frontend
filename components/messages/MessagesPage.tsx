"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MessageThreadCard from "./MessageThreadCard";
import ChatInterface from "./ChatInterface";
import { useConversations } from "@/hooks/UseConversations";
import { ApiConversation } from "@/utils/api/message.api";

const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [manualSelection, setManualSelection] = useState<ApiConversation | null>(null);

  const searchParams = useSearchParams();
  const { conversations, loading, error, refresh } = useConversations();

  const urlConversationId = searchParams.get("conversationId");

  // Derive selected conversation without useEffect:
  // Manual click takes priority, then URL param
  const selectedConversation: ApiConversation | null =
    manualSelection ??
    (urlConversationId
      ? (conversations.find((c) => c._id === urlConversationId) ?? null)
      : null);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.otherParticipant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conv.lastMessage?.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedConversation) {
    return (
      <ChatInterface
        conversation={selectedConversation}
        onBack={() => setManualSelection(null)}
      />
    );
  }

  return (
    <div className="bg-inputBg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-textBlack mb-6">Messages</h1>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textGray" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-orange transition-all text-textBlack placeholder:text-textGray"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
            {error}{" "}
            <button onClick={() => refresh()} className="underline font-semibold">
              Retry
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 animate-pulse"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-1/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Thread list */}
        {!loading && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <MessageThreadCard
                  key={conv._id}
                  conversation={conv}
                  onClick={() => setManualSelection(conv)}
                />
              ))
            ) : (
              <div className="p-8 text-center text-textGray">
                <p>No conversations yet</p>
                <p className="text-sm mt-1">
                  Click &quot;Contact us&quot; on any task to start a conversation
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;