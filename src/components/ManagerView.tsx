import { useState, useEffect, useContext } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Card as CardRaw, CardHeader, DashboardGrid, ChartConfigRegistryContext, CardIdContext, CHART_DEFAULTS } from './SharedUI';
import { kpis, trendData, repData, leadSourceData, RepDatum } from '../data/mockData';

const Card: any = CardRaw;

const LAYOUT_KEY = 'closira-layout-manager';

const KPI_DOT_COLORS: Record<string, string> = {
  'Total Calls': '#2883ff',
  'Connected Calls': '#42b311',
  'Missed Calls': '#f4372a',
  'Follow-ups': '#f1a013',
  'Conversion Signal': '#a1e2b3',
};

const DEFAULT_LAYOUTS: any = {
  lg: [
    { i: 'manager-kpi-pills', x: 0, y: 0, w: 12, h: 1 },
    { i: 'manager-call-trend', x: 0, y: 1, w: 12, h: 4 },
    { i: 'manager-rep-performance', x: 0, y: 5, w: 6, h: 4 },
    { i: 'manager-lead-source', x: 6, y: 5, w: 6, h: 4 },
  ],
};

const useChartConfig = (): any => {
  const { getConfig } = useContext(ChartConfigRegistryContext) as any;
  const cardId = useContext(CardIdContext);
  return getConfig(cardId, (CHART_DEFAULTS as any)[cardId as any]);
};

const CallActivityChart = () => {
  const { chartType, colors, showLegend, showGrid } = useChartConfig();
  const gridProps = { strokeDasharray: '4 4', stroke: '#eaeaea', vertical: false, strokeOpacity: showGrid ? 1 : 0 };
  const axisProps = {
    x: { dataKey: 'month', axisLine: false, tickLine: false, tick: { fill: '#949494', fontSize: 11 } },
    y: { domain: [0, 300], ticks: [0, 100, 200, 300], axisLine: false, tickLine: false, tick: { fill: '#949494', fontSize: 11 } },
  };

  if (chartType === 'bar') {
    return (
      <BarChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis {...axisProps.x} />
        <YAxis {...axisProps.y} />
        <Tooltip />
        {showLegend && <Legend />}
        <Bar dataKey="connected" fill={colors.connected} />
        <Bar dataKey="followups" fill={colors.followups} />
        <Bar dataKey="missed" fill={colors.missed} />
        <Bar dataKey="calls" fill={colors.total} />
      </BarChart>
    );
  }

  if (chartType === 'line') {
    return (
      <LineChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis {...axisProps.x} />
        <YAxis {...axisProps.y} />
        <Tooltip />
        {showLegend && <Legend />}
        <Line type="monotone" dataKey="connected" stroke={colors.connected} dot={false} />
        <Line type="monotone" dataKey="followups" stroke={colors.followups} dot={false} />
        <Line type="monotone" dataKey="missed" stroke={colors.missed} dot={false} />
        <Line type="monotone" dataKey="calls" stroke={colors.total} dot={false} />
      </LineChart>
    );
  }

  return (
    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
      <CartesianGrid {...gridProps} />
      <XAxis {...axisProps.x} />
      <YAxis {...axisProps.y} />
      <Tooltip />
      {showLegend && <Legend />}
      <Area type="monotone" dataKey="connected" stackId="1" stroke={colors.connected} fill={colors.connected} fillOpacity={0.7} />
      <Area type="monotone" dataKey="followups" stackId="1" stroke={colors.followups} fill={colors.followups} fillOpacity={0.7} />
      <Area type="monotone" dataKey="missed" stackId="1" stroke={colors.missed} fill={colors.missed} fillOpacity={0.5} />
      <Area type="monotone" dataKey="calls" stackId="1" stroke={colors.total} fill={colors.total} fillOpacity={0.5} />
    </AreaChart>
  );
};

