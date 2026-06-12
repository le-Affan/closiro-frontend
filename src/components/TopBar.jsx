const TopBar = () => (
  <div className="h-[54px] flex items-center justify-between px-6 border-b border-[#f1f1f1] shrink-0">
    <div className="flex items-center gap-2 text-[13px] text-[#737373]">
      <span>Calls</span>
      <span className="text-[#bebebe]">/</span>
      <span className="text-[#585858] font-medium">Information</span>
    </div>
    <div className="flex items-center gap-2 bg-[#fafafa] border border-[#eaeaea] rounded-full px-4 py-1.5 w-80">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#bebebe" strokeWidth="2" />
        <path d="M21 21l-4-4" stroke="#bebebe" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[12px] text-[#bebebe]">Search</span>
    </div>
    <div className="flex items-center gap-3">
      <button className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-1.5">
        Export
      </button>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#bebebe" strokeWidth="2" />
      </svg>
    </div>
  </div>
);

export default TopBar;
