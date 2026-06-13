import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import type { CallStatus } from '@/features/calls/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CallIcon from '@mui/icons-material/Call';
import MessageIcon from '@mui/icons-material/Message';
import ListIcon from '@mui/icons-material/List';

interface ConversationHeaderProps {
  contactName: string;
  initials: string;
  phoneNumber: string;
  status: CallStatus;
  avatarColorClass?: string;
}

const STATUS_VARIANTS: Record<string, 'inquiry' | 'warning' | 'success' | 'outline'> = {
  Inquiry: 'inquiry',
  Feedback: 'warning',
  Request: 'success',
  Approval: 'success',
  Review: 'warning',
};

const getStatusVariant = (status: CallStatus) => STATUS_VARIANTS[status] || 'outline';

export function ConversationHeader({ 
  contactName, 
  initials, 
  phoneNumber, 
  status, 
  avatarColorClass 
}: ConversationHeaderProps) {
  return (
    <div className="border-b border-neutral-100 bg-background">
      <div className="flex items-start justify-between p-4">
        <div className="flex items-start space-x-4">
          <Avatar 
            fallback={initials} 
            size="lg" 
            className={avatarColorClass || "bg-blue-500 text-white"} 
          />
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium text-neutral-900">{contactName}</h2>
              <ExpandMoreIcon sx={{ width: 14, height: 14 }} className="text-neutral-400 mt-1" />
            </div>
            <p className="text-[13px] text-neutral-500">{phoneNumber}</p>
            <div className="pt-1">
              <Chip variant={getStatusVariant(status)} className="scale-90 origin-left">
                {status}
              </Chip>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-info-500 hover:text-info-600 hover:bg-info-50">
            <CallIcon sx={{ width: 22, height: 22 }} />
          </Button>
          <Button variant="ghost" size="icon" className="text-info-500 hover:text-info-600 hover:bg-info-50">
            <MessageIcon sx={{ width: 22, height: 22 }} />
          </Button>
        </div>
      </div>

      {/* Meta context as normal text below */}
      <div className="px-5 py-3 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-600 bg-white">
        <div className="flex items-start space-x-3">
          <CallIcon sx={{ width: 20, height: 20 }} className="mt-0.5 text-neutral-800" />
          <div>
            <p className="font-medium text-[14px] text-neutral-900 mb-0.5">Incoming {phoneNumber}</p>
            <p className="text-[12px] text-neutral-500">Lasted 12 min 24 sec &bull; Today &bull; Answered by Elias Thorne</p>
          </div>
        </div>
        <button className="text-neutral-400 hover:text-neutral-600">
          <ListIcon sx={{ width: 18, height: 18 }} />
        </button>
      </div>
    </div>
  );
}
