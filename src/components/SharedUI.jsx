import { useState, useEffect } from 'react';
import {
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';

// ---------- small UI helpers ----------
export const DownArrow = ({ color }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M5 1V9M5 9L1.5 5.5M5 9L8.5 5.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="3" r="1.3" fill="#949494" />
    <circle cx="8" cy="8" r="1.3" fill="#949494" />
    <circle cx="8" cy="13" r="1.3" fill="#949494" />
  </svg>
);

export const CardHeader = ({ title }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-1.5">
      <h3 className="text-[13px] font-semibold text-[#585858]">{title}</h3>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="#bebebe" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <DotsIcon />
  </div>
);

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-5 ${className}`}>
    {children}
  </div>
);

// ---------- Sparkle icon (AI Potential) ----------
export const Sparkle = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f1a013">
    <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
  </svg>
);

// ---------- Sales Agent visualisation helpers ----------
export const RadialGauge = ({ pct, display, label, size = 88 }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart data={[{ value: pct }]} startAngle={90} endAngle={-270} innerRadius="75%" outerRadius="100%" barSize={8}>
          <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
          <RadialBar dataKey="value" cornerRadius={8} fill="#7ed3cf" background={{ fill: '#f1f1f1' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-[#585858] text-center px-1">
        {display}
      </div>
    </div>
    <span className="text-[11px] text-[#949494]">{label}</span>
  </div>
);

export const AnimatedProgressBar = ({ label, current, target, pct }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div className="flex items-center gap-4">
      <span className="text-[12px] text-[#585858] w-36 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[#f1f1f1] rounded-full overflow-hidden">
        <div className="h-full bg-[#7ed3cf] rounded-full transition-all duration-1000" style={{ width: `${width}%` }} />
      </div>
      <span className="text-[12px] text-[#949494] w-24 text-right shrink-0">{current} / {target}</span>
    </div>
  );
};

export const FUNNEL_WIDTHS = ['100%', '82%', '64%', '46%', '30%'];

export const PipelineFunnel = ({ data }) => (
  <div className="flex flex-col items-center gap-2 py-2">
    {data.map((stage, i) => (
      <div
        key={stage.name}
        className="bg-[#7ed3cf] text-white text-[12px] font-medium rounded-md flex items-center justify-center py-3"
        style={{ width: FUNNEL_WIDTHS[i] }}
      >
        {stage.name} — {stage.value}
      </div>
    ))}
  </div>
);

// ---------- Admin/Founder visualisation helpers ----------
export const scoreBadgeClass = (score) => {
  if (score >= 70) return 'bg-[#eaf7e9] text-[#3ca30f]';
  if (score >= 50) return 'bg-[#fdf3e0] text-[#f1a013]';
  return 'bg-[#fbe7e5] text-[#de3226]';
};

export const PerformersTable = ({ data }) => (
  <table className="w-full text-[12px] border-collapse">
    <thead>
      <tr className="text-left text-[#949494]">
        <th className="py-2 px-3 font-medium border-b border-[#e0e0e0]">Name</th>
        <th className="py-2 px-3 font-medium border-b border-[#e0e0e0]">Score</th>
        <th className="py-2 px-3 font-medium border-b border-[#e0e0e0]">Calls</th>
        <th className="py-2 px-3 font-medium border-b border-[#e0e0e0]">Conversion</th>
      </tr>
    </thead>
    <tbody>
      {data.map((rep, i) => (
        <tr key={rep.name} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
          <td className="py-2 px-3 text-[#585858] border-b border-[#e0e0e0]">{rep.name}</td>
          <td className="py-2 px-3 border-b border-[#e0e0e0]">
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${scoreBadgeClass(rep.score)}`}>{rep.score}%</span>
          </td>
          <td className="py-2 px-3 text-[#585858] border-b border-[#e0e0e0]">{rep.calls}</td>
          <td className="py-2 px-3 text-[#585858] border-b border-[#e0e0e0]">{rep.conversion}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// ---------- sidebar icon ----------
export const SidebarIcon = ({ d, active }) => (
  <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${active ? 'bg-[#dbf8f7]' : ''}`}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d={d} stroke={active ? '#4c807d' : '#ffffff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);
