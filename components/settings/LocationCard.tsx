"use client";

import React, { ReactNode } from 'react';

interface LocationCardProps {
  icon: ReactNode;
  location: string;
  coordinates: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  icon,
  location,
  coordinates,
}) => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
        <div className="text-orange">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-textBlack font-bold mb-1">{location}</h4>
        <p className="text-textGray text-sm">{coordinates}</p>
      </div>
    </div>
  );
};

export default LocationCard;

