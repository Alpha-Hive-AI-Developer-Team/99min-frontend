"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TaskDetailCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const TaskDetailCard: React.FC<TaskDetailCardProps> = ({ icon: IconComponent, label, value }) => {
  return (
    <div className="bg-lightGrey rounded-xl p-4 flex items-center gap-3 border border-gray-200">
      <div className="bg-white p-2 rounded-lg">
        <IconComponent className="w-5 h-5 text-orange shrink-0" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <span className="text-textGray text-xs font-medium">{label}</span>
        <span className="text-textBlack text-sm font-bold">{value}</span>
      </div>
    </div>
  );
};

export default TaskDetailCard;

