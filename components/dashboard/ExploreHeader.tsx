import React from 'react';
import { Filter, TrendingUp } from 'lucide-react';

interface ExploreHeaderProps {
  title?: string;
  activeTasksCount?: number;
  onFilterClick?: () => void;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  title = "Discover tasks ending soon",
  activeTasksCount = 6,
  onFilterClick,
}) => {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-textGray text-sm font-medium">{title}</h1>
        <button 
          onClick={onFilterClick}
          className="flex items-center bg-lightGrey gap-2  border border-gray-300 px-4 py-2 rounded-xl  text-sm font-bold text-textBlack hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-5 h-5 " />
          Filters
        </button>
      </div>

      {/* Active Tasks Count */}
      <div className="flex items-center gap-2 text-textBlack font-bold mb-6">
        <TrendingUp className="w-5 h-5 text-green-500" />
        <span>{activeTasksCount} active tasks</span>
      </div>
    </>
  );
};

export default ExploreHeader;

