import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'circular';
  className?: string;
  ariaLabel?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  href,
  variant = 'default',
  className = '',
  ariaLabel = 'Go back',
}) => {
  const buttonContent = variant === 'circular' ? (
    <ArrowLeft className="w-5 h-5 text-gray" />
  ) : (
    <ArrowLeft className="w-6 h-6 text-textBlack" />
  );

  const buttonClasses = variant === 'circular'
    ? `w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full transition-colors border border-gray-100 ${className}`
    : `p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors ${className}`;

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel}>
        <button className={buttonClasses}>
          {buttonContent}
        </button>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={buttonClasses}
    >
      {buttonContent}
    </button>
  );
};

export default BackButton;

