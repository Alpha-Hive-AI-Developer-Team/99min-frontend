"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Mail } from 'lucide-react';
import { Button, Input, IconContainer } from "@/components/ui";
import { AuthPageLayout } from "@/components/auth/shared";
import OtpModal from "@/components/auth/OtpModal";
import NewPasswordModal from "@/components/auth/NewPasswordModal";
import PasswordSuccessModal from "@/components/auth/PasswordSuccessModal";

type ForgotPasswordStep = 'email' | 'otp' | 'newPassword' | 'success';

const ForgotPasswordScreen: React.FC = () => {
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <PasswordSuccessModal isOpen={true} />
      </>
    );
  }

  // Default: Email step
  return (
    <AuthPageLayout
      backButtonHref="/auth/login"
      backButtonVariant="circular"
      contentMaxWidth="md"
      contentClassName="pt-4"
    >
      {/* Icon Container */}
      <IconContainer className="mb-6">
        <Mail className="w-8 h-8 text-orange" />
      </IconContainer>

      {/* Title */}
      <h1 className="text-3xl font-black text-textBlack mb-4 tracking-tight">
        Reset Password
      </h1>

      {/* Subtitle */}
      <p className="text-center text-textGray text-sm leading-relaxed mb-10 max-w-xs font-medium opacity-80">
        Enter your email and we'll send you a verification code to reset your password
      </p>

      {/* Form */}
      <form className="w-full" onSubmit={handleEmailSubmit}>
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
    </AuthPageLayout>
  );
};

export default ForgotPasswordScreen;
