import React from 'react';

interface IconContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-20 h-20',
  lg: 'w-24 h-24',
};

const IconContainer: React.FC<IconContainerProps> = ({
  children,
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`${sizeClasses[size]} bg-iconBg rounded-2xl flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

export default IconContainer;