const ConversionByLeadSourceChart = () => {
  const { chartType, colors, showGrid, sortOrder } = useChartConfig();

  const sorted = [...leadSourceData].sort((a, b) => (
    sortOrder === 'alpha' ? a.name.localeCompare(b.name) : b.value - a.value
  ));

  if (chartType === 'table') {
    return (
      <div className="flex flex-col gap-2 w-full">
        {sorted.map((s) => (
          <div key={s.name} className="flex items-center justify-between text-[12px] text-[#585858] border-b border-[#f1f1f1] py-1.5">
            <span>{s.name}</span>
            <span className="font-semibold">{s.value}%</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" horizontal={false} strokeOpacity={showGrid ? 1 : 0} />
      <XAxis type="number" domain={[0, 40]} ticks={[0, 10, 20, 30, 40]}
        axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }}
        tickFormatter={(v) => `${v}%`} />
      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} width={90} />
      <Bar dataKey="value" fill={colors.primary} barSize={14} radius={[0, 4, 4, 0]} />
    </BarChart>
  );
};

const repCategory = (score: number) => (score >= 70 ? 'good' : score >= 50 ? 'average' : 'bad');

const RepPerformanceList = ({ reps }: { reps: RepDatum[] }) => {
  const { colors, sortOrder, showLabels } = useChartConfig();

  const sorted = [...reps].sort((a, b) => {
    if (sortOrder === 'alpha') return a.name.localeCompare(b.name);
    if (sortOrder === 'reverse') return a.score - b.score;
    return b.score - a.score;
  });

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto">
      {sorted.map((rep) => (
        <div key={rep.name} className="flex items-center gap-3 flex-1">
          <span className="text-[11px] text-[#737373] w-28 shrink-0">{rep.name}</span>
          <div className="flex-1 h-2 bg-[#f1f1f1] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${rep.score}%`, backgroundColor: colors[repCategory(rep.score)] }} />
          </div>
          {showLabels && <span className="text-[11px] text-[#949494] w-8 text-right">{rep.score}%</span>}
        </div>
      ))}
    </div>
  );
};

