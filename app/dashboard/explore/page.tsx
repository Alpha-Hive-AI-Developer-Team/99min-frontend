"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ExploreHeader from '@/components/dashboard/ExploreHeader';
import TaskCard from '@/components/dashboard/TaskCard';
import PinnedTaskCard from '@/components/dashboard/PinnedTaskCard';
import TaskDetails, { TaskDetailsData } from '@/components/dashboard/TaskDetails';
import ShareAdModal from '@/components/dashboard/ShareAdModal';
import ReportAdModal from '@/components/dashboard/ReportAdModal';
import dog from '@/public/assets/images/dog.jpg';

const ExplorePage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const tasks: TaskDetailsData[] = [
    {
      image: dog.src,
      title: 'Need someone to walk my dog',
      description: "Looking for someone to walk my golden retriever for 30 mins in Central Park. He's friendly and loves treats!",
      price: '20',
      location: 'Manhattan, NY',
      timeLeft: '45 minutes',
      interest: 3,
      urgent: true,
      category: 'Pet Care',
      postedTime: 'Posted just now',
      tags: ['#urgent', '#pets', '#outdoor'],
    },
    {
      image: dog.src,
      title: 'Quick photo editing needed',
      description: 'Need 5 product photos edited - background removal and color correction. Files ready to share.',
      price: '35',
      location: 'Remote',
      timeLeft: '72 minutes',
      interest: 7,
      category: 'Design',
      postedTime: 'Posted 2 hours ago',
      tags: ['#design', '#photo', '#editing'],
    },
    {
      image: dog.src,
      title: 'Grocery shopping assistance',
      description: 'Need someone to pick up groceries from Whole Foods. I\'ll send the list. Delivery to my apartment.',
      price: '25',
      location: 'Queens, NY',
      timeLeft: '55 minutes',
      interest: 5,
      category: 'Errands',
      postedTime: 'Posted 1 hour ago',
      tags: ['#errands', '#shopping', '#delivery'],
    },
  ];

  const pinnedTask: TaskDetailsData = {
    image: dog.src,
    title: 'Perfect Task Title: Clear and Specific',
    description: 'Write a detailed description that includes what you need, when you need it, and any special requirements. Be clear and friendly!',
    price: '25-50',
    location: 'Your Location',
    timeLeft: '99 minutes',
    interest: 0,
    category: 'Example',
    postedTime: 'Posted just now',
    tags: ['#example', '#tutorial', '#guide'],
  };

  const handleTaskClick = (task: TaskDetailsData) => {
    setSelectedTask(task);
  };

  const handleBack = () => {
    setSelectedTask(null);
  };

  if (selectedTask) {
    return (
      <DashboardLayout>
        <TaskDetails task={selectedTask} onBack={handleBack} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-inputBg p-6">
        <div className="max-w-6xl mx-auto">
          <ExploreHeader activeTasksCount={6} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <PinnedTaskCard onClick={() => handleTaskClick(pinnedTask)} />

            {tasks.map((task, index) => (
              <TaskCard
                key={index}
                {...task}
                onClick={() => handleTaskClick(task)}
                onShare={() => setIsShareModalOpen(true)}
                onReport={() => setIsReportModalOpen(true)}
              />
            ))}
          </div>
        </div>

        {/* Share Modal */}
        <ShareAdModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onShare={(platform) => console.log('Shared on:', platform)}
        />

        {/* Report Modal */}
        <ReportAdModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={(reason, details) => console.log('Report submitted:', { reason, details })}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExplorePage;
