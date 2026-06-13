import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ActivityTimelineProps {
  title: string;
  activities?: any[];
  isOpen?: boolean;
}

export function ActivityTimeline({ title, activities, isOpen: defaultOpen = false }: ActivityTimelineProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-100">
      <div 
        className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[14px] font-semibold text-neutral-900">{title}</span>
        <ExpandMoreIcon
          sx={{ width: 16, height: 16 }}
          className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isOpen && activities && activities.length > 0 && (
        <div className="px-4 pb-4">
          <ul className="space-y-4">
            {activities.map((activity, index) => (
              <li key={index} className="text-[13px] text-neutral-500">
                {activity.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