const ManagerView = () => {
  const { getConfig } = useContext(ChartConfigRegistryContext) as any;
  const kpiColor = getConfig('manager-kpi-pills', {}).colors?.primary;
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState('');
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const onSearch = (e: any) => setSearchQuery(e.detail.query);
    const onPeriod = (e: any) => setPeriod(e.detail.period);
    const onFilter = (e: any) => setFilters(e.detail.filters);
    window.addEventListener('dashboardSearch', onSearch);
    window.addEventListener('dashboardPeriod', onPeriod);
    window.addEventListener('dashboardFilter', onFilter);
    return () => {
      window.removeEventListener('dashboardSearch', onSearch);
      window.removeEventListener('dashboardPeriod', onPeriod);
      window.removeEventListener('dashboardFilter', onFilter);
    };
  }, []);

  const filteredRepData = repData.filter((rep) => rep.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const trendTableData = {
    columns: ['Month', 'Total', 'Connected', 'Missed', 'Follow-ups'],
    rows: trendData.map((d) => [d.month, d.calls, d.connected, d.missed, d.followups]),
  };

  const repTableData = {
    columns: ['Name', 'Score', 'Category'],
    rows: repData.map((r) => [r.name, `${r.score}%`, repCategory(r.score)[0].toUpperCase() + repCategory(r.score).slice(1)]),
  };

  const leadSourceTableData = {
    columns: ['Source', 'Conversion %'],
    rows: leadSourceData.map((s) => [s.name, `${s.value}%`]),
  };

  const [layouts, setLayouts] = useState<any>(() => {
    try {
      const saved = localStorage.getItem(LAYOUT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore malformed storage
    }
    return DEFAULT_LAYOUTS;
  });

  const updateLayouts = (update: any) => {
    setLayouts((prev: any) => {
      const next = typeof update === 'function' ? update(prev) : update;
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const [addedWidgets, setAddedWidgets] = useState<any[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      const id = Date.now();
      const widgetId = `added-widget-${id}`;
      setAddedWidgets((prev) => [...prev, { name: e.detail.name, type: e.detail.type, id }]);
      updateLayouts((prev: any) => ({
        ...prev,
        lg: [...prev.lg, { i: widgetId, x: 0, y: Infinity, w: 6, h: 3, minW: 3, minH: 2 }],
      }));
    };
    window.addEventListener('addWidget', handler);
    return () => window.removeEventListener('addWidget', handler);
  }, []);

  const handleDuplicate = (cardTitle: string, cardId: string) => {
    const id = Date.now();
    const widgetId = `added-widget-${id}`;
    setAddedWidgets((prev) => [...prev, { id, name: `${cardTitle} (Copy)`, type: cardId, sourceCardId: cardId }]);
    updateLayouts((prev: any) => ({
      ...prev,
      lg: [...prev.lg, { i: widgetId, x: 0, y: Infinity, w: 6, h: 3, minW: 3, minH: 2 }],
    }));
  };

  const cards: Record<string, any> = {
    'manager-kpi-pills': (
      <Card cardId="manager-kpi-pills">
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, width: '100%' }}>
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              style={{
                display: 'flex', padding: 16, flexDirection: 'column', alignItems: 'flex-start', gap: 12,
                flex: '1 0 0', borderRadius: 12, border: '1px solid #e0e0e0', background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
                <div className="flex items-center gap-2">
                  <div style={{ width: 10, height: 10, borderRadius: 100, background: KPI_DOT_COLORS[kpi.label] }} />
                  <span className="stat-label" style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#737373' }}>{kpi.label}</span>
                </div>
                <ArrowDownwardIcon sx={{ fontSize: 20 }} style={{ color: '#3ca30f' }} />
              </div>
              <div className="stat-number" style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 600, color: kpiColor || '#000000' }}>{kpi.value}</div>
            </div>
          ))}
        </div>
      </Card>
    ),
    'manager-call-trend': (
      <Card cardId="manager-call-trend" title="Call Activity Trend" data={trendTableData} onDuplicate={handleDuplicate}>
        <CardHeader title="Call Activity Trend" />
        {period && (
          <div className="mb-3 text-[11px] text-[#737373] bg-[#fafafa] border border-[#eaeaea] inline-block p-2 rounded-sm">
            Showing data for: {period}
          </div>
        )}
        <div className="bg-[#fafafa] rounded-lg p-2 flex-1 min-h-0 flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <CallActivityChart />
          </ResponsiveContainer>
        </div>
      </Card>
    ),
    'manager-rep-performance': (
      <Card cardId="manager-rep-performance" title="Rep Performance Score" data={repTableData} onDuplicate={handleDuplicate}>
        <CardHeader title="Rep Performance Score" />
        <div className="flex-1 min-h-0 overflow-hidden">
          <RepPerformanceList reps={filteredRepData} />
        </div>
        <div className="flex items-center gap-6 mt-4 text-[11px] text-[#737373] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3ca30f]" /> GOOD <span className="font-semibold text-[#585858]">70%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f1a013]" /> AVERAGE <span className="font-semibold text-[#585858]">25%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#de3226]" /> BAD <span className="font-semibold text-[#585858]">5%</span>
          </div>
        </div>
        <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858] shrink-0">
          <span>Improve 30% + lift in calls to conversion</span>
          <span className="font-semibold cursor-pointer hover:underline transition-colors duration-150">Check how</span>
        </div>
      </Card>
    ),
    'manager-lead-source': (
      <Card cardId="manager-lead-source" title="Conversion Rate by Lead Source" data={leadSourceTableData} onDuplicate={handleDuplicate}>
        <CardHeader title="Conversion Rate by Lead Source" />
        <div className="flex-1 min-h-0 flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <ConversionByLeadSourceChart />
          </ResponsiveContainer>
        </div>
      </Card>
    ),
  };

  const widgetCards: Record<string, any> = {};
  addedWidgets.forEach((w) => {
    const widgetId = `added-widget-${w.id}`;
    widgetCards[widgetId] = (
      <Card cardId={widgetId} title={w.name} onDuplicate={handleDuplicate} onRemove={() => {
        setAddedWidgets((prev) => prev.filter((x) => x.id !== w.id));
        updateLayouts((prev: any) => ({ ...prev, lg: prev.lg.filter((l: any) => l.i !== widgetId) }));
      }}>
        <CardHeader title={w.name} />
        <p className="text-[12px] text-[#949494]">Widget type: {w.type}</p>
      </Card>
    );
  });

  const allCards = { ...cards, ...widgetCards };

  return (
    <>
      {filters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <span key={f} className="bg-[#7ed3cf] text-white text-[11px] font-medium rounded-full px-3 py-1">{f}</span>
          ))}
        </div>
      )}
      <DashboardGrid layouts={layouts} onLayoutChange={(_: any, all: any) => updateLayouts(all)}>
        {Object.keys(allCards).map((id) => (
          <div key={id}>{allCards[id]}</div>
        ))}
      </DashboardGrid>
    </>
  );
};

export default ManagerView;
