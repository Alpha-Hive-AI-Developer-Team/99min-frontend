"use client";

import React, { useState, useEffect, useRef } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  className?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  className = '',
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const codeString = newCode.join('');
    onChange?.(codeString);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newCode.every(digit => digit !== '') && codeString.length === length) {
      onComplete?.(codeString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newCode = pastedData.split('').slice(0, length);
    const updatedCode = [...code];
    
    newCode.forEach((char, index) => {
      if (index < length) {
        updatedCode[index] = char;
      }
    });
    
    setCode(updatedCode);
    const codeString = updatedCode.join('');
    onChange?.(codeString);
    
    if (codeString.length === length) {
      onComplete?.(codeString);
    }
    
    // Focus the last filled input or the last input
    const lastFilledIndex = Math.min(newCode.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const isComplete = code.every(digit => digit !== '');

  return (
    <div className={`flex gap-2 sm:gap-4 justify-center w-full ${className}`}>
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl text-2xl font-bold text-center
            ${digit 
              ? 'border-2 border-orange text-orange bg-white' 
              : 'border-2 border-gray-200 bg-white text-textBlack'
            }
            focus:outline-none focus:ring-2 focus:ring-orange`}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;

