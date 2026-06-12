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
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium cursor-pointer ${
          item.active ? 'bg-[#dbf8f7] text-[#4c807d]' : 'text-[#585858] hover:bg-gray-50'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d={item.icon} stroke={item.active ? '#4c807d' : '#737373'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {item.label}
      </div>
    ))}
  </div>
);

export default SecondSidebar;
