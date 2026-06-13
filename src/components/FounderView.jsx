import { useState, useEffect, useContext } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList,
} from 'recharts';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Card, CardHeader, ConnectedCardMenu, Sparkle, PerformersTable, PipelineFunnel, DashboardGrid, ChartConfigRegistryContext, CardIdContext, CHART_DEFAULTS } from './SharedUI';
import { adminKpis, pipelineData, monthlyRevenueData, repPerformanceTable } from '../data/mockData';

const LAYOUT_KEY = 'closira-layout-founder';

const KPI_DOT_COLORS = {
  'Total Calls': '#2883ff',
  'Connected Calls': '#42b311',
  'Missed Calls': '#f4372a',
  'Follow-ups': '#f1a013',
  'Conversion Signal': '#a1e2b3',
};

const DEFAULT_LAYOUTS = {
  lg: [
    { i: 'founder-kpi-pills', x: 0, y: 0, w: 12, h: 1 },
    { i: 'founder-annual-revenue', x: 0, y: 1, w: 6, h: 4 },
    { i: 'founder-monthly-revenue', x: 6, y: 1, w: 6, h: 4 },
    { i: 'founder-pipeline', x: 0, y: 5, w: 12, h: 4 },
    { i: 'founder-top-performers', x: 0, y: 9, w: 12, h: 3 },
  ],
};

const useChartConfig = () => {
  const { getConfig } = useContext(ChartConfigRegistryContext);
  const cardId = useContext(CardIdContext);
  return getConfig(cardId, CHART_DEFAULTS[cardId]);
};

