import React from 'react';
import CategoryButton from '@/components/shared/CategoryButton';

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
    <CategoryButton
      label={label}
      icon={icon}
      active={active}
      onClick={onClick}
      variant="rounded"
    />
  );
};

export default CategoryChip;

