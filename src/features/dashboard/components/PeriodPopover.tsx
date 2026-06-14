import React from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export function PeriodPopover() {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-[0_4px_24px_rgb(0,0,0,0.12)] border border-[#E5E7EB] z-50 w-[420px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col px-6 pt-5 pb-5 gap-4 border-b border-[#F1F1F1]">
        <label className="text-[12px] font-semibold text-[#585858] uppercase tracking-wider mb-1">Quick Select</label>
        
        <div className="flex flex-col gap-2">
          <button className="text-left px-3 py-2 rounded-md hover:bg-neutral-50 text-[14px] font-medium text-black transition-colors bg-transparent border-none outline-none">
            Last 7 days
          </button>
          <button className="text-left px-3 py-2 rounded-md bg-[#f0fdf4] text-[#059669] text-[14px] font-medium transition-colors border-none outline-none">
            Last 30 days
          </button>
          <button className="text-left px-3 py-2 rounded-md hover:bg-neutral-50 text-[14px] font-medium text-black transition-colors bg-transparent border-none outline-none">
            Last year
          </button>
        </div>
      </div>
      
      <div className="flex flex-col px-6 pt-5 pb-6 gap-4">
        <label className="text-[12px] font-semibold text-[#585858] uppercase tracking-wider">Custom Range</label>
        
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
            <input 
              type="date" 
              className="w-full h-[46px] border border-[#D9D9D9] rounded-[6px] pl-10 pr-3 text-[14px] text-neutral-900 outline-none focus:border-[#62a5a2] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer relative" 
            />
          </div>
          <span className="text-[#585858] text-[14px] font-medium">to</span>
          <div className="flex-1 relative">
            <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
            <input 
              type="date" 
              className="w-full h-[46px] border border-[#D9D9D9] rounded-[6px] pl-10 pr-3 text-[14px] text-neutral-900 outline-none focus:border-[#62a5a2] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer relative" 
            />
          </div>
        </div>

        <button className="mt-2 w-full flex items-center justify-center bg-[#62a5a2] hover:bg-[#4f8a87] text-white text-[14px] font-semibold h-[46px] rounded-[6px] transition-colors shadow-sm outline-none border-none">
          Apply Range
        </button>
      </div>
    </div>
  );
}
