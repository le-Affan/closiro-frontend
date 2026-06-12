import { useState, useEffect, useContext } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { Card, CardHeader, DownArrow, DashboardGrid, ChartConfigRegistryContext, CardIdContext, CHART_DEFAULTS } from './SharedUI';
import { kpis, trendData, repData, leadSourceData } from '../data/mockData';

const LAYOUT_KEY = 'closira-layout-manager';

const DEFAULT_LAYOUTS = {
  lg: [
    { i: 'manager-kpi-pills', x: 0, y: 0, w: 12, h: 1 },
    { i: 'manager-call-trend', x: 0, y: 1, w: 12, h: 4 },
    { i: 'manager-rep-performance', x: 0, y: 5, w: 6, h: 4 },
    { i: 'manager-lead-source', x: 6, y: 5, w: 6, h: 4 },
  ],
};

const useChartConfig = () => {
  const { getConfig } = useContext(ChartConfigRegistryContext);
  const cardId = useContext(CardIdContext);
  return getConfig(cardId, CHART_DEFAULTS[cardId]);
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

const repCategory = (score) => (score >= 70 ? 'good' : score >= 50 ? 'average' : 'bad');

const RepPerformanceList = ({ reps }) => {
  const { colors, sortOrder, showLabels } = useChartConfig();

  const sorted = [...reps].sort((a, b) => {
    if (sortOrder === 'alpha') return a.name.localeCompare(b.name);
    if (sortOrder === 'reverse') return a.score - b.score;
    return b.score - a.score;
  });

  return (
    <div className="flex flex-col gap-2.5 h-full overflow-y-auto">
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
  const { getConfig } = useContext(ChartConfigRegistryContext);
  const kpiColor = getConfig('manager-kpi-pills', {}).colors?.primary;
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState('');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const onSearch = (e) => setSearchQuery(e.detail.query);
    const onPeriod = (e) => setPeriod(e.detail.period);
    const onFilter = (e) => setFilters(e.detail.filters);
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

  const cards = {
    'manager-kpi-pills': (
      <Card cardId="manager-kpi-pills">
        <div className="flex items-center gap-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="flex items-center gap-2">
              <DownArrow color={kpi.color} />
              <div>
                <div className="text-[11px] text-[#949494] stat-label">{kpi.label}</div>
                <div className="text-[15px] font-semibold text-[#585858] stat-number" style={kpiColor ? { color: kpiColor } : undefined}>{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    ),
    'manager-call-trend': (
      <Card cardId="manager-call-trend" data={trendTableData}>
        <CardHeader title="Call Activity Trend" />
        {period && (
          <div className="mb-3 text-[11px] text-[#737373] bg-[#f5f5f5] border border-[#eaeaea] inline-block px-2.5 py-1 rounded-md">
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
      <Card cardId="manager-rep-performance" data={repTableData}>
        <CardHeader title="Rep Performance Score" />
        <div className="flex-1 min-h-0 overflow-hidden">
          <RepPerformanceList reps={filteredRepData} />
        </div>
        <div className="flex items-center gap-6 mt-4 text-[11px] text-[#737373] shrink-0">
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
        <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858] shrink-0">
          <span>Improve 30% + lift in calls to conversion</span>
          <span className="font-semibold cursor-pointer hover:underline transition-colors duration-150">Check how</span>
        </div>
      </Card>
    ),
    'manager-lead-source': (
      <Card cardId="manager-lead-source" data={leadSourceTableData}>
        <CardHeader title="Conversion Rate by Lead Source" />
        <div className="flex-1 min-h-0 flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <ConversionByLeadSourceChart />
          </ResponsiveContainer>
        </div>
      </Card>
    ),
  };

  const [layouts, setLayouts] = useState(() => {
    try {
      const saved = localStorage.getItem(LAYOUT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore malformed storage
    }
    return DEFAULT_LAYOUTS;
  });

  const updateLayouts = (update) => {
    setLayouts((prev) => {
      const next = typeof update === 'function' ? update(prev) : update;
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const [addedWidgets, setAddedWidgets] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now();
      const widgetId = `added-widget-${id}`;
      setAddedWidgets((prev) => [...prev, { name: e.detail.name, type: e.detail.type, id }]);
      updateLayouts((prev) => ({
        ...prev,
        lg: [...prev.lg, { i: widgetId, x: 0, y: Infinity, w: 6, h: 3, minW: 3, minH: 2 }],
      }));
    };
    window.addEventListener('addWidget', handler);
    return () => window.removeEventListener('addWidget', handler);
  }, []);

  const widgetCards = {};
  addedWidgets.forEach((w) => {
    const widgetId = `added-widget-${w.id}`;
    widgetCards[widgetId] = (
      <Card cardId={widgetId} onRemove={() => {
        setAddedWidgets((prev) => prev.filter((x) => x.id !== w.id));
        updateLayouts((prev) => ({ ...prev, lg: prev.lg.filter((l) => l.i !== widgetId) }));
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
      <DashboardGrid layouts={layouts} onLayoutChange={(_, all) => updateLayouts(all)}>
        {Object.keys(allCards).map((id) => (
          <div key={id}>{allCards[id]}</div>
        ))}
      </DashboardGrid>
    </>
  );
};

export default ManagerView;
