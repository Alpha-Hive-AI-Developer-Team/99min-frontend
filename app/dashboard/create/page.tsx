"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CreateTaskHeader from '@/components/create/CreateTaskHeader';
import CreateTaskForm from '@/components/create/CreateTaskForm';

const CreateTaskPage: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log('Task created:', data);
    // Handle form submission here (e.g., API call, navigation, etc.)
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-inputBg">
        <CreateTaskHeader />
        <div className="max-w-4xl mx-auto">
          <CreateTaskForm onSubmit={handleSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTaskPage;

