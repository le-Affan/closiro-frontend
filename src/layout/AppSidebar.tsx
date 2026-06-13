import React from 'react';
import { cn } from '@/lib/utils';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import InboxIcon from '@mui/icons-material/Inbox';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CallIcon from '@mui/icons-material/Call';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ContactsIcon from '@mui/icons-material/Contacts';
import CallMergeIcon from '@mui/icons-material/CallMerge';

export function AppSidebar() {
  const icons = [
    { id: 'logo', icon: <RingVolumeIcon sx={{ width: 28, height: 28 }} />, bg: 'bg-white text-[#54BEB3] rounded-xl p-2 shadow-sm' },
    { id: 'inbox', icon: <InboxIcon sx={{ width: 26, height: 26 }} />, isSpacer: true },
    { id: 'phone',      icon: <CallIcon sx={{ width: 26, height: 26 }} />, active: true },
    { id: 'headphones', icon: <HeadphonesIcon sx={{ width: 26, height: 26 }} /> },
    { id: 'users',      icon: <ContactsIcon sx={{ width: 26, height: 26 }} /> },
    { id: 'activity',   icon: <CallMergeIcon sx={{ width: 26, height: 26 }} /> },
    { id: 'layout',     icon: <SpaceDashboardIcon sx={{ width: 26, height: 26 }} /> },
  ];

  return (
    <div className="w-[64px] bg-gradient-to-b from-[#54BEB3] to-[#99DFAB] h-screen shrink-0 flex flex-col items-center py-4 space-y-2">
      {icons.map((item, idx) => (
        <React.Fragment key={item.id}>
          {item.isSpacer && <div className="h-4" />}
          <button 
            className={cn(
              "p-2.5 rounded-full transition-all flex items-center justify-center",
              item.bg ? item.bg : item.active ? "bg-white text-[#54BEB3] shadow-sm" : "text-neutral-900 hover:bg-white/30 hover:text-black",
            )}
          >
            {item.icon}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
