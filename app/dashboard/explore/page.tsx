"use client";

import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import CategoryChip from '@/components/dashboard/CategoryChip';
import PinnedTaskCard from '@/components/dashboard/PinnedTaskCard';
import TaskCard from '@/components/dashboard/TaskCard';
import ExploreHeader from '@/components/dashboard/ExploreHeader';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TaskDetails, { TaskDetailsData } from '@/components/dashboard/TaskDetails';
import dog from '@/public/assets/images/dog.jpg';
interface TaskCardData {
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

const ExplorePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null);

  const categories = [
    { label: 'All', icon: <span>📋</span> },
    { label: 'Errands', icon: <span>🏃</span> },
    { label: 'Tech', icon: <span>💻</span> },
    { label: 'Design', icon: <span>🎨</span> },
    { label: 'Moving', icon: <span>📦</span> },
    { label: 'Pet Care', icon: <span>🐕</span> },
    { label: 'Translation', icon: <span>🌍</span> },
  ];

  const tasks: TaskCardData[] = [
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

  // Show Task Details if a task is selected
  if (selectedTask) {
    return (
      <DashboardLayout>
        <TaskDetails task={selectedTask} onBack={handleBack} />
      </DashboardLayout>
    );
  }

  // Show Explore Page
  return (
    <DashboardLayout>
      <div className="bg-inputBg p-6">
        <div className="max-w-6xl mx-auto">
          
          <ExploreHeader activeTasksCount={6} />

          {/* Category Chips */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <CategoryChip
                key={index}
                label={category.label}
                icon={category.icon}
                active={index === activeCategory}
                onClick={() => setActiveCategory(index)}
              />
            ))}
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <PinnedTaskCard 
              onClick={() => handleTaskClick(pinnedTask)}
            />
            {tasks.map((task, index) => (
              <TaskCard 
                key={index} 
                {...task}
                onClick={() => handleTaskClick(task)}
              />
            ))}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExplorePage;
