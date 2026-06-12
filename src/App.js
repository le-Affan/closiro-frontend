import { useState, useRef, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from 'recharts';

// ---------- mock data ----------
const trendData = [
  { month: 'Jan', connected: 70, followups: 20, missed: 30, calls: 40 },
  { month: 'Feb', connected: 65, followups: 25, missed: 35, calls: 45 },
  { month: 'Mar', connected: 75, followups: 20, missed: 40, calls: 50 },
  { month: 'Apr', connected: 80, followups: 25, missed: 45, calls: 60 },
  { month: 'May', connected: 70, followups: 30, missed: 60, calls: 70 },
  { month: 'Jun', connected: 75, followups: 25, missed: 55, calls: 90 },
  { month: 'Jul', connected: 85, followups: 30, missed: 50, calls: 110 },
  { month: 'Aug', connected: 80, followups: 35, missed: 45, calls: 90 },
  { month: 'Sep', connected: 90, followups: 30, missed: 40, calls: 70 },
  { month: 'Oct', connected: 85, followups: 35, missed: 35, calls: 95 },
  { month: 'Nov', connected: 95, followups: 30, missed: 30, calls: 110 },
  { month: 'Dec', connected: 100, followups: 25, missed: 30, calls: 100 },
];

const leadSourceData = [
  { name: 'Inbound', value: 45 },
  { name: 'Outbound', value: 30 },
  { name: 'Referral', value: 10 },
  { name: 'Discounts', value: 50 },
  { name: 'Meta Ads', value: 10 },
  { name: 'Emails', value: 45 },
  { name: 'Social Media', value: 30 },
];

const repData = [
  { name: 'Isabella Wilson', score: 80, color: '#3ca30f' },
  { name: 'Ava Chen', score: 80, color: '#3ca30f' },
  { name: 'Liam Johnson', score: 73, color: '#3ca30f' },
  { name: 'Sofia Martinez', score: 70, color: '#3ca30f' },
  { name: 'Ethan Garcia', score: 68, color: '#f1a013' },
  { name: 'Mia Rodriguez', score: 63, color: '#f1a013' },
  { name: 'Noah Lee', score: 40, color: '#f1a013' },
  { name: 'Olivia Brown', score: 20, color: '#de3226' },
];

const pipelineData = [
  { name: 'New', value: 20 },
  { name: 'Discovery', value: 18 },
  { name: 'Proposal', value: 14 },
  { name: 'Negotiation', value: 7 },
  { name: 'Won', value: 7 },
];

const monthlyRevenueData = [
  { name: 'rev', a: 5000, b: 3000, c: 2000 },
];

const kpis = [
  { label: 'Total Calls', value: '1209', color: '#2477e8' },
  { label: 'Connected Calls', value: '842', color: '#3ca30f' },
  { label: 'Missed Calls', value: '198', color: '#de3226' },
  { label: 'Follow-ups', value: '78', color: '#f1a013' },
  { label: 'Conversion Signal', value: '24', color: '#62a5a2' },
];

// ---------- profile-scoped mock data (Sales Agent) ----------
const agentStats = [
  { label: 'Calls Today', display: '21 / 25', pct: 84 },
  { label: 'Conversion Rate', display: '14% / 18%', pct: 78 },
  { label: 'Pipeline Deals', display: '4', pct: 40 },
  { label: 'Rank', display: '#2 of 8', pct: 88 },
];

const personalTargets = [
  { label: 'Calls/Day', current: '21', target: '25', pct: 84 },
  { label: 'Conversion Rate', current: '14%', target: '18%', pct: 78 },
  { label: 'Monthly Revenue', current: '5K', target: '8K', pct: 63 },
];

const myPipelineData = [
  { name: 'New', value: 3 },
  { name: 'Discovery', value: 2 },
  { name: 'Proposal', value: 2 },
  { name: 'Negotiation', value: 1 },
  { name: 'Won', value: 1 },
];

// ---------- profile-scoped mock data (Admin/Founder) ----------
const adminKpis = [
  { label: 'Total Calls', value: '1209', color: '#2477e8' },
  { label: 'Connected Calls', value: '842', color: '#3ca30f' },
  { label: 'Revenue This Month', value: '62K', color: '#62a5a2' },
  { label: 'AI Projected Revenue', value: '82K', color: '#f1a013' },
  { label: 'Conversion Signal', value: '24', color: '#62a5a2' },
];

const repPerformanceTable = [
  { name: 'Isabella Wilson', score: 80, calls: 142, conversion: '32%' },
  { name: 'Ava Chen', score: 80, calls: 138, conversion: '31%' },
  { name: 'Liam Johnson', score: 73, calls: 120, conversion: '28%' },
  { name: 'Sofia Martinez', score: 70, calls: 115, conversion: '27%' },
  { name: 'Ethan Garcia', score: 68, calls: 108, conversion: '24%' },
  { name: 'Mia Rodriguez', score: 63, calls: 99, conversion: '22%' },
  { name: 'Noah Lee', score: 40, calls: 75, conversion: '15%' },
  { name: 'Olivia Brown', score: 20, calls: 54, conversion: '9%' },
];

// ---------- small UI helpers ----------
const DownArrow = ({ color }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M5 1V9M5 9L1.5 5.5M5 9L8.5 5.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="3" r="1.3" fill="#949494" />
    <circle cx="8" cy="8" r="1.3" fill="#949494" />
    <circle cx="8" cy="13" r="1.3" fill="#949494" />
  </svg>
);

const CardHeader = ({ title }) => (
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

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-5 ${className}`}>
    {children}
  </div>
);

// ---------- Sparkle icon (AI Potential) ----------
const Sparkle = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f1a013">
    <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
  </svg>
);

// ---------- Sales Agent visualisation helpers ----------
const RadialGauge = ({ pct, display, label, size = 88 }) => (
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

const AnimatedProgressBar = ({ label, current, target, pct }) => {
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

const FUNNEL_WIDTHS = ['100%', '82%', '64%', '46%', '30%'];

const PipelineFunnel = ({ data }) => (
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
const scoreBadgeClass = (score) => {
  if (score >= 70) return 'bg-[#eaf7e9] text-[#3ca30f]';
  if (score >= 50) return 'bg-[#fdf3e0] text-[#f1a013]';
  return 'bg-[#fbe7e5] text-[#de3226]';
};

const PerformersTable = ({ data }) => (
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

// ---------- profile switcher (self-contained, delete this block to remove) ----------
const ProfileSwitcher = ({ selectedProfile, setSelectedProfile }) => (
  <div className="fixed top-3 right-3" style={{ zIndex: 9999 }}>
    <select
      value={selectedProfile}
      onChange={(e) => setSelectedProfile(e.target.value)}
      className="bg-white border border-[#e0e0e0] rounded-lg text-[12px] text-[#585858] px-3 py-1.5 shadow-sm"
    >
      <option value="Sales Agent">Sales Agent</option>
      <option value="Sales Manager">Sales Manager</option>
      <option value="Admin/Founder">Admin/Founder</option>
    </select>
  </div>
);

// ---------- interactive action-bar buttons (self-contained) ----------
const GenerateReportButton = () => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / 2000) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#7ed3cf] text-white text-[12px] font-medium rounded-lg px-4 py-2"
      >
        Generate report
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9998]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-[14px] font-semibold text-[#585858] mb-3">Report Generated</h3>
            <div className="h-2 bg-[#f1f1f1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7ed3cf] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress >= 100 ? (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[12px] text-[#585858]">Ready to download</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-1.5"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="mt-4 text-[12px] text-[#949494]">Generating...</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const SearchActionButton = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  if (open) {
    return (
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        onBlur={() => setOpen(false)}
        className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-2 outline-none w-32"
      />
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-2"
    >
      Search
    </button>
  );
};

const FILTER_OPTIONS = ['Connected Calls', 'Missed Calls', 'Follow-ups', 'Lead Source'];

const FiltersActionButton = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-2"
      >
        Filters
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-3 flex flex-col gap-2 z-50 w-44">
          {FILTER_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-[12px] text-[#585858] cursor-pointer">
              <input
                type="checkbox"
                checked={!!checked[opt]}
                onChange={() => setChecked((c) => ({ ...c, [opt]: !c[opt] }))}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const PERIOD_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last Quarter', 'This Year'];

const PeriodActionButton = () => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('Period');
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-2"
      >
        {label}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-1 flex flex-col z-50 w-36">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setLabel(opt);
                setOpen(false);
              }}
              className="text-left text-[12px] text-[#585858] px-2 py-1.5 rounded hover:bg-[#fafafa]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ADD_WIDGET_OPTIONS = ['New KPI Card', 'New Chart', 'Export CSV'];

const AddWidgetActionButton = () => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleSelect = () => {
    setOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-2"
      >
        + Add widget
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-1 flex flex-col z-50 w-40">
          {ADD_WIDGET_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={handleSelect}
              className="text-left text-[12px] text-[#585858] px-2 py-1.5 rounded hover:bg-[#fafafa]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {toast && (
        <div className="absolute top-full left-0 mt-1 bg-[#585858] text-white text-[11px] rounded-lg px-3 py-1.5 z-50 whitespace-nowrap">
          Coming soon
        </div>
      )}
    </div>
  );
};

// ---------- sidebar icons ----------
const SidebarIcon = ({ d, active }) => (
  <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${active ? 'bg-[#dbf8f7]' : ''}`}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d={d} stroke={active ? '#4c807d' : '#ffffff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const ICONS = {
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z',
  headset: 'M4 14v-2a8 8 0 1116 0v2M4 14a2 2 0 002 2h1v-5H5a1 1 0 00-1 1zM20 14a2 2 0 01-2 2h-1v-5h1a1 1 0 011 1z',
  briefcase: 'M3 7h18v12H3zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  squares: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
};

const NAV2_ITEMS = [
  { label: 'Live', icon: ICONS.phone },
  { label: 'Data', icon: ICONS.squares },
  { label: 'Information', icon: ICONS.briefcase, active: true },
  { label: 'Insights', icon: ICONS.users },
];

// ---------- Sales Agent view ----------
const AgentView = () => (
  <>
    {/* My Stats */}
    <Card>
      <CardHeader title="My Stats" />
      <div className="flex items-center justify-around">
        {agentStats.map((s) => (
          <RadialGauge key={s.label} pct={s.pct} display={s.display} label={s.label} />
        ))}
      </div>
    </Card>

    {/* Personal Targets */}
    <Card>
      <CardHeader title="Personal Targets" />
      <div className="flex flex-col gap-4">
        {personalTargets.map((t) => (
          <AnimatedProgressBar key={t.label} label={t.label} current={t.current} target={t.target} pct={t.pct} />
        ))}
      </div>
    </Card>

    {/* My Pipeline */}
    <Card>
      <CardHeader title="My Pipeline" />
      <PipelineFunnel data={myPipelineData} />
      <div className="mt-2 text-center text-[12px] font-semibold text-[#3ca30f]">12% Conversion to Won</div>
    </Card>

    {/* My Performance */}
    <Card>
      <CardHeader title="My Performance" />
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="relative" style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={[{ value: 80 }]} startAngle={90} endAngle={-270} innerRadius="75%" outerRadius="100%" barSize={14}>
              <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
              <RadialBar dataKey="value" cornerRadius={10} fill="#7ed3cf" background={{ fill: '#f1f1f1' }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[28px] font-semibold text-[#585858]">80%</span>
            <span className="text-[12px] text-[#949494]">Team Rank #2</span>
          </div>
        </div>
        <span className="text-[13px] font-medium text-[#585858]">Ava Chen</span>
      </div>
    </Card>
  </>
);

// ---------- Sales Manager view ----------
const ManagerView = () => (
  <>
    {/* Call Activity Trend */}
    <Card>
      <CardHeader title="Call Activity Trend" />
      <div className="flex items-center gap-8 mb-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="flex items-center gap-2">
            <DownArrow color={kpi.color} />
            <div>
              <div className="text-[11px] text-[#949494]">{kpi.label}</div>
              <div className="text-[15px] font-semibold text-[#585858]">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#fafafa] rounded-lg p-2" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
            <YAxis domain={[0, 300]} ticks={[0, 100, 200, 300]} axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="connected" stackId="1" stroke="#80cc60" fill="#80cc60" fillOpacity={0.7} />
            <Area type="monotone" dataKey="followups" stackId="1" stroke="#f1a013" fill="#f9d392" fillOpacity={0.7} />
            <Area type="monotone" dataKey="missed" stackId="1" stroke="#de3226" fill="#de3226" fillOpacity={0.5} />
            <Area type="monotone" dataKey="calls" stackId="1" stroke="#2477e8" fill="#2477e8" fillOpacity={0.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>

    {/* Rep Performance Score */}
    <Card>
      <CardHeader title="Rep Performance Score" />
      <div className="flex flex-col gap-2.5">
        {repData.map((rep) => (
          <div key={rep.name} className="flex items-center gap-3">
            <span className="text-[11px] text-[#737373] w-28 shrink-0">{rep.name}</span>
            <div className="flex-1 h-1.5 bg-[#f1f1f1] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${rep.score}%`, backgroundColor: rep.color }} />
            </div>
            <span className="text-[11px] text-[#949494] w-8 text-right">{rep.score}%</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6 mt-4 text-[11px] text-[#737373]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#3ca30f]" /> GOOD <span className="font-semibold text-[#585858]">70%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f1a013]" /> AVERAGE <span className="font-semibold text-[#585858]">25%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#de3226]" /> BAD <span className="font-semibold text-[#585858]">5%</span>
        </div>
      </div>
      <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858]">
        <span>Improve 30% + lift in calls to conversion</span>
        <span className="font-semibold cursor-pointer">Check how</span>
      </div>
    </Card>

    {/* Conversion Rate by Lead Source */}
    <Card>
      <CardHeader title="Conversion Rate by Lead Source" />
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={leadSourceData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" horizontal={false} />
            <XAxis type="number" domain={[0, 40]} ticks={[0, 10, 20, 30, 40]}
              axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }}
              tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} width={90} />
            <Bar dataKey="value" fill="#7ed3cf" barSize={14} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </>
);

// ---------- Admin/Founder view ----------
const AdminView = () => (
  <>
    {/* KPI pills */}
    <Card>
      <div className="flex items-center gap-8">
        {adminKpis.map((kpi) => (
          <div key={kpi.label} className="flex items-center gap-2">
            <DownArrow color={kpi.color} />
            <div>
              <div className="text-[11px] text-[#949494]">{kpi.label}</div>
              <div className="text-[15px] font-semibold text-[#585858]">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>

    <div className="grid grid-cols-2 gap-5">
      {/* Annual Revenue Target */}
      <Card>
        <CardHeader title="Annual Revenue Target" />
        <div style={{ height: 180 }} className="relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: 62 }, { value: 38 }]}
                dataKey="value"
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={75}
                outerRadius={110}
                stroke="none"
              >
                <Cell fill="#62a5a2" />
                <Cell fill="#dbf2f0" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute bottom-1 left-0 right-0 flex justify-between px-4 text-[10px] text-[#949494]">
            <span>0</span>
            <span>10K</span>
            <span>20K</span>
            <span>40K</span>
            <span>60K</span>
            <span>80K</span>
          </div>
        </div>
        <div className="flex justify-between mt-4 px-2">
          <div>
            <div className="text-[10px] text-[#949494]">CURRENT</div>
            <div className="text-[15px] font-semibold text-[#585858]">62K</div>
          </div>
          <div>
            <div className="text-[10px] text-[#949494]">TARGET</div>
            <div className="text-[15px] font-semibold text-[#585858]">100K</div>
          </div>
          <div>
            <div className="text-[10px] text-[#949494] flex items-center gap-1">
              <Sparkle />AI POTENTIAL
            </div>
            <div className="text-[15px] font-semibold text-[#585858]">150K</div>
          </div>
        </div>
        <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858]">
          <span>Improve 30% + lift in calls to conversion</span>
          <span className="font-semibold cursor-pointer">Check how</span>
        </div>
      </Card>

      {/* Monthly Revenue Target */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[13px] font-semibold text-[#585858]">Monthly Revenue Target</h3>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#bebebe" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[11px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-1.5">
              Check how to improve
            </button>
            <DotsIcon />
          </div>
        </div>
        <div style={{ height: 60 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenueData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" horizontal={false} />
              <XAxis type="number" domain={[0, 12000]} ticks={[0, 2000, 4000, 6000, 8000, 10000]}
                axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }}
                tickFormatter={(v) => v === 0 ? '0' : `${v / 1000}K`} />
              <YAxis type="category" dataKey="name" hide />
              <Bar dataKey="a" stackId="r" fill="#3ca30f" barSize={32} radius={[4, 0, 0, 4]} />
              <Bar dataKey="b" stackId="r" fill="#80cc60" barSize={32} />
              <Bar dataKey="c" stackId="r" fill="#cdeec1" barSize={32} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-8 px-2">
          <div>
            <div className="text-[10px] text-[#949494]">CURRENT</div>
            <div className="text-[15px] font-semibold text-[#585858]">5K</div>
          </div>
          <div>
            <div className="text-[10px] text-[#949494]">TARGET</div>
            <div className="text-[15px] font-semibold text-[#585858]">10K</div>
          </div>
          <div>
            <div className="text-[10px] text-[#949494] flex items-center gap-1">
              <Sparkle />AI POTENTIAL
            </div>
            <div className="text-[15px] font-semibold text-[#585858]">12K</div>
          </div>
        </div>
      </Card>
    </div>

    {/* Pipeline Conversation */}
    <Card>
      <CardHeader title="Pipeline conversation" />
      <div className="mb-3">
        <span className="bg-[#eaf7e9] text-[#3ca30f] text-[11px] font-medium rounded-full px-3 py-1">
          AI projects 28% conversion by Q3
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex-1" style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} />
              <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
              <Bar dataKey="value" fill="#7ed3cf" barSize={48} radius={[4, 4, 0, 0]}>
                {pipelineData.map((entry, i) => (
                  <Cell key={i} fill={entry.name === 'Won' ? '#3ca30f' : '#7ed3cf'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center gap-2 pl-6 w-32 shrink-0">
          <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
            <path d="M10 2V36M10 36L3 29M10 36L17 29" stroke="#3ca30f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[12px] font-semibold text-[#3ca30f] text-center">20% Conversion to Won</span>
        </div>
      </div>
    </Card>

    {/* Top Performers */}
    <Card>
      <CardHeader title="Top Performers" />
      <PerformersTable data={repPerformanceTable} />
    </Card>
  </>
);

function App() {
  const [selectedProfile, setSelectedProfile] = useState('Sales Manager');
  const isAgent = selectedProfile === 'Sales Agent';
  const isAdmin = selectedProfile === 'Admin/Founder';
  const isManager = selectedProfile === 'Sales Manager';

  return (
    <div className="w-[1440px] overflow-x-hidden flex tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
      <ProfileSwitcher selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
      {/* Sidebar 1 */}
      <div
        className="w-14 flex flex-col items-center py-4 gap-3 shrink-0"
        style={{ background: 'linear-gradient(167deg, rgb(126,211,207) 6.5%, rgb(161,226,179) 111%)' }}
      >
        <SidebarIcon d={ICONS.grid} />
        <SidebarIcon d={ICONS.phone} active />
        <SidebarIcon d={ICONS.headset} />
        <SidebarIcon d={ICONS.briefcase} />
        <SidebarIcon d={ICONS.users} />
        <SidebarIcon d={ICONS.squares} />
      </div>

      {/* Sidebar 2 */}
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

      {/* Main content */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Top nav */}
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

        {/* Page content */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto">
          {/* Header */}
          <div>
            <h1 className="text-[20px] font-semibold text-[#585858]">Information</h1>
            <p className="text-[13px] text-[#737373] mt-1">
              Clear performance summaries to understand call activity, outcomes, and trends at a glance.
            </p>
            {isAgent && (
              <p className="text-[12px] text-[#949494] mt-1">Agent: Ava Chen</p>
            )}
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-2">
            <GenerateReportButton />
            <SearchActionButton />
            <FiltersActionButton />
            <PeriodActionButton />
            <AddWidgetActionButton />
          </div>

          {isAgent && <AgentView />}
          {isManager && <ManagerView />}
          {isAdmin && <AdminView />}
        </div>
      </div>
    </div>
  );
}

export default App;
