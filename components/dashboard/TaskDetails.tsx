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
export interface TaskDetailsData {
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

  const {
    image,
    title,
    description,
    price,
    location,
    timeLeft,
    interest,
    urgent = false,
    category = 'Pet Care',
    postedTime = 'Posted just now',
    tags = ['#urgent', '#pets', '#outdoor'],
  } = task;

  return (
    <div className="min-h-screen bg-white">
      <TaskDetailsHeader
        onBack={onBack}
        onReport={() => setIsReportModalOpen(true)}
        onShare={() => setIsShareModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto pb-24">
        <div className="relative w-full h-96 mb-0">
  {/* Image */}
  <img
    src={dog.src}
    alt={title}
    className="w-full h-full object-cover rounded-b-4xl"
  />

  {/* Overlay Buttons */}
  <div className="absolute top-4 left-4 flex gap-2 z-10">
    <button
      onClick={() => setIsShareModalOpen(true)}
      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition"
      aria-label="Share"
    >
      <svg width="18" height="18" color='orange'  fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.27 3.27 0 0 0 0-1.39l7.02-4.11A2.99 2.99 0 1 0 14 5a2.9 2.9 0 0 0 .04.49L7.02 9.6a3 3 0 1 0 0 4.8l7.02 4.11c-.03.16-.04.33-.04.49a3 3 0 1 0 3-3z"/>
      </svg>
    </button>

    <button
      onClick={() => setIsReportModalOpen(true)}
      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition"
      aria-label="Report"
    >
      <svg width="18" height="18" color='orange' fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 2h9l1 2h4v13h-2v-2H6v7H4V2h2zm0 11h12V6H6v7z"/>
      </svg>
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
        </div>
      </div>

      <TaskDetailsCTA />

      {/* Report Ad Modal */}
      <ReportAdModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={(reason, details) => {
          console.log('Report submitted:', { reason, details });
          // Handle report submission here
        }}
      />

      {/* Share Ad Modal */}
      <ShareAdModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={(platform) => {
          console.log('Share on:', platform);
          // Handle sharing here
        }}
      />

      {/* Delete Ad Modal */}
      <DeleteAdModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          console.log('Ad deleted');
          // Handle ad deletion here
          // You might want to navigate back or show a success message
          onBack();
        }}
      />
    </div>
  );
};

export default TaskDetails;
