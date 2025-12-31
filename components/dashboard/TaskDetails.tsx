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
    <div className="min-h-screen bg-inputBg">
      <TaskDetailsHeader
        onBack={onBack}
        onReport={() => setIsReportModalOpen(true)}
        onShare={() => setIsShareModalOpen(true)}
      />

      <div className="max-w-4xl mx-auto pb-24">
        <div className="relative w-full h-80 mb-0">
          <img src={dog.src} alt={title} className="w-full h-full object-cover" />
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
