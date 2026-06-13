import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CallCard } from './CallCard';
import type { Call } from '../types';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Dummy data representing fetched calls
const DUMMY_CALLS: Call[] = [
  { id: '1', contactName: 'Andrew Smith',   initials: 'AS', status: 'Inquiry',  time: '05:10 PM', dateStr: 'Yesterday', isIncoming: true,  avatarColorClass: 'bg-[#74A9FF] text-black' },
  { id: '2', contactName: 'Beatrice Jones', initials: 'BS', status: 'Feedback', time: '09:15 AM', dateStr: 'Today',     isIncoming: true,  avatarColorClass: 'bg-[#B4DFAD] text-black' },
  { id: '3', contactName: 'Charles Brown',  initials: 'CS', status: 'Request',  time: '02:30 PM', dateStr: 'Last Week', isIncoming: false, avatarColorClass: 'bg-[#8AE7DF] text-black' },
  { id: '4', contactName: 'Susan Taylor',   initials: 'HR', status: 'Approval', time: '11:00 AM', dateStr: 'Today',     isIncoming: true,  avatarColorClass: 'bg-[#559DFA] text-black' },
  { id: '5', contactName: 'Michael Smith',  initials: 'IT', status: 'Feedback', time: '09:15 AM', dateStr: 'Yesterday', isIncoming: false, avatarColorClass: 'bg-[#FA7B6C] text-black' },
  { id: '6', contactName: 'Jessica Lee',    initials: 'FN', status: 'Review',   time: '01:45 PM', dateStr: 'Yesterday', isIncoming: true,  avatarColorClass: 'bg-[#F2D1B3] text-black' },
];

export function CallsList() {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = DUMMY_CALLS.filter(c => 
    c.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-[320px] bg-background border-r border-neutral-200 h-full shrink-0">
      
      {/* Header Area */}
      <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
        <h2 className="text-[22px] font-semibold text-neutral-900">Calls</h2>
        <div className="flex space-x-3 text-neutral-500">
          <button className="hover:text-neutral-900">
            <SearchIcon sx={{ width: 24, height: 24 }} />
          </button>
          <button className="hover:text-neutral-900">
            <FilterListIcon sx={{ width: 24, height: 24 }} />
          </button>
        </div>
      </div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto">
        {filteredCalls.map(call => (
          <CallCard 
            key={call.id} 
            call={call} 
            isSelected={selectedId === call.id} 
            onClick={() => setSelectedId(call.id)} 
          />
        ))}
      </div>
      
    </div>
  );
}
