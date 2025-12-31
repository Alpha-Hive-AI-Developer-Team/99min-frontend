"use client";

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, OTPInput, IconContainer } from "@/components/ui";
import { AuthPageLayout } from "./shared";

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
    <AuthPageLayout
      backButtonOnClick={onBack}
      backButtonVariant="circular"
      contentMaxWidth="md"
      contentClassName="pt-4"
    >
      {/* Icon Container */}
      <IconContainer className="mb-6">
        <CheckCircle2 className="w-10 h-10 text-orange" strokeWidth={3} />
      </IconContainer>

      {/* Title */}
      <h1 className="text-3xl font-black text-textBlack mb-4 tracking-tight text-center">
        Check your email
      </h1>

      {/* Subtitle */}
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
    </AuthPageLayout>
  );
};

export default OtpModal;
