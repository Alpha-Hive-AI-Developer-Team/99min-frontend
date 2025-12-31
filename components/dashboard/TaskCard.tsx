import React from 'react';
import { MapPin, Clock, Share2 } from 'lucide-react';

interface TaskCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  location: string;
  timeLeft: string;
  interest: number;
  urgent?: boolean;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  image, 
  title, 
  description, 
  price, 
  location, 
  timeLeft, 
  interest, 
  urgent,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative mb-4">
        <img src={image} alt={title} className="w-full h-[200px] object-cover rounded-xl" />
        {urgent && (
          <div className="absolute top-3 right-3 bg-red text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
            Urgent
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-textBlack mb-2 leading-tight">
        {title}
      </h3>
      
      <p className="text-textGray text-sm mb-4 leading-relaxed line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-black text-orange">
          ${price}
        </div>
        <div className="flex items-center text-textBlack text-sm font-bold gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          {interest} interest
        </div>
      </div>

      <div className="flex items-center justify-between text-gray-400 text-sm font-medium">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-5 h-5" />
          {location}
        </div>
        <div className="flex items-center text-orange bg-iconBg px-2 py-2 rounded-full gap-1.5">
          <Clock className="w-5 h-5 text-orange"  />
          {timeLeft}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
        <button className="flex items-center gap-2 text-textBlack font-bold hover:text-textBlack transition-colors">
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

