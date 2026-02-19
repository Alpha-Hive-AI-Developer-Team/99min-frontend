"use client";

import React, { useState } from 'react';
import ReportAdModal from './ReportAdModal';
import ShareAdModal from './ShareAdModal';
import DeleteAdModal from './DeleteAdModal';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskHeader from './TaskHeader';
import TaskDetailCards from './TaskDetailCards';
import TaskDescription from './TaskDescription';
import TaskTags from './TaskTags';
import TaskDetailsCTA from './TaskDetailsCTA';
import dog from '@/public/assets/images/dog.jpg';
import { Flag, Share2 } from 'lucide-react';
import Image from 'next/image';
import { tasksApi } from '@/utils/api';

export interface TaskDetailsData {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  location: string;
  timeLeft: string;
  interest: number;
  urgent?: boolean;
  category?: string;
  postedTime?: string;
  tags?: string[];
}

interface TaskDetailsProps {
  task: TaskDetailsData;
  onBack: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onBack }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const {
    title,
    description,
    price,
    location,
    timeLeft,
    interest,
    urgent = false,
    category = 'General',
    postedTime = 'Posted just now',
    tags = [],
  } = task;

  // Use real image from API, fall back to placeholder
  const imageSrc = task.image && task.image.length > 0 ? task.image : dog.src;

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setSending(true);
    setSendError('');
    try {
      await tasksApi.respond(task._id, { message: message.trim() });
      setMessage('');
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleReportSubmit = async (reason: string, details: string) => {
    try {
      await tasksApi.report(task._id, { reason, details });
      setIsReportModalOpen(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to submit report');
    }
  };

  const handleShare = (platform: string) => {
    tasksApi.share(task._id).catch(console.error);
    console.log('Shared on:', platform);
  };

  return (
    <div className="min-h-screen bg-white">
      <TaskDetailsHeader
        onBack={onBack}
        onReport={() => setIsReportModalOpen(true)}
        onShare={() => setIsShareModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto pb-24">

        {/* ─── Task Image ───────────────────────────────────────────────────── */}
        <div className="relative w-full h-96 mb-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover rounded-b-4xl"
          />

          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4 text-orange" />
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition"
              aria-label="Report"
            >
              <Flag className="w-4 h-4 text-orange" />
            </button>
          </div>
        </div>

        <TaskHeader
          title={title}
          price={price}
          urgent={urgent}
          postedTime={postedTime}
          timeLeft={timeLeft}
        />

        <div className="bg-white px-6 pb-6">
          <TaskDetailCards
            location={location}
            category={category}
            interest={interest}
          />

          <TaskDescription description={description} />

          <TaskTags tags={tags} />

          {/* ─── Respond / Message ──────────────────────────────────────────── */}
          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
              Send a Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to the task poster..."
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            {sendError && (
              <p className="text-red-500 text-xs mt-1">{sendError}</p>
            )}
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={sending || !message.trim()}
              className="mt-2 bg-orange text-white px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>

      <TaskDetailsCTA />

      <ReportAdModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />

      <ShareAdModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleShare}
      />

      <DeleteAdModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onBack();
        }}
      />
    </div>
  );
};

export default TaskDetails;