"use client";

import React from 'react';
import SuccessModal from '@/components/shared/SuccessModal';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PasswordSuccessModal: React.FC<ModalProps> = ({ isOpen = true, onClose }) => {
  return (
    <SuccessModal
      isOpen={isOpen}
      onClose={onClose || (() => {})}
      title="Password Reset Successful!"
      description="Your password has been reset successfully. You can now log in with your new password."
      buttonText="Go to Login"
      buttonHref="/auth/login"
    />
  );
};

export default PasswordSuccessModal;
