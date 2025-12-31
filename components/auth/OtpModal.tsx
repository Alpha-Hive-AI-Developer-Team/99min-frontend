"use client";

import React, { useState } from 'react';
import { Check, CheckCircle, CheckCircle2 } from 'lucide-react';
import { Button, BackButton, IconContainer, OTPInput } from "@/components/ui";

interface OtpModalProps {
  email?: string;
  onBack?: () => void;
  onVerify?: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ 
  email = "12345@gmail.com", 
  onBack, 
  onVerify 
}) => {
  const [code, setCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setIsComplete(newCode.length === 6);
  };

  const handleComplete = (completeCode: string) => {
    setIsComplete(true);
    setCode(completeCode);
  };

  const handleVerify = () => {
    if (isComplete && onVerify) {
      onVerify();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      
      {/* Header: Back Button */}
      <div className="w-full max-w-lg mx-auto flex justify-start pt-2 mb-8">
        <BackButton variant="circular" onClick={onBack} />
      </div>

      {/* Main Content */}
      <div className="grow flex flex-col items-center max-w-md mx-auto w-full pt-4">
        
        {/* Icon Container */}
        <IconContainer className="mb-6">
          <CheckCircle2 className="w-10 h-10 text-orange" strokeWidth={3} />
        </IconContainer>

        {/* Title */}
        <h1 className="text-3xl font-black text-textBlack mb-4 tracking-tight text-center">
          Check your email
        </h1>

        {/* Subtitle / Description */}
        <p className="text-center text-textGray text-sm font-medium mb-10">
          We sent a verification code to <b className="text-textBlack">{email}</b>
        </p>

        {/* Label */}
        <label className="block text-textBlack text-xs font-bold mb-4 text-center w-full">
          Enter verification code
        </label>

        {/* Verification Code Inputs */}
        <OTPInput
          length={6}
          onChange={handleCodeChange}
          onComplete={handleComplete}
          className="mb-8"
        />

        {/* Resend Timer */}
        <div className="text-center text-textGray text-sm font-medium mb-10">
          <p className="mb-1">Didn't receive the code?</p>
          <p className="text-textGray opacity-70">Resend in 55s</p>
        </div>

        {/* Verify Button */}
        <Button
          variant={isComplete ? "primary" : "disabled"}
          size="md"
          fullWidth
          onClick={handleVerify}
          disabled={!isComplete}
        >
          Verify Code
        </Button>

      </div>
    </div>
  );
};

export default OtpModal;
