"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import TaskDetailsMenu from './TaskDetailsMenu';

interface TaskDetailsHeaderProps {
  onBack: () => void;
  onReport: () => void;
  onShare: () => void;
}

const TaskDetailsHeader: React.FC<TaskDetailsHeaderProps> = ({ onBack, onReport, onShare }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReport = () => {
    onReport();
    setIsMenuOpen(false);
  };

  const handleShare = () => {
    onShare();
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-textBlack" />
          </button>

          <h1 className="text-lg font-bold text-textBlack">Task Details</h1>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <MoreVertical className="w-6 h-6 text-textBlack" />
            </button>

            {isMenuOpen && (
              <TaskDetailsMenu onReport={handleReport} onShare={handleShare} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsHeader;

