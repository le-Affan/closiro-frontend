import React from 'react';
import { Button } from '@/components/ui/button';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export function TopNavbar() {
  return (
    <div className="h-[64px] border-b border-neutral-200 bg-white flex items-center justify-between px-6 shrink-0">
      
      {/* Left side: Breadcrumbs / Sidebar toggle */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-neutral-600 mr-2 shrink-0">
          <FirstPageIcon sx={{ width: 20, height: 20 }} />
        </Button>
        <span className="font-semibold text-[15px] text-neutral-600">Calls</span>
        <ChevronRightIcon sx={{ width: 16, height: 16 }} className="mx-3 text-neutral-400" />
        <ChevronRightIcon sx={{ width: 20, height: 20 }} className="mx-3 text-neutral-400" />
        <span className="font-semibold text-[15px] text-neutral-900">Live</span>
      </div>

      {/* Center: Search and Quick Actions */}
      <div className="flex items-center space-x-3 flex-1 justify-center max-w-2xl px-8">
        <div className="relative w-full max-w-[440px]">
          <SearchIcon sx={{ width: 20, height: 20 }} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full h-[34px] pl-9 pr-4 rounded-full border border-neutral-300 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 placeholder:text-neutral-400"
          />
        </div>
        
        <div className="flex items-center space-x-2 pl-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors">
            <AddIcon sx={{ width: 20, height: 20 }} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors">
            <AutoFixNormalIcon sx={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>

      {/* Right side: Global Actions & Profile */}
      <div className="flex items-center space-x-2.5">
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors">
          <QuestionMarkIcon sx={{ width: 20, height: 20 }} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors">
          <NotificationsOutlinedIcon sx={{ width: 20, height: 20 }} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors overflow-hidden">
          <AccountCircleOutlinedIcon sx={{ width: 20, height: 20 }} />
        </button>
      </div>

    </div>
  );
}
