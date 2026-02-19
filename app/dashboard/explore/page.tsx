"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ExploreHeader from '@/components/dashboard/ExploreHeader';
import TaskCard from '@/components/dashboard/TaskCard';
import PinnedTaskCard from '@/components/dashboard/PinnedTaskCard';
import TaskDetails, { TaskDetailsData } from '@/components/dashboard/TaskDetails';
import ShareAdModal from '@/components/dashboard/ShareAdModal';
import ReportAdModal from '@/components/dashboard/ReportAdModal';
import { tasksApi } from '@/utils/api';

// Shape of a task as returned by the backend
interface ApiTask {
  _id: string;
  title: string;
  description: string;
  budget: { min: number; max: number };
  location: { label: string };
  expiresAt: string;
  createdAt: string;
  interestCount: number;
  urgent: boolean;
  category: string;
  tags: string[];
  media: string[];
}

interface ApiListResponse {
  data: ApiTask[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimeLeft(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return 'Expired';
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ExplorePage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDetailsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // ─── Fetch tasks from API ────────────────────────────────────────────────
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await tasksApi.list({ status: 'active', sort: 'newest' }) as ApiListResponse;

        const mapped: TaskDetailsData[] = res.data.map((task: ApiTask) => ({
          _id: task._id,
          image: task.media?.[0] ?? '',
          title: task.title,
          description: task.description,
          price:
            task.budget.min === task.budget.max
              ? `${task.budget.min}`
              : `${task.budget.min}-${task.budget.max}`,
          location: task.location.label,
          timeLeft: formatTimeLeft(task.expiresAt),
          interest: task.interestCount ?? 0,
          urgent: task.urgent,
          category: task.category,
          postedTime: `Posted ${timeAgo(task.createdAt)}`,
          tags: task.tags?.map((t) => `#${t}`) ?? [],
        }));

        setTasks(mapped);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleTaskClick = (task: TaskDetailsData) => setSelectedTask(task);
  const handleBack = () => setSelectedTask(null);

  const handleShare = (taskId: string) => {
    setActiveTaskId(taskId);
    setIsShareModalOpen(true);
    tasksApi.share(taskId).catch(console.error);
  };

  const handleReport = (taskId: string) => {
    setActiveTaskId(taskId);
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = async (reason: string, details: string) => {
    if (!activeTaskId) return;
    try {
      await tasksApi.report(activeTaskId, { reason, details });
      setIsReportModalOpen(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to submit report');
    }
  };

  // ─── Task detail view ────────────────────────────────────────────────────
  if (selectedTask) {
    return (
      <DashboardLayout>
        <TaskDetails task={selectedTask} onBack={handleBack} />
      </DashboardLayout>
    );
  }

  // ─── Main view ───────────────────────────────────────────────────────────
  return (
    <DashboardLayout>
      <div className="bg-inputBg p-6">
        <div className="max-w-6xl mx-auto">
          <ExploreHeader activeTasksCount={tasks.length} />

          {loading && (
            <p className="text-center text-textGray py-12">Loading tasks...</p>
          )}

          {error && (
            <p className="text-center text-red-500 py-12">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <PinnedTaskCard />

              {tasks.length === 0 ? (
                <p className="text-textGray text-center col-span-2 py-12">
                  No active tasks yet. Be the first to post one!
                </p>
              ) : (
                tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    {...task}
                    onClick={() => handleTaskClick(task)}
                    onShare={() => handleShare(task._id)}
                    onReport={() => handleReport(task._id)}
                  />
                ))
              )}
            </div>
          )}
        </div>

        <ShareAdModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onShare={(platform) => console.log('Shared on:', platform)}
        />

        <ReportAdModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleReportSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExplorePage;