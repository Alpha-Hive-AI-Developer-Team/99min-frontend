"use client";

import React from 'react';
import ReportModal from '@/components/shared/ReportModal';

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (reason: string, details: string) => void;
  userName: string;
}

const ReportUserModal: React.FC<ReportUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userName,
}) => {
  return (
    <ReportModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      type="user"
      userName={userName}
    />
  );
};

export default ReportUserModal;

