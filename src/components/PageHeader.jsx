import { useState, useRef, useEffect } from 'react';

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

const PageHeader = ({ isAgent }) => (
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
      <GenerateReportButton />
      <SearchActionButton />
      <FiltersActionButton />
      <PeriodActionButton />
      <AddWidgetActionButton />
    </div>
  </>
);

export default PageHeader;
