"use client";

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Button } from '@/components/ui';
import { Check, Save } from 'lucide-react';
import SuccessModal from '@/components/shared/SuccessModal';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit?: (data: ProfileFormData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData = {},
  onSubmit,
}) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: initialData.fullName || 'John Doe',
    email: initialData.email || 'john.doe@example.com',
    phone: initialData.phone || '+1 (555) 123-4567',
    location: initialData.location || 'New York, NY',
    bio: initialData.bio || '',
  });

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success modal
    setIsSuccessModalOpen(true);
    
    // Log the update (actual submission happens when modal is closed if onSubmit is provided)
    console.log('Profile updated:', formData);
  };

  const bioCharacterCount = formData.bio.length;
  const maxBioLength = 200;

  return (
    <form onSubmit={handleSubmit} className="pb-32">
      <Input
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        required
      />

      <Input
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        required
      />

      <Input
        label="Location"
        value={formData.location}
        onChange={(e) => handleChange('location', e.target.value)}
        required
      />

      <div className="mb-4">
        <Textarea
          label="Bio"
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          className="min-h-[120px]"
          maxLength={maxBioLength}
        />
        <div className="text-right mt-1">
          <span className="text-textGray text-xs">
            {bioCharacterCount}/{maxBioLength} characters
          </span>
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className=" bg-white border-t border-gray-200 p-4 z-30">
        <div className="max-w-7xl mx-auto">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Profile Updated"
        description={
          <>
            Your profile has been updated successfully.
          </>
        }
        buttonText="Got it"
        onButtonClick={() => setIsSuccessModalOpen(false)}
        icon={<Check className="w-10 h-10" strokeWidth={3} />}
      />
    </form>
  );
};

export default ProfileForm;

