"use client";

import React, { useEffect } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui';

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
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              {/* Outer glowing circle */}
              <div className="absolute inset-0 bg-teal-100 rounded-full blur-md opacity-50"></div>
              {/* Inner white circle with icon */}
              <div className="relative bg-white rounded-full p-3 border-2 border-teal-200">
                <Info className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-textBlack text-center mb-3">
            Delete Ad
          </h2>

          {/* Body Text */}
          <p className="text-textGray text-center mb-6">
            Are you sure you want to delete this ad?
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={onClose}
              className="border border-gray-200 bg-white text-textBlack hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleConfirm}
              className="bg-orange hover:bg-orangeHover"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdModal;

