import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';

export function SearchPopover() {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-[0_4px_24px_rgb(0,0,0,0.12)] border border-[#E5E7EB] z-50 w-[380px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="px-6 pt-5 pb-4">
        <div className="relative">
          <SearchIcon sx={{ fontSize: 20 }} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input 
            type="text" 
            placeholder="Search contacts, deals, or numbers..." 
            className="w-full h-[46px] border border-[#D9D9D9] rounded-[6px] pl-10 pr-4 text-[14px] text-neutral-900 placeholder:text-[#9ca3af] outline-none focus:border-[#62a5a2] transition-colors"
            autoFocus
          />
        </div>
      </div>
      <div className="h-px w-full bg-[#F1F1F1]"></div>
      <div className="flex flex-col px-6 pt-4 pb-6">
        <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">Recent Searches</p>
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-black hover:bg-neutral-50 rounded-md transition-colors text-left border-none outline-none bg-transparent">
            <HistoryIcon sx={{ fontSize: 18 }} className="text-[#9ca3af]" />
            Krati Surana
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-black hover:bg-neutral-50 rounded-md transition-colors text-left border-none outline-none bg-transparent">
            <HistoryIcon sx={{ fontSize: 18 }} className="text-[#9ca3af]" />
            +91 98765 43210
          </button>
        </div>
      </div>
    </div>
  );
}
