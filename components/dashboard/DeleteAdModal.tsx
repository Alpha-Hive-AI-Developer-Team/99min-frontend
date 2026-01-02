"use client";

import React from 'react';
import ConfirmationModal from '@/components/shared/ConfirmationModal';

interface DeleteAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAdModal: React.FC<DeleteAdModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Ad"
      description="Are you sure you want to delete this ad?"
      confirmText="Confirm"
      cancelText="Cancel"
    />
  );
};

export default DeleteAdModal;

