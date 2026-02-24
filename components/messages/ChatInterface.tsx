"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ApiConversation, CURRENT_USER_ID } from "@/utils/api/message.api";
import { useMessages } from "@/hooks/UseMessages";
import CallModal from "./CallModal";
import ChatMenu from "./ChatMenu";
import ReportUserModal from "./ReportUserModal";

interface ChatInterfaceProps {
  conversation: ApiConversation;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversation,
  onBack,
}) => {
  const [input, setInput] = useState("");
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [isVoiceCallModalOpen, setIsVoiceCallModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportUserModalOpen, setIsReportUserModalOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { messages, loading, error, hasMore, loadMore, sendMessage, sending, sendError } =
    useMessages(conversation._id);

  const { otherParticipant, isOnline } = conversation;

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    sendMessage(trimmed);
    setInput("");
    inputRef.current?.focus();
  }, [input, sending, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
            <span className="text-white text-base font-bold">
              {otherParticipant.initial.toUpperCase()}
            </span>
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Name & Status */}
        <div className="flex-1 min-w-0">
          <h2 className="text-textBlack font-bold text-base">
            {otherParticipant.name}
          </h2>
          <p className={`text-sm ${isOnline ? "text-green-500" : "text-textGray"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        {/* Actions */}
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
                  console.log("Mute notifications");
                  setIsMenuOpen(false);
                }}
                onViewAdDetails={() => {
                  console.log("View ad details");
                  setIsMenuOpen(false);
                }}
                onBlockUser={() => {
                  console.log("Block user");
                  setIsMenuOpen(false);
                }}
                onDeleteChat={() => {
                  console.log("Delete chat");
                  setIsMenuOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Load earlier */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={() => loadMore()}
              className="text-xs text-textGray underline"
            >
              Load earlier messages
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} animate-pulse`}
              >
                <div
                  className={`h-10 rounded-2xl bg-gray-200 ${i % 2 === 0 ? "w-48" : "w-36"}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Fetch error */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg) => {
          const isMe = msg.senderId === CURRENT_USER_ID;
          const isOptimistic = msg._id.startsWith("optimistic_");
          const time = formatDistanceToNow(new Date(msg.createdAt), {
            addSuffix: true,
          });

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[75%]">
                <div
                  className={`rounded-2xl px-4 py-2.5 transition-opacity ${
                    isMe
                      ? "bg-orange text-white"
                      : "bg-lightGrey text-textBlack"
                  } ${isOptimistic ? "opacity-60" : "opacity-100"}`}
                >
                  <p className="text-sm leading-relaxed">{msg.body}</p>
                </div>
                <p className="text-textGray text-xs mt-1 px-1">
                  {isMe && isOptimistic ? "Sending..." : time}
                  {isMe && !isOptimistic && msg.read && (
                    <span className="ml-1 text-blue-400">✓✓</span>
                  )}
                  {isMe && !isOptimistic && !msg.read && (
                    <span className="ml-1 text-textGray">✓</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {!loading && messages.length === 0 && !error && (
          <div className="text-center text-textGray text-sm py-8">
            No messages yet. Say hello! 👋
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Send error banner */}
      {sendError && (
        <div className="px-4 py-2 bg-red-50 text-red-500 text-xs text-center shrink-0">
          Failed to send message. Please try again.
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none px-4 py-2.5 bg-inputBg rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-orange transition-all text-textBlack placeholder:text-textGray text-sm max-h-32 overflow-y-auto"
            style={{ lineHeight: "1.5" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="p-2.5 bg-orange text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-textGray mt-1.5 pl-1">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>

      {/* Call Modals */}
      <CallModal
        isOpen={isVideoCallModalOpen}
        onClose={() => setIsVideoCallModalOpen(false)}
        contactName={otherParticipant.name}
        contactInitial={otherParticipant.initial}
        callType="video"
      />
      <CallModal
        isOpen={isVoiceCallModalOpen}
        onClose={() => setIsVoiceCallModalOpen(false)}
        contactName={otherParticipant.name}
        contactInitial={otherParticipant.initial}
        callType="voice"
      />

      {/* Report Modal */}
      <ReportUserModal
        isOpen={isReportUserModalOpen}
        onClose={() => setIsReportUserModalOpen(false)}
        onSubmit={(reason, details) => {
          console.log("Report user:", { reason, details });
        }}
        userName={otherParticipant.name}
      />
    </div>
  );
};

export default ChatInterface;