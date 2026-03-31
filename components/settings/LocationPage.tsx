"use client";

import React, { useCallback, useRef } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SettingsSection from "./SettingsSection";
import LocationToggleCard from "./LocationToggleCard";
import LocationCard from "./LocationCard";
import RangeSlider from "./RangeSlider";
import QuickSelectButtons from "./QuickSelectButtons";
import { Navigation, MapPin } from "lucide-react";
import { useLocationSettings } from "@/hooks/UseLocationSetting";
import { useI18n } from "@/contexts/i18n-context";

interface LocationPageProps {
  onBack?: () => void;
}

const LocationPage: React.FC<LocationPageProps> = ({ onBack }) => {
  const { tr } = useI18n();
  const { settings, loading, error, handleUpdate } = useLocationSettings();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [geoLocation, setGeoLocation] = React.useState<{
    label: string;
    coords: string;
  } | null>(null);
  const [geoError, setGeoError] = React.useState<string | null>(null);
  const [geoLoading, setGeoLoading] = React.useState(false);

  const quickSelectOptions = [5, 10, 25, 50];

  const fetchCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const label =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.display_name ||
            "Current Location";

          setGeoLocation({
            label,
            coords: `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° W`,
          });
        } catch {
          setGeoLocation({
            label: "Current Location",
            coords: `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° W`,
          });
        }

        setGeoLoading(false);
      },
      (err) => {
        setGeoError(
          err.code === 1
            ? "Location access denied. Please allow location in your browser."
            : "Unable to retrieve your location."
        );
        setGeoLoading(false);
      }
    );
  }, []);

  const handleAutoDetectChange = useCallback(
    (val: boolean) => {
      handleUpdate({ autoDetect: val });
      if (val) fetchCurrentLocation();
    },
    [handleUpdate, fetchCurrentLocation]
  );

  const handleRadiusChange = useCallback(
    (val: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        handleUpdate({ defaultRadius: val });
      }, 400);
    },
    [handleUpdate]
  );

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <PageHeader title="Location" onBack={onBack} maxWidth="7xl" />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Location" onBack={onBack} maxWidth="7xl" />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{tr(error)}</div>
        )}

        {geoError && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{geoError}</div>
        )}

        <div>
          <LocationToggleCard
            icon={<Navigation className="w-5 h-5" />}
            title="Auto-detect Location"
            description={geoLoading ? "Detecting location..." : "Use your current location"}
            enabled={settings?.autoDetect ?? false}
            onChange={handleAutoDetectChange}
          />
        </div>

        <SettingsSection title="CURRENT LOCATION">
          <div className="px-4 py-4">
            <LocationCard
              icon={<MapPin className="w-5 h-5" />}
              location={geoLocation?.label ?? "No location detected"}
              coordinates={geoLocation?.coords ?? "Enable auto-detect above"}
            />
          </div>
        </SettingsSection>

        <SettingsSection title="SEARCH RADIUS">
          <div className="px-4 bg-inputBg py-4">
            <RangeSlider
              min={1}
              max={50}
              value={settings?.defaultRadius ?? 10}
              onChange={handleRadiusChange}
              label="Distance"
              minLabel="1 mi"
              maxLabel="50 mi"
              unit="miles"
            />
          </div>
        </SettingsSection>

        <SettingsSection title="QUICK SELECT">
          <div className="px-4 py-4">
            <QuickSelectButtons
              options={quickSelectOptions}
              selected={settings?.defaultRadius ?? 10}
              onChange={(val) => handleUpdate({ defaultRadius: val })}
              unit="mi"
            />
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default LocationPage;