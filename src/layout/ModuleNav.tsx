import React from 'react';
import { cn } from '@/lib/utils';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import DatasetIcon from '@mui/icons-material/Dataset';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';

export function ModuleNav() {
  const items = [
    { id: 'live',     label: 'Live',        active: true, icon: <RingVolumeIcon sx={{ width: 24, height: 24 }} className="mr-3" /> },
    { id: 'data',     label: 'Data',                      icon: <DatasetIcon sx={{ width: 24, height: 24 }} className="mr-3" /> },
    { id: 'info',     label: 'Information',               icon: <InfoIcon sx={{ width: 24, height: 24 }} className="mr-3" /> },
    { id: 'insights', label: 'Insights',                  icon: <BarChartIcon sx={{ width: 24, height: 24 }} className="mr-3" /> },
  ];

  return (
    <div className="w-[200px] bg-neutral-50 h-full shrink-0 border-r border-neutral-200">
      <div className="p-3 pt-4 space-y-1">
        {items.map(item => (
          <button 
            key={item.id}
            className={cn(
              "w-full flex items-center px-3 py-2.5 rounded-md text-[15px] font-medium transition-colors",
              item.active ? "bg-[#EAF7F6] text-[#2F544D]" : "text-neutral-600 hover:bg-neutral-100/50 hover:text-neutral-900"
            )}
          >
            <span className={item.active ? "text-[#5DC3B7]" : "text-neutral-400"}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
