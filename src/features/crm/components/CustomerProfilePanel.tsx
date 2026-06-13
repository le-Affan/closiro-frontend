import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CustomerProfilePanelProps {
  customerId: string;
  name: string;
  role?: string;
  company?: string;
  children?: React.ReactNode;
}

export function CustomerProfilePanel({ name, role, company, children }: CustomerProfilePanelProps) {
  return (
    <div className="flex flex-col w-[320px] bg-white border-l border-neutral-200 shrink-0 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <h2 className="text-base font-semibold text-neutral-900">Profile</h2>
        <button className="text-neutral-400 hover:text-neutral-600">
          <CloseIcon sx={{ width: 18, height: 18 }} />
        </button>
      </div>

      {/* User Info */}
      <div className="flex items-center justify-between px-4 py-3 pb-5 border-b border-neutral-100">
        <div className="flex items-center space-x-3">
          <Avatar src="" fallback={name.split(' ').map(n => n[0]).join('')} size="md" className="bg-[#5C9DFF] text-white font-medium" />
          <span className="text-[15px] font-medium text-neutral-900">{name}</span>
        </div>
        <button className="text-neutral-400">
          <ChevronRightIcon sx={{ width: 16, height: 16 }} />
        </button>
      </div>
      
      {/* Sections */}
      <div className="flex-1 overflow-y-auto" id="profile-panel-content">
        {children}
      </div>
    </div>
  );
}
