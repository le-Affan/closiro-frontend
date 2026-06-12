import { ICONS } from './icons';

const NAV2_ITEMS = [
  { label: 'Live', icon: ICONS.phone },
  { label: 'Data', icon: ICONS.squares },
  { label: 'Information', icon: ICONS.briefcase, active: true },
  { label: 'Insights', icon: ICONS.users },
];

const SecondSidebar = () => (
  <div className="w-56 bg-white flex flex-col py-4 px-3 gap-1 shrink-0 border-r border-[#f1f1f1]">
    {NAV2_ITEMS.map((item) => (
      <div
        key={item.label}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium cursor-pointer border-l-[3px] transition-colors duration-150 ${
          item.active ? 'bg-[#f0fafb] text-[#4c807d] font-semibold border-l-[#5bc4bf]' : 'text-[#737373] hover:bg-[#f8f8f8] border-l-transparent'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d={item.icon} stroke={item.active ? '#4c807d' : '#737373'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {item.label}
      </div>
    ))}
  </div>
);

export default SecondSidebar;
