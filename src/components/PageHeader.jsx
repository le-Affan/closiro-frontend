import { useState, useRef, useEffect } from 'react';
import { DownArrow } from './SharedUI';

const PROFILE_CARDS = {
  'Sales Agent': ['My Stats', 'Personal Targets', 'My Pipeline', 'My Performance'],
  'Sales Manager': ['Call Activity Trend', 'Rep Performance Score', 'Conversion Rate by Lead Source'],
  'Admin/Founder': ['Annual Revenue Target', 'Monthly Revenue Target', 'Pipeline Conversation', 'Top Performers'],
};

const KEY_METRICS = [
  { label: 'Total Calls', value: '1209', trend: 'up' },
  { label: 'Connected Calls', value: '842', trend: 'up' },
  { label: 'Missed Calls', value: '198', trend: 'down' },
  { label: 'Follow-ups', value: '78', trend: 'up' },
];

// ---------- interactive action-bar buttons (self-contained) ----------
const GenerateReportButton = ({ selectedProfile }) => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(false);

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

  const handleDownload = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const cards = PROFILE_CARDS[selectedProfile] || [];
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#5bc4bf] hover:bg-[#4aada8] text-white text-[12px] font-medium rounded-sm px-4 py-2 flex items-center gap-2 transition-colors duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 20h9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Generate report
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9998]">
          <div className="bg-white rounded-lg shadow-lg w-[480px] max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-[16px] font-semibold text-[#585858]">Generate Report</h3>
            <p className="text-[12px] text-[#949494] mt-1 mb-4">Closira Analytics — {today}</p>

            <div className="border border-[#e0e0e0] rounded-lg p-4">
              <h4 className="text-[13px] font-semibold text-[#585858] mb-1">Executive Summary</h4>
              <p className="text-[12px] text-[#737373] mb-4">
                Overall call activity remained steady this period, with connected calls trending upward across most reps.
                Conversion rates improved slightly, driven by stronger follow-up discipline on inbound leads.
              </p>

              <h4 className="text-[13px] font-semibold text-[#585858] mb-2">Key Metrics</h4>
              <table className="w-full text-[12px] mb-4">
                <tbody>
                  {KEY_METRICS.map((m) => (
                    <tr key={m.label} className="border-b border-[#f1f1f1]">
                      <td className="py-1.5 text-[#585858]">{m.label}</td>
                      <td className="py-1.5 text-right text-[#585858] font-medium">{m.value}</td>
                      <td className="py-1.5 text-right w-6">
                        <span style={{ display: 'inline-block', transform: m.trend === 'up' ? 'rotate(180deg)' : 'none' }}>
                          <DownArrow color={m.trend === 'up' ? '#3ca30f' : '#de3226'} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4 className="text-[13px] font-semibold text-[#585858] mb-2">Charts included</h4>
              <ul className="text-[12px] text-[#737373] list-disc pl-4 space-y-1">
                {cards.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-[#f1f1f1] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7ed3cf] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {progress >= 100 ? (
                <div className="mt-2 text-[12px] text-[#3ca30f] font-medium">✓ Report Ready</div>
              ) : (
                <div className="mt-2 text-[12px] text-[#949494]">Generating...</div>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-4 py-2"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                className="text-[12px] font-medium text-white bg-[#7ed3cf] rounded-lg px-4 py-2"
              >
                Download PDF
              </button>
            </div>
          </div>

          {toast && (
            <div className="fixed bottom-6 right-6 bg-[#1a1a1a] text-white text-[13px] px-5 py-3 rounded-lg shadow-lg z-[9999] border-l-[3px] border-l-[#5bc4bf]">
              Downloading...
            </div>
          )}
        </div>
      )}
    </>
  );
};

const SearchActionButton = ({ query, setQuery }) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    window.dispatchEvent(new CustomEvent('dashboardSearch', { detail: { query: e.target.value } }));
  };

  const handleClose = () => {
    setOpen(false);
    setQuery('');
    window.dispatchEvent(new CustomEvent('dashboardSearch', { detail: { query: '' } }));
  };

  if (open) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        onBlur={() => setOpen(false)}
        className="text-[12px] font-medium text-[#585858] border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 outline-none w-32"
      />
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-sm px-4 py-2 flex items-center gap-2 hover:bg-[#f4f6f8] transition-colors duration-150"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#585858" strokeWidth="2.5" />
        <path d="M21 21l-4-4" stroke="#585858" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
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

  const toggle = (opt) => {
    setChecked((c) => {
      const next = { ...c, [opt]: !c[opt] };
      const filters = FILTER_OPTIONS.filter((o) => next[o]);
      window.dispatchEvent(new CustomEvent('dashboardFilter', { detail: { filters } }));
      return next;
    });
  };

  const activeCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-sm px-4 py-2 flex items-center gap-2 hover:bg-[#f4f6f8] transition-colors duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M8 6v0M4 12h16M14 12v0M4 18h16M10 18v0" stroke="#585858" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="6" r="2" fill="#585858" />
          <circle cx="14" cy="12" r="2" fill="#585858" />
          <circle cx="10" cy="18" r="2" fill="#585858" />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="bg-[#7ed3cf] text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-3 flex flex-col gap-2 z-50 w-44">
          {FILTER_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-[12px] text-[#585858] cursor-pointer">
              <input
                type="checkbox"
                checked={!!checked[opt]}
                onChange={() => toggle(opt)}
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
        className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-sm px-4 py-2 flex items-center gap-2 hover:bg-[#f4f6f8] transition-colors duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#585858" strokeWidth="2.5" />
          <path d="M3 9h18M8 2v4M16 2v4" stroke="#585858" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
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
                window.dispatchEvent(new CustomEvent('dashboardPeriod', { detail: { period: opt } }));
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

const WIDGET_OPTIONS = {
  all: [
    { name: 'KPI Counter', type: 'kpi-counter', desc: 'Single metric with trend indicator' },
    { name: 'Text Note', type: 'text-note', desc: 'Free-form note or annotation' },
  ],
  'Sales Agent': [
    { name: 'Daily Goal Tracker', type: 'daily-goal-tracker', desc: 'Track progress toward daily targets' },
    { name: 'My Call Log', type: 'my-call-log', desc: 'Recent calls and outcomes' },
  ],
  'Sales Manager': [
    { name: 'Team Leaderboard', type: 'team-leaderboard', desc: 'Rank reps by performance score' },
    { name: 'Conversion Funnel', type: 'conversion-funnel', desc: 'Stage-by-stage pipeline breakdown' },
  ],
  'Admin/Founder': [
    { name: 'Revenue Forecast', type: 'revenue-forecast', desc: 'AI-projected revenue trend' },
    { name: 'AI Insights Panel', type: 'ai-insights-panel', desc: 'Automated signals and recommendations' },
  ],
};

const WidgetIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7ed3cf" strokeWidth="2" />
    <path d="M3 9h18M9 21V9" stroke="#7ed3cf" strokeWidth="2" />
  </svg>
);

const AddWidgetActionButton = ({ selectedProfile }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const options = [...WIDGET_OPTIONS.all, ...(WIDGET_OPTIONS[selectedProfile] || [])];

  const handleSelect = (opt) => {
    window.dispatchEvent(new CustomEvent('addWidget', {
      detail: { name: opt.name, type: opt.type, profile: selectedProfile },
    }));
    setOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[12px] font-medium text-[#585858] border border-[#e0e0e0] rounded-sm px-4 py-2 flex items-center gap-2 hover:bg-[#f4f6f8] transition-colors duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#585858" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        + Add widget
      </button>
      {open && (
        <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 right-0 h-full w-[280px] bg-white border-l border-[#e0e0e0] shadow-lg p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-[#585858]">Add Widget</h3>
              <button onClick={() => setOpen(false)} className="text-[#949494] text-[16px] leading-none">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => handleSelect(opt)}
                  className="text-left border border-[#e0e0e0] rounded-lg p-2 hover:bg-[#fafafa]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <WidgetIcon />
                    <span className="text-[11px] font-medium text-[#585858]">{opt.name}</span>
                  </div>
                  <p className="text-[10px] text-[#949494]">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1a1a1a] text-white text-[13px] px-5 py-3 rounded-lg shadow-lg z-[9999] border-l-[3px] border-l-[#5bc4bf]">
          Widget added
        </div>
      )}
    </>
  );
};

const PageHeader = ({ selectedProfile }) => {
  const isAgent = selectedProfile === 'Sales Agent';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
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
        <GenerateReportButton selectedProfile={selectedProfile} />
        <div className="w-px h-5 bg-[#e0e0e0] mx-2" />
        <SearchActionButton query={searchQuery} setQuery={setSearchQuery} />
        <FiltersActionButton />
        <PeriodActionButton />
        <AddWidgetActionButton selectedProfile={selectedProfile} />
      </div>

      {searchQuery && (
        <div className="text-[11px] text-[#737373] bg-[#fafafa] border border-[#eaeaea] inline-block p-2 rounded-sm w-fit">
          Searching for: {searchQuery}
        </div>
      )}
    </>
  );
};

export default PageHeader;
