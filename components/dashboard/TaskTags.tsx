"use client";

import React from 'react';

interface TaskTagsProps {
  tags: string[];
}

const TaskTags: React.FC<TaskTagsProps> = ({ tags }) => {
  return (
    <div>
      <h3 className="text-textBlack font-bold text-base mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="border-lightGrey border text-gray text-sm font-medium px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskTags;