const AnnualRevenueTarget = () => {
  const { chartType, colors, actualValue, targetValue, potentialValue } = useChartConfig();
  const current = actualValue ?? 62;
  const target = targetValue ?? 100;
  const potential = potentialValue ?? 150;

  return (
    <>
      <div style={{ flex: 1, minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 12 }} className="relative w-full">
        <ResponsiveContainer width="100%" height={220}>
          {chartType === 'bar' ? (
            <BarChart data={[
              { name: 'Current', value: Number(current) },
              { name: 'Target', value: Number(target) },
              { name: 'AI Potential', value: Number(potential) },
            ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 12 }} />
              <YAxis hide />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={48}>
                <Cell fill={colors.arc1} />
                <Cell fill={colors.arc2} />
                <Cell fill={colors.arc2} />
              </Bar>
            </BarChart>
          ) : (
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
                <Cell fill={colors.arc1} />
                <Cell fill={colors.arc2} />
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
        {chartType !== 'bar' && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-between px-4 text-[10px] text-[#949494]">
            <span>0</span>
            <span>10K</span>
            <span>20K</span>
            <span>40K</span>
            <span>60K</span>
            <span>80K</span>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 px-2">
        <div>
          <div className="text-[10px] text-[#949494]">CURRENT</div>
          <div className="text-[15px] font-semibold text-[#585858]">{current}K</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494]">TARGET</div>
          <div className="text-[15px] font-semibold text-[#585858]">{target}K</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494] flex items-center gap-1">
            <Sparkle />AI POTENTIAL
          </div>
          <div className="text-[15px] font-semibold text-[#585858]">{potential}K</div>
        </div>
      </div>
    </>
  );
};

const MonthlyRevenueTarget = () => {
  const { chartType, colors, showGrid, showLabels, actualValue, targetValue, potentialValue } = useChartConfig();
  const current = actualValue ?? 5;
  const target = targetValue ?? 10;
  const potential = potentialValue ?? 12;

  return (
    <>
      <div style={{ flex: 1, minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 0' }}>
        <ResponsiveContainer width="100%" height={80}>
          {chartType === 'donut' ? (
            <PieChart>
              <Pie
                data={monthlyRevenueData.map((d) => ({ value: d.a })).concat(
                  monthlyRevenueData.map((d) => ({ value: d.b })),
                  monthlyRevenueData.map((d) => ({ value: d.c })),
                )}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={15}
                outerRadius={28}
                stroke="none"
              >
                <Cell fill={colors.seg1} />
                <Cell fill={colors.seg2} />
                <Cell fill={colors.seg3} />
              </Pie>
            </PieChart>
          ) : (
            <BarChart data={monthlyRevenueData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" horizontal={false} strokeOpacity={showGrid ? 1 : 0} />
              <XAxis type="number" domain={[0, 12000]} ticks={[0, 2000, 4000, 6000, 8000, 10000]}
                axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }}
                tickFormatter={(v) => v === 0 ? '0' : `${v / 1000}K`} />
              <YAxis type="category" dataKey="name" hide />
              <Bar dataKey="a" stackId="r" fill={colors.seg1} barSize={32} radius={[4, 0, 0, 4]}>
                {showLabels && <LabelList dataKey="a" position="center" formatter={(v) => `${v / 1000}K`} fill="#ffffff" fontSize={10} />}
              </Bar>
              <Bar dataKey="b" stackId="r" fill={colors.seg2} barSize={32}>
                {showLabels && <LabelList dataKey="b" position="center" formatter={(v) => `${v / 1000}K`} fill="#ffffff" fontSize={10} />}
              </Bar>
              <Bar dataKey="c" stackId="r" fill={colors.seg3} barSize={32} radius={[0, 4, 4, 0]}>
                {showLabels && <LabelList dataKey="c" position="center" formatter={(v) => `${v / 1000}K`} fill="#585858" fontSize={10} />}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-8 px-2" style={{ flexShrink: 0 }}>
        <div>
          <div className="text-[10px] text-[#949494]">CURRENT</div>
          <div className="text-[15px] font-semibold text-[#585858]">{current}K</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494]">TARGET</div>
          <div className="text-[15px] font-semibold text-[#585858]">{target}K</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494] flex items-center gap-1">
            <Sparkle />AI POTENTIAL
          </div>
          <div className="text-[15px] font-semibold text-[#585858]">{potential}K</div>
        </div>
      </div>
    </>
  );
};

const PipelineChart = () => {
  const { chartType, colors, showGrid, showValues } = useChartConfig();

  if (chartType === 'funnel') {
    return <PipelineFunnel data={pipelineData} color={colors.primary} showLabels={showValues} />;
  }

  if (chartType === 'line') {
    return (
      <LineChart data={pipelineData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" vertical={false} strokeOpacity={showGrid ? 1 : 0} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} />
        <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
        <Line type="monotone" dataKey="value" stroke={colors.primary} strokeWidth={2} dot={{ r: 4 }}>
          {showValues && <LabelList dataKey="value" position="top" />}
        </Line>
      </LineChart>
    );
  }

  return (
    <BarChart data={pipelineData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" vertical={false} strokeOpacity={showGrid ? 1 : 0} />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} />
      <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
      <Bar dataKey="value" fill={colors.primary} barSize={48} radius={[4, 4, 0, 0]}>
        {showValues && <LabelList dataKey="value" position="top" />}
      </Bar>
    </BarChart>
  );
};

const FounderView = () => {
  const { getConfig } = useContext(ChartConfigRegistryContext);
  const kpiColor = getConfig('founder-kpi-pills', {}).colors?.primary;
  const performersColor = getConfig('founder-top-performers', {}).colors?.primary;

  const annualTableData = {
    columns: ['Metric', 'Value'],
    rows: [['Current', '62K'], ['Target', '100K'], ['AI Potential', '150K']],
  };

  const monthlyTableData = {
    columns: ['Metric', 'Value'],
    rows: [['Current', '5K'], ['Target', '10K'], ['AI Potential', '12K']],
  };

  const pipelineTableData = {
    columns: ['Stage', 'Count'],
    rows: pipelineData.map((d) => [d.name, d.value]),
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

  const handleDuplicate = (cardTitle, cardId) => {
    const id = Date.now();
    const widgetId = `added-widget-${id}`;
    setAddedWidgets((prev) => [...prev, { id, name: `${cardTitle} (Copy)`, type: cardId, sourceCardId: cardId }]);
    updateLayouts((prev) => ({
      ...prev,
      lg: [...prev.lg, { i: widgetId, x: 0, y: Infinity, w: 6, h: 3, minW: 3, minH: 2 }],
    }));
  };

  const cards = {
    'founder-kpi-pills': (
      <Card cardId="founder-kpi-pills">
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, width: '100%' }}>
          {adminKpis.map((kpi) => (
            <div
              key={kpi.label}
              style={{
                display: 'flex', padding: 16, flexDirection: 'column', alignItems: 'flex-start', gap: 12,
                flex: '1 0 0', borderRadius: 12, border: '1px solid #e0e0e0', background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
                <div className="flex items-center gap-2">
                  <div style={{ width: 10, height: 10, borderRadius: 100, background: KPI_DOT_COLORS[kpi.label] || kpi.color }} />
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
    'founder-annual-revenue': (
      <Card cardId="founder-annual-revenue" title="Annual Revenue Target" data={annualTableData} hasChart onDuplicate={handleDuplicate}>
        <CardHeader title="Annual Revenue Target" />
        <AnnualRevenueTarget />
        <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858]">
          <span>Improve 30% + lift in calls to conversion</span>
          <span className="font-semibold cursor-pointer hover:underline transition-colors duration-150">Check how</span>
        </div>
      </Card>
    ),
    'founder-monthly-revenue': (
      <Card cardId="founder-monthly-revenue" title="Monthly Revenue Target" data={monthlyTableData} hasChart onDuplicate={handleDuplicate}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center" style={{ gap: 12 }}>
            <h3 className="font-semibold text-[#000000]" style={{ fontFamily: 'Inter', fontSize: 18, lineHeight: '120%', letterSpacing: '-0.09px' }}>Monthly Revenue Target</h3>
            <FilterListIcon sx={{ fontSize: 20 }} style={{ color: '#737373' }} />
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[11px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-1.5 hover:bg-[#f4f6f8] transition-colors duration-150">
              Check how to improve
            </button>
            <ConnectedCardMenu />
          </div>
        </div>
        <MonthlyRevenueTarget />
      </Card>
    ),
    'founder-pipeline': (
      <Card cardId="founder-pipeline" title="Pipeline conversation" data={pipelineTableData} onDuplicate={handleDuplicate}>
        <CardHeader title="Pipeline conversation" />
        <div className="mb-3">
          <span className="bg-[#eaf7e9] text-[#3ca30f] text-[11px] font-medium rounded-full px-3 py-1">
            AI projects 28% conversion by Q3
          </span>
        </div>
        <div className="flex items-stretch flex-1 min-h-0">
          <div className="flex-1 h-full flex flex-col">
            <ResponsiveContainer width="100%" height="100%">
              <PipelineChart />
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
    ),
    'founder-top-performers': (
      <Card cardId="founder-top-performers" title="Top Performers" onDuplicate={handleDuplicate}>
        <CardHeader title="Top Performers" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <PerformersTable data={repPerformanceTable} color={performersColor} />
        </div>
      </Card>
    ),
  };

  const widgetCards = {};
  addedWidgets.forEach((w) => {
    const widgetId = `added-widget-${w.id}`;
    widgetCards[widgetId] = (
      <Card cardId={widgetId} title={w.name} onDuplicate={handleDuplicate} onRemove={() => {
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
    <DashboardGrid layouts={layouts} onLayoutChange={(_, all) => updateLayouts(all)}>
      {Object.keys(allCards).map((id) => (
        <div key={id}>{allCards[id]}</div>
      ))}
    </DashboardGrid>
  );
};

export default FounderView;
