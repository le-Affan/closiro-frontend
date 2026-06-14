import React from 'react';

interface SecondaryMetricCardProps {
  title: string;
  value: string;
  trendUp: boolean;
}

const UpArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function SecondaryMetricCard({ title, value, trendUp }: SecondaryMetricCardProps) {
  return (
    <div className="flex-1 min-w-0 bg-white rounded-[10px] border border-[#e5e5e5] p-3.5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#585858] font-medium">{title}</span>
        {trendUp ? <UpArrow /> : <DownArrow />}
      </div>
      <span className="text-[15px] font-medium text-black tracking-tight">{value}</span>
    </div>
  );
}
