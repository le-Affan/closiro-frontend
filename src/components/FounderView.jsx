import { useState, useEffect, useContext } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList,
} from 'recharts';
import { Card, CardHeader, ConnectedCardMenu, DownArrow, Sparkle, PerformersTable, PipelineFunnel, DraggableCard, ChartConfigRegistryContext, CardIdContext, CHART_DEFAULTS } from './SharedUI';
import { adminKpis, pipelineData, monthlyRevenueData, repPerformanceTable } from '../data/mockData';

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
      <div style={{ height: 180 }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
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
      <div style={{ height: 60 }}>
        <ResponsiveContainer width="100%" height="100%">
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
      <div className="flex justify-between mt-8 px-2">
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

  const [targetsOrder, setTargetsOrder] = useState([0, 1]);
  const handleTargetsReorder = (from, to) => {
    setTargetsOrder((order) => {
      const next = [...order];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const cards = {
    kpis: (
      <Card cardId="founder-kpi-pills">
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
    ),
    targets: (
    <div className="flex gap-6">
      {targetsOrder.map((cardKey, index) => (
        <DraggableCard key={cardKey} index={index} onReorder={handleTargetsReorder} className="flex-1">
          {cardKey === 0 ? (
            <Card cardId="founder-annual-revenue" data={annualTableData} hasChart>
              <CardHeader title="Annual Revenue Target" />
              <AnnualRevenueTarget />
              <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858]">
                <span>Improve 30% + lift in calls to conversion</span>
                <span className="font-semibold cursor-pointer hover:underline transition-colors duration-150">Check how</span>
              </div>
            </Card>
          ) : (
            <Card cardId="founder-monthly-revenue" data={monthlyTableData} hasChart>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[13px] font-semibold text-[#585858]">Monthly Revenue Target</h3>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#bebebe" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
          )}
        </DraggableCard>
      ))}
    </div>
    ),
    pipeline: (
      <Card cardId="founder-pipeline" data={pipelineTableData}>
        <CardHeader title="Pipeline conversation" />
        <div className="mb-3">
          <span className="bg-[#eaf7e9] text-[#3ca30f] text-[11px] font-medium rounded-full px-3 py-1">
            AI projects 28% conversion by Q3
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex-1" style={{ height: 240 }}>
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
    performers: (
      <Card cardId="founder-top-performers">
        <CardHeader title="Top Performers" />
        <PerformersTable data={repPerformanceTable} />
      </Card>
    ),
  };

  const [cardOrder, setCardOrder] = useState(['kpis', 'targets', 'pipeline', 'performers']);

  const handleReorder = (from, to) => {
    setCardOrder((order) => {
      const next = [...order];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const [addedWidgets, setAddedWidgets] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now();
      setAddedWidgets((prev) => [...prev, { name: e.detail.name, type: e.detail.type, id }]);
      setCardOrder((order) => [...order, `added-widget-${id}`]);
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
        setCardOrder((order) => order.filter((id) => id !== widgetId));
      }}>
        <CardHeader title={w.name} />
        <p className="text-[12px] text-[#949494]">Widget type: {w.type}</p>
      </Card>
    );
  });

  const allCards = { ...cards, ...widgetCards };

  return (
    <>
      {cardOrder.map((id, index) => (
        <DraggableCard key={id} index={index} onReorder={handleReorder}>
          {allCards[id]}
        </DraggableCard>
      ))}
    </>
  );
};

export default FounderView;
