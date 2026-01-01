"use client";

import React, { ReactNode } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface InfoBoxProps {
  message: ReactNode;
  variant?: 'info' | 'warning';
  icon?: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  message,
  variant = 'info',
  icon,
}) => {
  const defaultIcon = variant === 'warning' 
    ? <AlertTriangle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
    : <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />;

  const bgColor = variant === 'warning' ? 'bg-iconBg border-orange/20' : 'bg-blue-50 border-blue-200';

  return (
    <div className={`${bgColor} border rounded-xl p-4 mb-6 flex items-start gap-3`}>
      {icon !== undefined ? icon : defaultIcon}
      <div className="text-textBlack text-sm leading-relaxed">
        {message}
      </div>
    </div>
  );
};

export default InfoBox;

