import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

interface CRMIntegrationCardProps {
  provider: 'salesforce' | 'hubspot';
  data: {
    name: string;
    title: string;
    company: string;
    owner: string;
  };
}

export function CRMIntegrationCard({ provider, data }: CRMIntegrationCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-neutral-100">
      <div 
        className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {/* Salesforce Cloud Icon — kept as-is since it's a brand logo, not a UI icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#00A1E0" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.42 8.65c-.09-1.8-1.57-3.23-3.41-3.23-1.4 0-2.6.86-3.13 2.08-.2-.05-.4-.08-.62-.08-1.5 0-2.73 1.2-2.73 2.68 0 .28.05.54.13.79-.89.28-1.54 1.09-1.54 2.05 0 1.21.99 2.19 2.22 2.19h9.11c1.55 0 2.82-1.25 2.82-2.78 0-1.45-1.07-2.65-2.45-2.77-.07-.5-.22-.97-.4-1.41z"/>
          </svg>
          <span className="text-[14px] font-semibold text-neutral-900 capitalize">Salesforce</span>
        </div>
        <ExpandMoreIcon
          sx={{ width: 16, height: 16 }}
          className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#9CA3AF]">Name</span>
              <span className="font-semibold text-neutral-900">{data.name}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#9CA3AF]">Title</span>
              <span className="font-semibold text-neutral-900">{data.title}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#9CA3AF]">Company</span>
              <span className="font-semibold text-neutral-900">{data.company}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#9CA3AF]">Owner</span>
              <span className="font-semibold text-neutral-900">{data.owner}</span>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 text-[13px] text-[#3B82F6] hover:text-blue-600 font-medium mt-2">
            <AddIcon sx={{ width: 14, height: 14 }} />
            <span>Create task</span>
          </button>
        </div>
      )}
    </div>
  );
}
