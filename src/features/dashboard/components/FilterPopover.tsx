import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function FilterPopover() {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-[0_4px_24px_rgb(0,0,0,0.12)] border border-neutral-200 z-50 w-[640px] overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="px-6 pt-5 pb-6 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-4">
            <h3 className="text-[13px] font-semibold text-neutral-900">Advance Filters</h3>
            <div className="flex items-center gap-1.5 text-[#585858]">
              <span className="text-[12px]">Showing 12 of 3 contacts</span>
              <HelpOutlinedIcon sx={{ fontSize: 14 }} className="text-neutral-400" />
            </div>
          </div>
          <button className="text-[12px] text-[#ef4444] hover:text-red-600 transition-colors bg-transparent border-none outline-none">
            Clear all
          </button>
        </div>

        {/* AI Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative inline-flex items-center cursor-pointer">
            {/* Track */}
            <div className="w-8 h-4 bg-[#a7f3d0] rounded-full"></div>
            {/* Thumb */}
            <div className="absolute left-[14px] w-5 h-5 bg-[#6ee7b7] rounded-full shadow-sm transition-transform"></div>
          </div>
          <span className="text-[13px] text-[#585858]">Filter with AI</span>
        </div>

        {/* Filter Row */}
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-semibold text-[#585858] w-[46px]">Where</span>
          <div className="flex-1 flex gap-3">
            <input 
              type="text" 
              placeholder="Column" 
              className="flex-1 h-[38px] border border-[#E5E7EB] rounded-[6px] px-3 text-[13px] text-neutral-900 placeholder:text-[#9ca3af] outline-none focus:border-[#62a5a2]"
            />
            <input 
              type="text" 
              placeholder="Condition" 
              className="flex-1 h-[38px] border border-[#E5E7EB] rounded-[6px] px-3 text-[13px] text-neutral-900 placeholder:text-[#9ca3af] outline-none focus:border-[#62a5a2]"
            />
            <input 
              type="text" 
              placeholder="Value" 
              className="flex-1 h-[38px] border border-[#E5E7EB] rounded-[6px] px-3 text-[13px] text-neutral-900 placeholder:text-[#9ca3af] outline-none focus:border-[#62a5a2]"
            />
          </div>
          <button className="text-neutral-500 hover:text-neutral-800 bg-transparent border-none outline-none flex items-center justify-center p-1">
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>

        {/* Add Filter */}
        <div>
          <button className="text-[#3b82f6] text-[13px] font-medium hover:text-blue-700 transition-colors flex items-center gap-1 bg-transparent border-none outline-none p-0">
            <AddIcon sx={{ fontSize: 16 }} />
            New Filter
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#f0f0f0]"></div>

      {/* Footer AI Section */}
      <div className="bg-[#fafafa] px-6 py-5 flex flex-col gap-2">
        <div className="flex gap-3 h-[38px]">
          <input 
            type="text"
            placeholder="Show me all Contacts with Type is high priority"
            className="flex-1 h-full border border-[#a7f3d0] rounded-[6px] px-3 text-[13px] outline-none bg-white placeholder:text-[#9ca3af] focus:border-[#6ee7b7]"
          />
          <button 
            className="flex items-center justify-center gap-1.5 text-neutral-900 text-[13px] font-semibold px-4 h-full rounded-[6px] transition-opacity hover:opacity-90 shadow-sm outline-none whitespace-nowrap"
            style={{ 
              background: 'linear-gradient(92deg, #8ae8e4 -2.05%, #b1f8c5 104.42%)',
              border: '1px solid #8ae8e4'
            }}
          >
            <AutoFixHighIcon sx={{ fontSize: 16 }} className="text-neutral-800" />
            Generate Filter
            <KeyboardArrowDownIcon sx={{ fontSize: 16 }} className="text-neutral-800 ml-0.5" />
          </button>
        </div>
        <p className="text-[11px] text-[#9ca3af] mt-1">
          Create filters quickly using AI technology. <a href="#" className="text-[#9ca3af] underline hover:text-neutral-500">Learn more</a>
        </p>
      </div>
    </div>
  );
}
