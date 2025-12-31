import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'default' | 'alt';
  showPasswordToggle?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  variant = 'default',
  type = 'text',
  showPasswordToggle = false,
  error,
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = 'w-full rounded-xl py-3.5 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all duration-200';
  const variantClasses = {
    default: 'bg-inputBg text-textBlack placeholder-textGray',
    alt: 'bg-inputBgAlt text-textBlack placeholder-textGray',
  };

  const borderClass = error 
    ? 'border-2 border-red-500' 
    : variant === 'alt' 
      ? 'border-0' 
      : 'border border-gray-200';

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-textBlack text-sm font-bold mb-2 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={`${baseClasses} ${variantClasses[variant]} ${borderClass} ${className} ${showPasswordToggle ? 'pr-10' : ''}`}
          {...props}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-4 flex items-center cursor-pointer hover:opacity-70"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray" />
            ) : (
              <Eye className="w-5 h-5 text-gray" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};

export default Input;

