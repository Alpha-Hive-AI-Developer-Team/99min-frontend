import React from 'react';
import { MapPin, Clock, Share2, Tag } from 'lucide-react';

interface PinnedTaskCardProps {
  title?: string;
  description?: string;
  price?: string;
  tags?: string[];
  location?: string;
  timeLeft?: string;
  onClick?: () => void;
}

const PinnedTaskCard: React.FC<PinnedTaskCardProps> = ({
  title = "Perfect Task Title: Clear and Specific",
  description = "Write a detailed description that includes what you need, when you need it, and any special requirements. Be clear and friendly!",
  price = "$25-50",
  tags = ['example', 'tutorial', 'guide'],
  location = "Your Location",
  timeLeft = "99m",
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 border-2 border-orange relative overflow-hidden cursor-pointer"
    >
      {/* Watermark effect */}
      <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.47715 0 0 4.47715 0 10V24C2.76142 24 5 26.2386 5 29C5 31.7614 2.76142 34 0 34V46C2.76142 46 5 48.2386 5 51C5 53.7614 2.76142 56 0 56V70C0 75.5228 4.47715 80 10 80H130C135.523 80 140 75.5228 140 70V56C137.239 56 135 53.7614 135 51C135 48.2386 137.239 46 140 46V34C137.239 34 135 31.7614 135 29C135 26.2386 137.239 24 140 24V10C140 4.47715 135.523 0 130 0H10Z" fill="#F59E0B" />
        </svg>
      </div>

      <div className="inline-block bg-orange text-white text-xs font-bold px-3 py-2 rounded-full mb-4">
      ✨  PINNED EXAMPLE
      </div>
      
      <h3 className="text-2xl font-black text-textBlack mb-2 ">
        {title}
      </h3>
      
      <p className="text-textGray text-sm mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="text-3xl font-black text-orange mb-4">
        {price}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center gap-1 bg-iconBg text-orange px-3 py-2 rounded-full text-sm font-medium"
          >
            <Tag className="w-4 h-4" />
            {tag}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-textGray text-sm font-medium mb-6">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-5 h-5 text-gray-400" />
          {location}
        </div>
        <div className="flex items-center text-orange gap-1.5 bg-iconBg px-3 py-2 rounded-full ">
          <Clock className="w-5 h-5 text-orange" />
          {timeLeft}
        </div>
      </div>

      <button className="w-full bg-orange hover:bg-orangeHover text-white text-lg font-bold py-3.5 rounded-xl shadow-sm transition-colors duration-200 flex items-center justify-center gap-2">
        <Share2 className="w-5 h-5" />
        Share
      </button>
    </div>
  );
};

export default PinnedTaskCard;

