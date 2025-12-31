"use client";

import React from 'react';
import { MapPin, Tag, MessageCircle, LucideIcon } from 'lucide-react';
import TaskDetailCard from './TaskDetailCard';

interface TaskDetailCardsProps {
  location: string;
  category: string;
  interest: number;
}

interface CardData {
  icon: LucideIcon;
  label: string;
  value: string;
}

const TaskDetailCards: React.FC<TaskDetailCardsProps> = ({ location, category, interest }) => {
  const cards: CardData[] = [
    {
      icon: MapPin,
      label: 'Location',
      value: location,
    },
    {
      icon: Tag,
      label: 'Category',
      value: category,
    },
    {
      icon: MessageCircle,
      label: 'Responses',
      value: `${interest} active`,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {cards.map((card, index) => (
        <TaskDetailCard
          key={index}
          icon={card.icon}
          label={card.label}
          value={card.value}
        />
      ))}
    </div>
  );
};

export default TaskDetailCards;

