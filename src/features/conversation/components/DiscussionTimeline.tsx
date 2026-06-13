import React from 'react';
import { cn } from '@/lib/utils';

export interface TimelinePoint {
  id: string;
  timestamp: string;
  content: string;
  type: 'neutral' | 'positive' | 'warning' | 'success';
}

interface DiscussionTimelineProps {
  points: TimelinePoint[];
}

export function DiscussionTimeline({ points }: DiscussionTimelineProps) {
  
  const getTypeClasses = (type: string) => {
    switch(type) {
      case 'warning': return 'bg-[#FFF8EE] text-[#B87A38]';
      case 'positive': return 'bg-[#EEF4FF] text-[#3972C7]';
      case 'success': return 'bg-[#EEF8ED] text-[#3B823D]';
      default: return 'bg-neutral-50 text-neutral-900';
    }
  };

  const getTimestampClasses = (type: string) => {
    switch(type) {
      case 'warning': return 'bg-[#F9DCA2] text-[#B87A38]';
      case 'positive': return 'bg-[#B0D2FF] text-[#3972C7]';
      case 'success': return 'bg-[#B4E3B7] text-[#3B823D]';
      default: return 'bg-neutral-200 text-neutral-900';
    }
  };

  return (
    <div className="space-y-2">
      {points.map((point) => (
        <div 
          key={point.id} 
          className={cn(
            "flex items-center space-x-4 p-2 rounded-lg",
            getTypeClasses(point.type)
          )}
        >
          <span className={cn("text-[13px] font-semibold px-2.5 py-1 rounded shrink-0", getTimestampClasses(point.type))}>
            {point.timestamp}
          </span>
          <p className="text-[14px]">
            {point.content}
          </p>
        </div>
      ))}
    </div>
  );
}
