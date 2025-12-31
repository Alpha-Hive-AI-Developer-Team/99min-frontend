"use client";

import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button, Input, IconContainer } from "@/components/ui";
import { AuthPageLayout, PasswordStrengthMeter, PasswordRequirements } from "./shared";

interface NewPasswordModalProps {
  onBack?: () => void;
  onSubmit?: () => void;
}

const NewPasswordModal: React.FC<NewPasswordModalProps> = ({ onBack, onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && confirmPassword && newPassword === confirmPassword && onSubmit) {
      onSubmit();
    }
  };

  const isFormValid = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <AuthPageLayout
      backButtonOnClick={onBack}
      backButtonVariant="circular"
      contentMaxWidth="md"
    >
      {/* Icon Container */}
      <IconContainer className="mb-6">
        <Lock className="w-8 h-8 text-orange" />
      </IconContainer>

      {/* Title */}
      <h1 className="text-3xl font-black text-textBlack mb-3 tracking-tight text-center">
        Create new password
      </h1>

      {/* Subtitle */}
      <p className="text-center text-textGray text-sm mb-8 leading-relaxed max-w-xs mx-auto opacity-80">
        Your new password must be different from previously used passwords
      </p>

      {/* Form */}
      <form className="w-full" onSubmit={handleSubmit}>
        {/* New Password Input */}
        <div className="mb-1">
          <Input
            type="password"
            id="new-password"
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            showPasswordToggle
          />
        </div>

        {/* Password Strength Meter */}
        <PasswordStrengthMeter password={newPassword} />

        {/* Confirm Password Input */}
        <div className="mb-8">
          <Input
            type="password"
            id="confirm-password"
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPasswordToggle
          />
        </div>

        {/* Password Requirements */}
        <PasswordRequirements password={newPassword} />

        {/* Submit Button */}
        <Button
          type="submit"
          variant={isFormValid ? "primary" : "disabled"}
          size="md"
          fullWidth
          disabled={!isFormValid}
        >
          Reset Password
        </Button>
      </form>
    </AuthPageLayout>
  );
};

export default NewPasswordModal;
