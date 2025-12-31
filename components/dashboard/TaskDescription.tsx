"use client";

import React from 'react';

interface TaskDescriptionProps {
  description: string;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ description }) => {
  return (
    <div className="mb-6">
      <h3 className="text-textBlack font-bold text-base mb-3">Description</h3>
      <p className="text-textGray text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default TaskDescription;

