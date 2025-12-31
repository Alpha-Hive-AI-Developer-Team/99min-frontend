"use client";

import React, { useState, useMemo } from 'react';
import { Lock, Check } from 'lucide-react';
import { Button, BackButton, IconContainer, Input } from "@/components/ui";

interface NewPasswordModalProps {
  onBack?: () => void;
  onSubmit?: () => void;
}

type PasswordStrength = 'weak' | 'medium' | 'strong';

const calculatePasswordStrength = (password: string): { strength: PasswordStrength; score: number; label: string; color: string } => {
  if (!password) {
    return { strength: 'weak', score: 0, label: '', color: 'bg-gray-200' };
  }

  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1; // lowercase
  if (/[A-Z]/.test(password)) score += 1; // uppercase
  if (/[0-9]/.test(password)) score += 1; // number
  if (/[^a-zA-Z0-9]/.test(password)) score += 1; // special character
  
  if (score <= 2) {
    return { strength: 'weak', score, label: 'Weak', color: 'bg-red-500' };
  } else if (score <= 4) {
    return { strength: 'medium', score, label: 'Medium', color: 'bg-yellow-500' };
  } else {
    return { strength: 'strong', score, label: 'Strong', color: 'bg-green-500' };
  }
};

interface PasswordRequirement {
  label: string;
  check: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    check: (password) => password.length >= 8,
  },
  {
    label: 'One uppercase letter',
    check: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'One lowercase letter',
    check: (password) => /[a-z]/.test(password),
  },
  {
    label: 'One number',
    check: (password) => /[0-9]/.test(password),
  },
];

const NewPasswordModal: React.FC<NewPasswordModalProps> = ({ onBack, onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordStrength = useMemo(() => calculatePasswordStrength(newPassword), [newPassword]);
  
  const requirementStatus = useMemo(() => {
    return passwordRequirements.map(req => ({
      ...req,
      met: req.check(newPassword),
    }));
  }, [newPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && confirmPassword && newPassword === confirmPassword && onSubmit) {
      onSubmit();
    }
  };

  const isFormValid = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      
      {/* Header: Back Button */}
      <div className="w-full max-w-lg mx-auto flex justify-start pt-2 mb-6">
        <BackButton variant="circular" onClick={onBack} />
      </div>

      {/* Main Content */}
      <div className="grow flex flex-col items-center max-w-md mx-auto w-full">
        
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
          {newPassword && (
            <div className="mb-6 mt-2">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-textGray text-xs font-medium opacity-80">Password strength</span>
                <span className={`text-xs font-bold ${
                  passwordStrength.strength === 'weak' ? 'text-red-500' :
                  passwordStrength.strength === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${passwordStrength.color} rounded-full transition-all duration-300`}
                  style={{ 
                    width: `${(passwordStrength.score / 6) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}

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

          {/* Password Requirements Box */}
          <div className="bg-gray-50 rounded-xl p-5 mb-8">
             <h3 className="text-textBlack text-xs font-bold mb-3">Password must contain:</h3>
             <ul className="space-y-2">
               {requirementStatus.map((req, index) => (
                 <li 
                   key={index} 
                   className={`flex items-center text-xs font-medium transition-colors duration-200 ${
                     req.met 
                       ? 'text-green-600' 
                       : 'text-textGray opacity-80'
                   }`}
                 >
                   {req.met ? (
                     <Check className="w-4 h-4 mr-2.5 text-green-600 shrink-0" strokeWidth={3} />
                   ) : (
                     <div className="w-1 h-1 bg-gray-400 rounded-full mr-2.5 shrink-0"></div>
                   )}
                   <span>{req.label}</span>
                 </li>
               ))}
             </ul>
          </div>

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
      </div>
    </div>
  );
};

export default NewPasswordModal;
