import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'md',
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-white flex flex-col p-6 ${className}`}>
      <div className={`w-full ${maxWidthClasses[maxWidth]} mx-auto`}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;

