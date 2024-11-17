import { Label } from '@/types';
import React from 'react'

const LabelBadge = ({ label }: { label: Label }) => {
    const getColorsByType = (type: Label['type']) => {
      switch (type) {
        case 'HighValue':
          return 'bg-purple-400 ';
        case 'Priority':
          return 'bg-green-700';
        case 'Pilot':
          return 'bg-pink-100 ';
        case 'Warm':
          return 'bg-red-100';
        default:
          return 'bg-gray-100';
      }
    };
    const truncateText = (text: string, maxLength: number = 5) => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}..` : text;
    };
  
    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded-xl text-xs border border-gray-200">
        <div className={`w-2 h-2 rounded-full ${getColorsByType(label.type)}`} />
        <span className="max-w-[60px] truncate">
          {truncateText(label.name)}
        </span>
      </div>
    );
  };

export default LabelBadge
