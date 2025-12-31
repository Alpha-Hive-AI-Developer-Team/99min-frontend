import React from 'react';
import Image from "next/image";
import ticketIcon from "@/public/assets/images/ticketIcon.svg";

interface TicketIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-28 h-20',
  md: 'w-32 h-20',
  lg: 'w-40 h-28',
};

const sizeConfig = {
  sm: { width: 112, height: 80 },
  md: { width: 132, height: 100 },
  lg: { width: 160, height: 112 },
};

const TicketIcon: React.FC<TicketIconProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const config = sizeConfig[size];
  
  return (
    <div className={`relative ${sizeClasses[size]} transform -rotate-12 select-none pointer-events-none ${className}`}>
      <Image src={ticketIcon} alt="Ticket Icon" width={config.width} height={config.height} />
    </div>
  );
};

export default TicketIcon;

