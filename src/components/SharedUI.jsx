import { useState, useEffect, useRef, useContext, createContext } from 'react';
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

const ChevronDown = ({ open }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
    <path d="M2 3.5L5 6.5L8 3.5" stroke="#949494" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MENU_ITEMS = ['Full screen', 'Settings', 'Rename', 'Duplicate', 'Export', 'Delete'];

export const CardMenu = ({ onAction }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        <DotsIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-6 z-20 bg-white border border-[#e0e0e0] rounded-md shadow-md py-1 w-36">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => { setOpen(false); onAction(item); }}
              className={`block w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#f5f5f5] ${item === 'Delete' ? 'text-[#de3226]' : 'text-[#585858]'}`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CardContext = createContext(null);

export const CardHeader = ({ title }) => {
  const ctx = useContext(CardContext);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(title);

  const handleAction = (action) => {
    switch (action) {
      case 'Full screen':
      case 'Settings':
        ctx?.openFullscreen();
        break;
      case 'Rename':
        setRenaming(true);
        break;
      case 'Duplicate':
        ctx?.showToast('Card duplicated');
        break;
      case 'Export':
        ctx?.showToast('Exported to CSV');
        break;
      case 'Delete':
        ctx?.requestDelete();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {renaming ? (
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setRenaming(false)}
          onKeyDown={(e) => e.key === 'Enter' && setRenaming(false)}
          className="text-[13px] font-semibold text-[#585858] border border-[#e0e0e0] rounded px-1 outline-none"
        />
      ) : (
        <div className="flex items-center gap-1.5">
          <h3 className="text-[13px] font-semibold text-[#585858]">{name}</h3>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#bebebe" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <CardMenu onAction={handleAction} />
    </div>
  );
};

const ACCORDION_ROWS = ['Chart type', 'Actual Value', 'Target Value', 'Potential Value', 'Colors', 'Visual Settings', 'Data'];

const AccordionRow = ({ label }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e0e0e0]">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between py-2.5 text-[12px] font-medium text-[#585858]">
        {label}
        <ChevronDown open={open} />
      </button>
      {open && <div className="pb-2.5 text-[11px] text-[#949494]">No options yet.</div>}
    </div>
  );
};

const FullscreenModal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="relative bg-white rounded-lg shadow-lg w-[90vw] max-w-5xl h-[680px] flex overflow-hidden">
      <button onClick={onClose} className="absolute top-3 right-3 text-[#949494] hover:text-[#585858] text-[16px] leading-none z-10">✕</button>
      <div className="flex-1 p-5 overflow-auto" style={{ height: 600 }}>
        {children}
      </div>
      <div className="w-[320px] border-l border-[#e0e0e0] p-5 overflow-auto shrink-0">
        <h4 className="text-[13px] font-semibold text-[#585858] mb-3">Widget settings</h4>
        {ACCORDION_ROWS.map((row) => <AccordionRow key={row} label={row} />)}
      </div>
    </div>
  </div>
);

export const Card = ({ children, className = '' }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  if (removed) return null;

  const ctx = {
    openFullscreen: () => setFullscreen(true),
    showToast: setToast,
    requestDelete: () => setConfirmDelete(true),
  };

  return (
    <CardContext.Provider value={ctx}>
      <div className={`relative group bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-5 ${className}`}>
        <div className="absolute top-2 left-2 text-[#bebebe] text-[14px] opacity-0 group-hover:opacity-100 transition-opacity cursor-move select-none">⠿</div>
        {children}

        {toast && (
          <div className="fixed bottom-6 right-6 bg-[#585858] text-white text-[12px] px-4 py-2 rounded-md shadow-lg z-50">{toast}</div>
        )}

        {confirmDelete && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-5 w-72">
              <p className="text-[13px] text-[#585858] mb-4">Remove this widget?</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 text-[12px] rounded-md border border-[#e0e0e0] text-[#585858]">Cancel</button>
                <button onClick={() => { setRemoved(true); setConfirmDelete(false); }} className="px-3 py-1.5 text-[12px] rounded-md bg-[#de3226] text-white">Remove</button>
              </div>
            </div>
          </div>
        )}

        {fullscreen && (
          <FullscreenModal onClose={() => setFullscreen(false)}>
            {children}
          </FullscreenModal>
        )}
      </div>
    </CardContext.Provider>
  );
};

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
