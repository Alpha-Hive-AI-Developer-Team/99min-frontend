"use client";

import React, { useState } from 'react';
import { DollarSign, MapPin, Tag, CheckCircle2, Check } from 'lucide-react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import CategorySelector from './CategorySelector';
import InfoBox from '@/components/shared/InfoBox';
import SuccessModal from '@/components/shared/SuccessModal';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

interface CreateTaskFormProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  location: string;
  tags: string;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'errands',
    budget: '',
    location: '',
    tags: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.budget || !formData.location) {
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Form submitted:', formData);
      }
      
      // Show success modal
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white  px-6 py-8 pb-32">
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
        placeholder="Enter budget"
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

      <Input
        label="Tags (Optional)"
        icon={<Tag className="w-5 h-5" />}
        type="text"
        placeholder="Enter tags (comma separated)"
        value={formData.tags}
        onChange={(e) => handleChange('tags', e.target.value)}
      />

      <InfoBox
        variant="warning"
        message={
          <>
            Your ad will be live for <span className="font-bold">99 minutes</span> and then automatically expire. Make it count!
          </>
        }
      />

      {/* Submit Button - Fixed at bottom */}
      <div className=" bg-white border-t border-gray-200 p-4 z-30">
        <div className="max-w-7xl mx-auto">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
          >
            Post Ad (Expires in 99min)
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          // Reset form after closing modal
          setFormData({
            title: '',
            description: '',
            category: 'errands',
            budget: '',
            location: '',
            tags: '',
          });
        }}
        title="Ad Posted!"
        description={
          <>
           Your ad is live and will expire in 99 minutes.
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

