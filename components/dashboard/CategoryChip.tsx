import React from 'react';

interface CategoryChipProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ 
  label, 
  icon, 
  active = false,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap
        ${active 
          ? 'bg-orange text-white' 
          : 'bg-white text-textBlack border border-gray-200 hover:bg-gray-50'
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default CategoryChip;

