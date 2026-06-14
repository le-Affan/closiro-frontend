import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const COLUMNS = [
  { id: 'name', label: 'Name', checked: true },
  { id: 'phone', label: 'Phone', checked: true },
  { id: 'status', label: 'Status', checked: true },
  { id: 'opendeals', label: 'Open deals', checked: true },
  { id: 'assignto', label: 'Assign to', checked: true },
  { id: 'time', label: 'Time', checked: false },
];

export function CustomisePopover() {
  return (
    <div className="absolute top-full right-50 mt-2 bg-white rounded-lg shadow-[0_4px_24px_rgb(0,0,0,0.12)] border border-[#E5E7EB] z-50 w-[340px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-black">Customise columns</h3>
          <button className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center justify-center p-0 bg-transparent border-none outline-none">
            <AddIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
        <div className="relative">
          <SearchIcon sx={{ fontSize: 20 }} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full h-[46px] border border-[#D9D9D9] rounded-[6px] pl-10 pr-4 text-[14px] text-neutral-900 placeholder:text-[#9ca3af] outline-none focus:border-[#62a5a2] transition-colors"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#F1F1F1]"></div>

      <div className="flex flex-col px-6 pt-5 pb-6 gap-[18px] max-h-[340px] overflow-y-auto">
        {COLUMNS.map(col => (
          <label key={col.id} className="flex items-center gap-4 cursor-pointer group">
            <div className="relative flex items-center justify-center w-[18px] h-[18px]">
              <input 
                type="checkbox" 
                defaultChecked={col.checked}
                className="peer appearance-none w-[18px] h-[18px] border-[2px] border-[#D9D9D9] rounded-[3px] checked:bg-[#3b82f6] checked:border-[#3b82f6] cursor-pointer outline-none transition-colors m-0 p-0"
              />
              <svg className="absolute w-[11px] h-[9px] text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none">
                <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[15px] font-medium text-black">{col.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
