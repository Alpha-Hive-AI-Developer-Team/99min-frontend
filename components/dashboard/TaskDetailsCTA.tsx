"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';

const TaskDetailsCTA: React.FC = () => {
  return (
    <div className="bg-white p-4 z-30">
        <div className="max-w-7xl mx-auto">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          I can help!
        </Button>
      </div>
    </div>
  );
};

export default TaskDetailsCTA;

