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
    <circle cx="8" cy="3" r="2.5" fill="#949494" />
    <circle cx="8" cy="8" r="2.5" fill="#949494" />
    <circle cx="8" cy="13" r="2.5" fill="#949494" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
    <path d="M2 3.5L5 6.5L8 3.5" stroke="#949494" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------- menu item icons (14px, #737373) ----------
const MaximizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#737373" strokeWidth="2.5" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="9" width="13" height="13" rx="2" stroke="#737373" strokeWidth="2.5" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="7 10 12 15 17 10" stroke="#737373" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="15" x2="12" y2="3" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="11" x2="10" y2="17" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="11" x2="14" y2="17" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const MENU_ITEMS = [
  { label: 'Full screen', icon: MaximizeIcon },
  { label: 'Settings', icon: SettingsIcon },
  { label: 'Rename', icon: PencilIcon },
  { label: 'Duplicate', icon: CopyIcon },
  { label: 'Export', icon: DownloadIcon },
  { label: 'Delete', icon: TrashIcon },
];

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
      <button onClick={() => setOpen((o) => !o)} className="cursor-pointer p-1 rounded hover:bg-[#f4f6f8]">
        <DotsIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-6 z-20 bg-white border border-[#e0e0e0] rounded-md shadow-md py-1 w-36">
          {MENU_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => { setOpen(false); onAction(label); }}
              className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-[12px] transition-colors duration-150 hover:bg-[#f4f6f8] ${label === 'Delete' ? 'text-[#de3226]' : 'text-[#585858]'}`}
            >
              <Icon />
              {label}
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
        ctx?.openModal('fullscreen');
        break;
      case 'Settings':
        ctx?.openModal('settings');
        break;
      case 'Rename':
        setRenaming(true);
        break;
      case 'Duplicate':
        ctx?.requestDuplicate();
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
          className="text-[15px] font-semibold text-[#1a1a1a] border border-[#e0e0e0] rounded px-1 outline-none"
        />
      ) : (
        <div className="flex items-center gap-1.5">
          <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{name}</h3>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#bebebe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <CardMenu onAction={handleAction} />
    </div>
  );
};

// ---------- persistent chart config registry (survives modal close) ----------
export const ChartConfigRegistryContext = createContext(null);
export const CardIdContext = createContext(null);

export const ChartConfigRegistryProvider = ({ children }) => {
  const registry = useRef({});
  const [, bump] = useState(0);

  const getConfig = (cardId, defaults) => registry.current[cardId] ?? defaults;
  const setConfig = (cardId, nextConfig) => {
    registry.current[cardId] = nextConfig;
    bump((n) => n + 1);
  };

  return (
    <ChartConfigRegistryContext.Provider value={{ getConfig, setConfig }}>
      {children}
    </ChartConfigRegistryContext.Provider>
  );
};

const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

const setPath = (obj, path, value) => {
  const [head, ...rest] = path.split('.');
  if (rest.length === 0) return { ...obj, [head]: value };
  return { ...obj, [head]: setPath(obj[head] ?? {}, rest.join('.'), value) };
};

// ---------- per-card chart config defaults ----------
const SWATCH_SET = ['#7ed3cf', '#2477e8', '#80cc60', '#f1a013', '#de3226'];

export const CHART_DEFAULTS = {
  'manager-call-trend': {
    chartType: 'area',
    colors: { total: '#2477e8', connected: '#80cc60', missed: '#de3226', followups: '#f1a013' },
    showGrid: true,
    showLegend: true,
  },
  'manager-rep-performance': {
    colors: { good: '#3ca30f', average: '#f1a013', bad: '#de3226' },
    sortOrder: 'score',
    showLabels: true,
  },
  'manager-lead-source': {
    chartType: 'bar',
    colors: { primary: '#7ed3cf' },
    showGrid: true,
    sortOrder: 'value',
  },
  'founder-annual-revenue': {
    chartType: 'donut',
    colors: { arc1: '#4c807d', arc2: '#dbf8f7' },
    actualValue: null,
    targetValue: null,
    potentialValue: null,
  },
  'founder-monthly-revenue': {
    chartType: 'bar',
    colors: { seg1: '#3ca30f', seg2: '#80cc60', seg3: '#dbf8f7' },
    actualValue: null,
    targetValue: null,
    potentialValue: null,
  },
  'founder-pipeline': {
    chartType: 'bar',
    colors: { primary: '#7ed3cf' },
    showGrid: true,
    showValues: true,
  },
  'agent-performance': {
    colors: { primary: '#3ca30f' },
    display: 'score',
  },
  'agent-pipeline': {
    chartType: 'funnel',
    colors: { primary: '#7ed3cf' },
    showLabels: true,
  },
};

