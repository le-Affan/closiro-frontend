import React, { useState } from 'react';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CallSummaryCardProps {
  summary: string;
  children?: React.ReactNode;
}

export function CallSummaryCard({ summary, children }: CallSummaryCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-[#7AD0CA] rounded-xl bg-white overflow-hidden">
      <div 
        className="p-4 pb-2 flex flex-col relative cursor-pointer hover:bg-neutral-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <AutoFixNormalIcon sx={{ width: 22, height: 22 }} className="text-[#5DC3B7]" />
            <span className="text-[16px] font-semibold text-neutral-900">Call Summary &amp; Key Notes</span>
          </div>
          <ExpandMoreIcon
            sx={{ width: 20, height: 20 }}
            className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
        <span className="text-[12px] font-medium text-neutral-500 pl-7">Powered by AI</span>
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          <div>
            <h4 className="text-[14px] font-semibold text-neutral-900 mb-1.5">Discussion Summary</h4>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              {summary}
            </p>
          </div>
          
          {children}
        </div>
      )}
    </div>
  );
}
