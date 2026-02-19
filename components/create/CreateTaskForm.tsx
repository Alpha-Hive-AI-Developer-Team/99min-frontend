"use client";

import React, { useState } from 'react';
import { DollarSign, MapPin, Tag, CloudUpload, Check, Clock, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import CategorySelector from './CategorySelector';
import InfoBox from '@/components/shared/InfoBox';
import SuccessModal from '@/components/shared/SuccessModal';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Exported so CreateTaskPage can use the same type
export interface FormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  location: string;
  tags: string;
  duration: '90_mins' | '24_hours';
  urgent?: boolean;
}

interface CreateTaskFormProps {
  // files are passed alongside form data so the page can upload them
  onSubmit?: (data: FormData, files: File[]) => Promise<void>;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ─── File state ────────────────────────────────────────────────────────────
  const [files, setFiles] = useState<File[]>([]);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const isVideo = selectedFiles[0].type.startsWith('video');
    const isImage = selectedFiles[0].type.startsWith('image');

    // Prevent mixing image & video
    if (fileType && ((fileType === 'video' && isImage) || (fileType === 'image' && isVideo))) {
      setFileError(`You can only upload ${fileType === 'video' ? 'videos' : 'images'}.`);
      return;
    }

    if (!fileType) {
      if (isVideo) setFileType('video');
      if (isImage) setFileType('image');
    }

    if (isImage && files.length + selectedFiles.length > 3) {
      setFileError('You can only upload up to 3 images.');
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
    setFileError(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (files.length === 1) setFileType(null);
  };

  // ─── Form state ────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'errands',
    budget: '',
    location: '',
    tags: '',
    duration: '90_mins',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.title || !formData.description || !formData.budget || !formData.location) {
      alert('Please fill all required fields.');
      return;
    }

    if (files.length === 0) {
      alert('Please upload at least one image or video.');
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData, files); // ← passes files to parent
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log('Form submitted:', formData, files);
      }
      setIsSuccessModalOpen(true);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to post task. Please try again.';
      setSubmitError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white px-6 py-8 pb-32">

      <Input
        label="Task Title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
      />

      <Textarea
        label="Description"
        placeholder="Describe what you need help with..."
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        className="min-h-[120px]"
        required
      />

      <CategorySelector
        selectedCategory={formData.category}
        onCategoryChange={(category) => handleChange('category', category)}
      />

      <Input
        label="Budget"
        icon={<DollarSign className="w-5 h-5" />}
        type="text"
        placeholder="Enter budget e.g. 25 or 25-50"
        value={formData.budget}
        onChange={(e) => handleChange('budget', e.target.value)}
        required
      />

      <Input
        label="Location"
        icon={<MapPin className="w-5 h-5" />}
        type="text"
        placeholder="Enter location"
        value={formData.location}
        onChange={(e) => handleChange('location', e.target.value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Input
            label="Tags (Optional)"
            icon={<Tag className="w-5 h-5" />}
            type="text"
            placeholder="Enter tags (comma separated)"
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">
            Task Duration
          </label>
          <Select
            value={formData.duration}
            onValueChange={(value) =>
              handleChange('duration', value as FormData['duration'])
            }
          >
            <SelectTrigger className="relative h-12 w-full pl-10 pr-4 rounded-xl mt-2 border border-gray-200 bg-gray-50 focus:ring-primary">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Clock className="w-5 h-5 text-gray-600" />
              </span>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="90_mins">90 Minutes</SelectItem>
              <SelectItem value="24_hours">24 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ─── Upload Media ──────────────────────────────────────────────────── */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Upload Media <span className="text-red-500">*</span>
        </label>

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition"
        >
          <CloudUpload className="w-10 h-10 text-gray-400 mb-2" />
          <span className="text-gray-500 text-sm">
            {fileType === 'video'
              ? 'Video selected'
              : fileType === 'image'
              ? `${files.length} image(s) selected`
              : 'Click to upload image or video'}
          </span>
          <input
            id="file-upload"
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}

        {files.length > 0 && (
          <div className="flex flex-wrap mt-3 gap-3">
            {files.map((file, index) => {
              const url = URL.createObjectURL(file);
              return (
                <div
                  key={file.name + index}
                  className="relative w-24 h-24 border rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-gray-300 z-10"
                    onClick={() => {
                      removeFile(index);
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {file.type.startsWith('image') ? (
                    <Image
                      src={url}
                      alt={file.name}
                      fill
                      
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={url}
                      className="w-full h-full object-cover"
                      controls={false}
                      preload="metadata"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <InfoBox
        variant="warning"
        message={
          <>
            Your ad will be live for{' '}
            <span className="font-bold">
              {formData.duration === '90_mins' ? '90 minutes' : '24 hours'}
            </span>{' '}
            and then automatically expire. Make it count!
          </>
        }
      />

      {submitError && (
        <p className="text-red-500 text-sm text-center mt-4">{submitError}</p>
      )}

      {/* ─── Submit Button ─────────────────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-200 p-4 z-30">
        <div className="max-w-7xl mx-auto">
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Post Ad (Expires in{' '}
            {formData.duration === '90_mins' ? '90 mins' : '24 hours'})
          </Button>
        </div>
      </div>

      {/* ─── Success Modal ─────────────────────────────────────────────────── */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setFormData({
            title: '',
            description: '',
            category: 'errands',
            budget: '',
            location: '',
            tags: '',
            duration: '90_mins',
          });
          setFiles([]);
          setFileType(null);
        }}
        title="Ad Posted!"
        description={
          <>
            Your ad is live and will expire in{' '}
            {formData.duration === '90_mins' ? '90 minutes' : '24 hours'}.
          </>
        }
        buttonText="Got it"
        onButtonClick={() => router.push('/dashboard/explore')}
        icon={<Check className="w-10 h-10" strokeWidth={3} />}
      />
    </form>
  );
};

export default CreateTaskForm;