// ---------- per-card settings panel schema ----------
const SETTINGS_SCHEMA = {
  'manager-call-trend': [
    { key: 'Chart type', type: 'tabs', path: 'chartType', options: ['area', 'bar', 'line'] },
    { key: 'Colors', type: 'multiColor', swatches: SWATCH_SET, items: [
      { path: 'colors.total', label: 'Total Calls' },
      { path: 'colors.connected', label: 'Connected' },
      { path: 'colors.missed', label: 'Missed' },
      { path: 'colors.followups', label: 'Follow-ups' },
    ] },
    { key: 'Show Grid', type: 'toggle', path: 'showGrid' },
    { key: 'Show Legend', type: 'toggle', path: 'showLegend' },
    { key: 'Data', type: 'table' },
  ],
  'manager-rep-performance': [
    { key: 'Colors', type: 'multiColor', swatches: SWATCH_SET, items: [
      { path: 'colors.good', label: 'Good' },
      { path: 'colors.average', label: 'Average' },
      { path: 'colors.bad', label: 'Bad' },
    ] },
    { key: 'Sort order', type: 'radio', path: 'sortOrder', options: [
      { value: 'score', label: 'By Score' },
      { value: 'alpha', label: 'Alphabetical' },
      { value: 'reverse', label: 'Reverse' },
    ] },
    { key: 'Show Labels', type: 'toggle', path: 'showLabels' },
    { key: 'Data', type: 'table' },
  ],
  'manager-lead-source': [
    { key: 'Chart type', type: 'tabs', path: 'chartType', options: ['bar', 'table'] },
    { key: 'Colors', type: 'colorSwatch', path: 'colors.primary', swatches: SWATCH_SET },
    { key: 'Show Grid', type: 'toggle', path: 'showGrid' },
    { key: 'Sort order', type: 'radio', path: 'sortOrder', options: [
      { value: 'value', label: 'By Value' },
      { value: 'alpha', label: 'Alphabetical' },
    ] },
    { key: 'Data', type: 'table' },
  ],
  'founder-annual-revenue': [
    { key: 'Chart type', type: 'tabs', path: 'chartType', options: ['donut', 'bar'] },
    { key: 'Colors', type: 'multiColor', swatches: ['#4c807d', '#62a5a2', '#7ed3cf', '#dbf8f7', '#2477e8'], items: [
      { path: 'colors.arc1', label: 'Arc 1 (Current)' },
      { path: 'colors.arc2', label: 'Arc 2 (Potential)' },
    ] },
    { key: 'Actual Value', type: 'number', path: 'actualValue' },
    { key: 'Target Value', type: 'number', path: 'targetValue' },
    { key: 'Potential Value', type: 'number', path: 'potentialValue' },
    { key: 'Data', type: 'table' },
  ],
  'founder-monthly-revenue': [
    { key: 'Chart type', type: 'tabs', path: 'chartType', options: ['bar', 'donut'] },
    { key: 'Colors', type: 'multiColor', swatches: ['#3ca30f', '#80cc60', '#dbf8f7', '#7ed3cf', '#2477e8'], items: [
      { path: 'colors.seg1', label: 'Segment 1' },
      { path: 'colors.seg2', label: 'Segment 2' },
      { path: 'colors.seg3', label: 'Segment 3' },
    ] },
    { key: 'Actual Value', type: 'number', path: 'actualValue' },
    { key: 'Target Value', type: 'number', path: 'targetValue' },
    { key: 'Potential Value', type: 'number', path: 'potentialValue' },
    { key: 'Data', type: 'table' },
  ],
  'founder-pipeline': [
    { key: 'Chart type', type: 'tabs', path: 'chartType', options: ['bar', 'funnel', 'line'] },
    { key: 'Colors', type: 'colorSwatch', path: 'colors.primary', swatches: SWATCH_SET },
    { key: 'Show Grid', type: 'toggle', path: 'showGrid' },
    { key: 'Show Values', type: 'toggle', path: 'showValues' },
    { key: 'Data', type: 'table' },
  ],
  'agent-performance': [
    { key: 'Colors', type: 'colorSwatch', path: 'colors.primary', swatches: SWATCH_SET },
    { key: 'Display', type: 'radio', path: 'display', options: [
      { value: 'score', label: 'Score %' },
      { value: 'rank', label: 'Rank' },
      { value: 'both', label: 'Both' },
    ] },
    { key: 'Data', type: 'table' },
  ],
  'agent-pipeline': [
    { key: 'Chart type', type: 'tabs', path: 'chartType', options: ['funnel', 'bar'] },
    { key: 'Colors', type: 'colorSwatch', path: 'colors.primary', swatches: SWATCH_SET },
    { key: 'Show Labels', type: 'toggle', path: 'showLabels' },
    { key: 'Data', type: 'table' },
  ],
};

