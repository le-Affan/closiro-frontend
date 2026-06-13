const TopBar = () => (
  <div className="h-[54px] flex items-center justify-between px-6 border-b border-[#f1f1f1] shrink-0">
    <div className="flex items-center gap-3 text-[13px] text-[#737373]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="#bebebe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Calls</span>
      <span className="text-[#bebebe]">/</span>
      <span className="text-[#585858] font-medium">Information</span>
    </div>
    <div className="flex items-center gap-2 bg-[#fafafa] border border-[#eaeaea] rounded-full px-4 py-1.5 w-80">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#bebebe" strokeWidth="2.5" />
        <path d="M21 21l-4-4" stroke="#bebebe" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="text-[12px] text-[#bebebe]">Search</span>
    </div>
    <div className="flex items-center gap-3">
      <button className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-sm px-4 py-2 hover:bg-[#ffffff] transition-colors duration-150">
        Export
      </button>
      <button className="p-1.5 rounded-full hover:bg-[#ffffff] transition-colors duration-150">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#bebebe" strokeWidth="2.5" />
          <path d="M12 8v4M12 16h.01" stroke="#bebebe" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
      <button className="p-1.5 rounded-full hover:bg-[#ffffff] transition-colors duration-150">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M18 8a6 6 0 00-12 0c0 4-1.5 5.5-1.5 5.5h15S18 12 18 8z" stroke="#bebebe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 17a1.5 1.5 0 003 0" stroke="#bebebe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="p-1.5 rounded-full hover:bg-[#ffffff] transition-colors duration-150">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#bebebe" strokeWidth="2.5" />
          <circle cx="12" cy="10" r="3" stroke="#bebebe" strokeWidth="2.5" />
          <path d="M6 19c1-2.5 3.5-4 6-4s5 1.5 6 4" stroke="#bebebe" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </div>
);

export default TopBar;
