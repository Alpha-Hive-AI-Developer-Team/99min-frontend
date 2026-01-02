"use client";

import React from 'react';
import ConfirmationModal from '@/components/shared/ConfirmationModal';

interface RemovePaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RemovePaymentMethodModal: React.FC<RemovePaymentMethodModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Remove Payment Method"
      description="Are you sure you want to remove this payment method?"
      confirmText="Remove"
      cancelText="Cancel"
    />
  );
};

export default RemovePaymentMethodModal;

