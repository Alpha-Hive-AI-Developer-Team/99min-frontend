"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SettingsSection from './SettingsSection';
import LocationToggleCard from './LocationToggleCard';
import LocationCard from './LocationCard';
import RangeSlider from './RangeSlider';
import QuickSelectButtons from './QuickSelectButtons';
import { Navigation, MapPin } from 'lucide-react';

interface LocationPageProps {
  onBack?: () => void;
}

const LocationPage: React.FC<LocationPageProps> = ({ onBack }) => {
  const [autoDetect, setAutoDetect] = useState(true);
  const [searchRadius, setSearchRadius] = useState(10);

  const quickSelectOptions = [5, 10, 25, 50];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Location" onBack={onBack} maxWidth="7xl" />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Auto-detect Location Section */}
        <div>
          <LocationToggleCard
            icon={<Navigation className="w-5 h-5" />}
            title="Auto-detect Location"
            description="Use your current location"
            enabled={autoDetect}
            onChange={setAutoDetect}
          />
        </div>

        {/* Current Location Section */}
        <SettingsSection title="CURRENT LOCATION">
          <div className="px-4  py-4">
            <LocationCard
              icon={<MapPin className="w-5 h-5" />}
              location="New York, NY"
              coordinates="40.7128° N, 74.0060° W"
            />
          </div>
        </SettingsSection>

        {/* Search Radius Section */}
        <SettingsSection title="SEARCH RADIUS">
          <div className="px-4 bg-inputBg py-4">
            <RangeSlider
              min={1}
              max={50}
              value={searchRadius}
              onChange={setSearchRadius}
              label="Distance"
              minLabel="1 mi"
              maxLabel="50 mi"
              unit="miles"
            />
          </div>
        </SettingsSection>

        {/* Quick Select Section */}
        <SettingsSection title="QUICK SELECT">
          <div className="px-4 py-4">
            <QuickSelectButtons
              options={quickSelectOptions}
              selected={searchRadius}
              onChange={setSearchRadius}
              unit="mi"
            />
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default LocationPage;

