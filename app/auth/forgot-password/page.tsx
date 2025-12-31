"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Mail } from 'lucide-react';
import { Button, Input, BackButton, IconContainer } from "@/components/ui";
import OtpModal from "@/components/auth/OtpModal";
import NewPasswordModal from "@/components/auth/NewPasswordModal";
import PasswordSuccessModal from "@/components/auth/PasswordSuccessModal";

type ForgotPasswordStep = 'email' | 'otp' | 'newPassword' | 'success';

const ForgotPasswordScreen: React.FC = () => {
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the email to the backend here
    setStep('otp');
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('email');
    } else if (step === 'newPassword') {
      setStep('otp');
    }
  };

  const handleOtpVerify = () => {
    setStep('newPassword');
  };

  const handlePasswordReset = () => {
    setStep('success');
  };

  // Render different steps
  if (step === 'otp') {
    return (
      <OtpModal 
        email={email} 
        onBack={handleBack}
        onVerify={handleOtpVerify}
      />
    );
  }

  if (step === 'newPassword') {
    return (
      <NewPasswordModal 
        onBack={handleBack}
        onSubmit={handlePasswordReset}
      />
    );
  }

  if (step === 'success') {
    return (
      <>
        <div className="min-h-screen bg-white"></div>
        <PasswordSuccessModal 
          isOpen={true}
        />
      </>
    );
  }

  // Default: Email step
  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      
      {/* Header: Back Button */}
      <div className="w-full max-w-lg mx-auto flex justify-start pt-2 mb-8">
        {step === 'email' ? (
          <BackButton variant="circular" href="/auth/login" />
        ) : (
          <BackButton variant="circular" onClick={handleBack} />
        )}
      </div>

      {/* Main Content */}
      <div className="grow flex flex-col items-center max-w-md mx-auto w-full pt-4">
        
        {/* Icon Container */}
        <IconContainer className="mb-6">
          <Mail className="w-8 h-8 text-orange" />
        </IconContainer>

        {/* Title */}
        <h1 className="text-3xl font-black text-textBlack mb-4 tracking-tight">
          Reset Password
        </h1>

        {/* Subtitle / Description */}
        <p className="text-center text-textGray text-sm leading-relaxed mb-10 max-w-xs font-medium opacity-80">
          Enter your email and we'll send you a verification code to reset your password
        </p>

        {/* Form */}
        <form className="w-full" onSubmit={handleEmailSubmit}>
          
          {/* Email Input */}
          <Input
            type="email"
            id="email"
            label="Email Address"
            placeholder="12345@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="alt"
            className="mb-8"
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            className="mb-10"
          >
            Send Reset Link
          </Button>

          {/* Footer Link */}
          <div className="text-center text-textGray text-sm font-medium opacity-80">
            Back to{' '}
            <Link href="/auth/login">
              <Button 
                type="button" 
                variant="link"
                size="sm"
              >
                Login
              </Button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
