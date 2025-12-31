"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { AuthPageLayout, AuthHeader, AuthFormFooter } from "./shared";
import OtpModal from "@/components/auth/OtpModal";

type SignupStep = 'form' | 'otp';

const SignupScreen: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // In a real app, you would send the signup data to the backend here
      console.log('Signup:', { name, email, password, confirmPassword });
      setStep('otp');
    }
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('form');
    } else {
      router.push('/');
    }
  };

  const handleOtpVerify = () => {
    // In a real app, you would verify the OTP with the backend here
    router.push('/auth/login');
  };

  const isFormValid = name && email && password && confirmPassword && password === confirmPassword;

  // Show OTP screen if step is 'otp'
  if (step === 'otp') {
    return (
      <OtpModal 
        email={email} 
        onBack={handleBack}
        onVerify={handleOtpVerify}
      />
    );
  }

  return (
    <AuthPageLayout 
      backButtonHref="/"
      contentMaxWidth="sm"
    >
      <AuthHeader 
        title="Create Account"
        subtitle="Join 99min to start posting tasks"
        ticketSize="sm"
        titleSize="2xl"
        className="mb-6"
      />

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
          required
        />

        <Input
          type="password"
          id="confirm-password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showPasswordToggle
          required
        />

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant={isFormValid ? "primary" : "disabled"}
            size="lg"
            fullWidth
            disabled={!isFormValid}
          >
            Create Account
          </Button>
        </div>

        {/* Login Footer */}
        <AuthFormFooter
          question="Already have an account?"
          linkText="Login"
          linkHref="/auth/login"
          className="mt-4"
        />

        {/* Footer Terms */}
        <div className="pt-8 pb-4">
          <p className="text-center text-textGray text-xs px-4 leading-relaxed opacity-80">
            By creating an account you accept our Terms & Privacy Policy.
          </p>
        </div>
      </form>
    </AuthPageLayout>
  );
};

export default SignupScreen;
