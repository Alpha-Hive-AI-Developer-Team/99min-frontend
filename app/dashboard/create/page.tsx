"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CreateTaskHeader from '@/components/create/CreateTaskHeader';
import CreateTaskForm, { FormData } from '@/components/create/CreateTaskForm';
import { tasksApi } from '@/utils/api';

const CreateTaskPage: React.FC = () => {
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (data: FormData, files: File[]) => {
    setApiError('');

    // 1. Upload files first — get back public URLs
    let mediaUrls: string[] = [];
    if (files.length > 0) {
      mediaUrls = await tasksApi.uploadMedia(files);
    }

    // 2. Parse budget — form sends "25" or "25-50"
    let budgetMin: number;
    let budgetMax: number;

    if (data.budget.includes('-')) {
      const [min, max] = data.budget.split('-').map((v) => Number(v.trim()));
      budgetMin = min;
      budgetMax = max;
    } else {
      budgetMin = Number(data.budget);
      budgetMax = Number(data.budget);
    }

    // 3. Parse tags — form sends comma-separated string
    const tags = data.tags
      ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    // 4. Create task with real media URLs
    await tasksApi.create({
      title: data.title,
      description: data.description,
      category: data.category,
      budget: { min: budgetMin, max: budgetMax },
      location: { label: data.location },
      duration: data.duration,
      urgent: data.urgent ?? false,
      tags,
      media: mediaUrls,
    });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-inputBg">
        <CreateTaskHeader />
        {apiError && (
          <p className="text-red-500 text-sm text-center py-2">{apiError}</p>
        )}
        <div className="max-w-4xl mx-auto">
          <CreateTaskForm onSubmit={handleSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTaskPage;