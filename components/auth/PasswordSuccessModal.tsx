"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PasswordSuccessModal: React.FC<ModalProps> = ({ isOpen = true, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay/Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-4xl w-full max-w-md p-8 shadow-2xl transform transition-all flex flex-col items-center">
        
        {/* Success Icon Container */}
        <div className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#00C853]" strokeWidth={3} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-textBlack text-center mb-3 leading-tight">
          Password Reset Successful!
        </h2>

        {/* Description Text */}
        <p className="text-center text-textGray text-sm leading-relaxed mb-8 px-2 font-medium opacity-80">
          Your password has been reset successfully. You can now log in with your new password.
        </p>

        {/* Action Button */}
        <Link href="/auth/login" className="w-full" onClick={onClose}>
          <Button
            variant="primary"
            size="md"
            fullWidth
            className="shadow-md"
          >
            Go to Login
          </Button>
        </Link>

      </div>
    </div>
  );
};

export default PasswordSuccessModal;
