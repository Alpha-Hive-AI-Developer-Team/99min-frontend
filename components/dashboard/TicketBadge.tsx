import React from 'react';
import Image from "next/image";
import ticketIcon from "@/public/assets/images/ticketIcon.svg";

const TicketBadge: React.FC = () => {
  return (
    <div className="relative w-20 h-14 transform -rotate-12 select-none pointer-events-none">
      <Image src={ticketIcon} alt="Ticket 1256" width={80} height={56} />
    </div>
  );
};

export default TicketBadge;