export const NO_SETTINGS_CARDS = ['agent-stats-row', 'agent-targets', 'manager-kpi-pills', 'founder-kpi-pills', 'founder-top-performers'];

const ToggleSwitch = ({ checked, onChange }) => (
  <span
    onClick={() => onChange(!checked)}
    className={`relative inline-block rounded-full cursor-pointer transition-colors ${checked ? 'bg-[#7ed3cf]' : 'bg-[#e0e0e0]'}`}
    style={{ width: 32, height: 18 }}
  >
    <span
      className="absolute top-0.5 left-0.5 bg-white rounded-full transition-transform"
      style={{ width: 14, height: 14, transform: checked ? 'translateX(14px)' : 'translateX(0)' }}
    />
  </span>
);

const SettingControl = ({ row, config, onUpdate, data }) => {
  switch (row.type) {
    case 'tabs':
      return (
        <div className="flex gap-2 flex-wrap">
          {row.options.map((t) => (
            <button
              key={t}
              onClick={() => onUpdate(row.path, t)}
              className={`text-[11px] px-3 py-1.5 rounded-lg transition-colors duration-150 ${getPath(config, row.path) === t ? 'border-2 border-[#5bc4bf] text-[#4c807d] bg-[#f0fafb]' : 'border border-[#e0e0e0] text-[#585858]'}`}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      );
    case 'colorSwatch':
      return (
        <div className="flex gap-2">
          {row.swatches.map((c) => (
            <button
              key={c}
              onClick={() => onUpdate(row.path, c)}
              className="w-6 h-6 rounded-full border-2"
              style={{ backgroundColor: c, borderColor: getPath(config, row.path) === c ? '#585858' : 'transparent' }}
            />
          ))}
        </div>
      );
    case 'multiColor':
      return (
        <div className="flex flex-col gap-3">
          {row.items.map((item) => (
            <div key={item.path}>
              <div className="text-[11px] text-[#949494] mb-1">{item.label}</div>
              <div className="flex gap-2">
                {row.swatches.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdate(item.path, c)}
                    className="w-5 h-5 rounded-full border-2"
                    style={{ backgroundColor: c, borderColor: getPath(config, item.path) === c ? '#585858' : 'transparent' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case 'toggle':
      return <ToggleSwitch checked={getPath(config, row.path)} onChange={(v) => onUpdate(row.path, v)} />;
    case 'radio':
      return (
        <div className="flex flex-col gap-2">
          {row.options.map((o) => (
            <label key={o.value} className="flex items-center gap-2 text-[12px] text-[#585858] cursor-pointer">
              <input type="radio" checked={getPath(config, row.path) === o.value} onChange={() => onUpdate(row.path, o.value)} />
              {o.label}
            </label>
          ))}
        </div>
      );
    case 'number':
      return (
        <input
          type="number"
          value={getPath(config, row.path) ?? ''}
          onChange={(e) => onUpdate(row.path, e.target.value)}
          placeholder="Enter value"
          className="w-full text-[12px] text-[#585858] border-[1.5px] border-[#e0e0e0] rounded-lg px-2 py-1.5 outline-none"
        />
      );
    case 'table': {
      if (!data || !data.rows?.length) return <div className="text-[11px] text-[#949494]">No data available</div>;
      return (
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-left text-[#949494]">
              {data.columns.map((c) => <th key={c} className="py-1 font-medium">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr key={i}>{r.map((v, j) => <td key={j} className="py-1 text-[#585858]">{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      );
    }
    default:
      return <div className="text-[11px] text-[#949494]">No options yet.</div>;
  }
};

const AccordionRow = ({ label, open, onToggle, row, config, onUpdate, data }) => (
  <div className="border-b border-[#e0e0e0]">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-2.5 text-[12px] font-medium text-[#585858]">
      {label}
      <ChevronDown open={open} />
    </button>
    {open && <div className="pb-3">{<SettingControl row={row} config={config} onUpdate={onUpdate} data={data} />}</div>}
  </div>
);

const FullscreenModal = ({ mode, cardId, data, onClose, children }) => {
  const { getConfig, setConfig } = useContext(ChartConfigRegistryContext);
  const [openRow, setOpenRow] = useState(null);

  const statOnly = NO_SETTINGS_CARDS.includes(cardId);
  const schema = SETTINGS_SCHEMA[cardId];
  const defaults = CHART_DEFAULTS[cardId] || {};
  const config = getConfig(cardId, defaults);
  const onUpdate = (path, value) => setConfig(cardId, setPath(config, path, value));

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-lg w-[90vw] max-w-[1300px] h-[85vh] flex flex-row overflow-hidden">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 flex items-center justify-center" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="#3a3a3a" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
          {statOnly ? (
            <div className="[&_.stat-number]:text-3xl [&_.stat-label]:text-sm p-12 flex items-center justify-center w-full scale-150">
              {children}
            </div>
          ) : (
            <div style={{ height: 480, width: '100%' }}>
              {children}
            </div>
          )}
        </div>
        {mode === 'settings' && !statOnly && (
          <div className="w-[320px] border-l border-[#e0e0e0] p-6 overflow-y-auto shrink-0">
            <h4 className="text-[15px] font-semibold text-[#1a1a1a] mb-3">Widget settings</h4>
            {schema ? (
              schema.map((row) => (
                <AccordionRow
                  key={row.key}
                  label={row.key}
                  open={openRow === row.key}
                  onToggle={() => setOpenRow((r) => (r === row.key ? null : row.key))}
                  row={row}
                  config={config}
                  onUpdate={onUpdate}
                  data={data}
                />
              ))
            ) : (
              <div className="text-[12px] text-[#949494]">No chart settings available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const Card = ({ children, className = '', cardId, data }) => {
  const [modalMode, setModalMode] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    if (!toast) return;
    setToastVisible(false);
    const show = setTimeout(() => setToastVisible(true), 10);
    const hide = setTimeout(() => setToastVisible(false), 1700);
    const remove = setTimeout(() => setToast(null), 2000);
    return () => { clearTimeout(show); clearTimeout(hide); clearTimeout(remove); };
  }, [toast]);

  if (removed) return null;

  const ctx = {
    openModal: setModalMode,
    showToast: setToast,
    requestDelete: () => setConfirmDelete(true),
    requestDuplicate: () => setDuplicates((d) => [...d, Date.now()]),
  };

  return (
    <>
      <CardIdContext.Provider value={cardId}>
        <CardContext.Provider value={ctx}>
          <div className={`relative group bg-white border border-[#e8e8e8] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-150 p-5 ${className}`}>
            <div data-drag-handle="true" className="absolute top-2 left-2 text-[#bebebe] hover:text-[#737373] text-[14px] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab select-none">⠿</div>
            {children}

            {toast && (
              <div className={`fixed bottom-6 right-6 bg-[#1a1a1a] text-white text-[13px] px-5 py-3 rounded-lg shadow-lg z-50 border-l-[3px] ${toast.includes('duplicated') ? 'border-l-[#22c55e]' : 'border-l-[#5bc4bf]'} transition-all duration-300 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>{toast}</div>
            )}

            {confirmDelete && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-5 w-72">
                  <p className="text-[13px] text-[#585858] mb-4">Remove this widget?</p>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 text-[12px] rounded-lg border border-[#e0e0e0] text-[#585858]">Cancel</button>
                    <button onClick={() => { setRemoved(true); setConfirmDelete(false); }} className="px-3 py-1.5 text-[12px] rounded-lg bg-[#de3226] text-white">Remove</button>
                  </div>
                </div>
              </div>
            )}

            {modalMode && (
              <FullscreenModal mode={modalMode} cardId={cardId} data={data} onClose={() => setModalMode(null)}>
                {children}
              </FullscreenModal>
            )}
          </div>
        </CardContext.Provider>
      </CardIdContext.Provider>

      {duplicates.map((id) => (
        <Card key={id} className={className} cardId={cardId} data={data}>{children}</Card>
      ))}
    </>
  );
};

// ---------- HTML5 drag-and-drop reorder wrapper ----------
export const DraggableCard = ({ index, onReorder, children, className = '' }) => {
  const [draggable, setDraggable] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', String(index))}
      onDragEnd={() => setDraggable(false)}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const from = Number(e.dataTransfer.getData('text/plain'));
        if (from !== index) onReorder(from, index);
      }}
      onMouseDown={(e) => { if (e.target.closest('[data-drag-handle]')) setDraggable(true); }}
      onMouseUp={() => setDraggable(false)}
      className={`rounded-xl ${dragOver ? 'outline outline-2 outline-dashed outline-[#2477e8]' : ''} ${className}`}
    >
      {children}
    </div>
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

export const PipelineFunnel = ({ data, color = '#7ed3cf', showLabels = true }) => (
  <div className="flex flex-col items-center gap-2 py-2">
    {data.map((stage, i) => (
      <div
        key={stage.name}
        className="text-white text-[12px] font-medium rounded-md flex items-center justify-center py-3"
        style={{ width: FUNNEL_WIDTHS[i], backgroundColor: color }}
      >
        {showLabels ? `${stage.name} — ${stage.value}` : ' '}
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
  <div className={`w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 ${active ? 'bg-[#dbf8f7]' : 'hover:bg-white/20'}`}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d={d} stroke={active ? '#4c807d' : '#ffffff'} strokeWidth="2.5" strokeOpacity={active ? 1 : 0.85} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);
