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
    <div className="bg-lightGrey rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-200 min-w-0">
      <div className="bg-white p-1.5 sm:p-2 rounded-lg shrink-0">
        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-orange" strokeWidth={2} />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-textGray text-[10px] sm:text-xs font-medium truncate">{label}</span>
        <span className="text-textBlack text-xs sm:text-sm font-bold truncate">{value}</span>
      </div>
    </div>
  );
};

export default TaskDetailCard;

