import { useState, useEffect, useContext } from 'react';
import {
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { Card, CardHeader, RadialGauge, PipelineFunnel, DashboardGrid, ChartConfigRegistryContext, CardIdContext, CHART_DEFAULTS } from './SharedUI';
import { agentStats, personalTargets, myPipelineData } from '../data/mockData';

const LAYOUT_KEY = 'closira-layout-agent';

const DEFAULT_LAYOUTS = {
  lg: [
    { i: 'agent-stats-row', x: 0, y: 0, w: 12, h: 2 },
    { i: 'agent-targets', x: 0, y: 2, w: 12, h: 2 },
    { i: 'agent-pipeline', x: 0, y: 4, w: 6, h: 4 },
    { i: 'agent-performance', x: 6, y: 4, w: 6, h: 4 },
  ],
};

const useChartConfig = () => {
  const { getConfig } = useContext(ChartConfigRegistryContext);
  const cardId = useContext(CardIdContext);
  return getConfig(cardId, CHART_DEFAULTS[cardId]);
};

const MyPerformanceGauge = () => {
  const { colors } = useChartConfig();
  return (
    <RadialBarChart data={[{ value: Math.min(80, 100) }]} startAngle={90} endAngle={-270} innerRadius="65%" outerRadius="85%" barSize={14}>
      <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
      <RadialBar dataKey="value" cornerRadius={10} fill={colors.primary} background={{ fill: '#f1f1f1' }} />
    </RadialBarChart>
  );
};

const MyPerformanceLabel = () => {
  const { display } = useChartConfig();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {display !== 'rank' && <span className="text-[28px] font-semibold text-[#585858]">80%</span>}
      {display !== 'score' && <span className="text-[12px] text-[#949494]">Team Rank #2</span>}
    </div>
  );
};

const MyPipelineChart = () => {
  const { chartType, colors, showLabels } = useChartConfig();

  if (chartType === 'bar') {
    return (
      <div className="h-full flex flex-col">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={myPipelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} />
            <YAxis domain={[0, 3]} axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
            <Bar dataKey="value" fill={colors.primary} barSize={32} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return <PipelineFunnel data={myPipelineData} color={colors.primary} showLabels={showLabels} />;
};

const AgentView = () => {
  const { getConfig } = useContext(ChartConfigRegistryContext);
  const statsColor = getConfig('agent-stats-row', {}).colors?.primary;
  const targetsColor = getConfig('agent-targets', {}).colors?.primary;

  const pipelineTableData = {
    columns: ['Stage', 'Count'],
    rows: myPipelineData.map((d) => [d.name, d.value]),
  };

  const performanceTableData = {
    columns: ['Name', 'Score', 'Rank'],
    rows: [['Ava Chen', '80%', '#2 of 8']],
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
    'agent-stats-row': (
      <Card cardId="agent-stats-row" title="My Stats" onDuplicate={handleDuplicate}>
        <CardHeader title="My Stats" />
        <div className="flex-1 min-h-0 overflow-hidden flex items-center justify-around">
          {agentStats.map((s) => (
            <RadialGauge key={s.label} pct={s.pct} display={s.display} label={s.label} color={statsColor} />
          ))}
        </div>
      </Card>
    ),
    'agent-targets': (
      <Card cardId="agent-targets" title="Personal Targets" onDuplicate={handleDuplicate}>
        <CardHeader title="Personal Targets" />
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-col h-full justify-center overflow-y-auto">
            {personalTargets.map((t) => {
              const pct = Math.min(t.pct, 100);
              return (
                <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <span style={{ width: 160, fontSize: 14, color: '#585858' }}>{t.label}</span>
                  <div style={{ flex: 1, height: 12, background: '#f0f0f0', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ width: pct + '%', height: '100%', background: targetsColor || '#7ed3cf', borderRadius: 6 }} />
                  </div>
                  <span style={{ width: 80, textAlign: 'right', fontSize: 13, color: '#737373' }}>{t.current} / {t.target}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    ),
    'agent-pipeline': (
      <Card cardId="agent-pipeline" title="My Pipeline" data={pipelineTableData} onDuplicate={handleDuplicate}>
        <CardHeader title="My Pipeline" />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <MyPipelineChart />
        </div>
        <div className="mt-2 text-center text-[12px] font-semibold text-[#3ca30f] shrink-0">12% Conversion to Won</div>
      </Card>
    ),
    'agent-performance': (
      <Card cardId="agent-performance" title="My Performance" data={performanceTableData} onDuplicate={handleDuplicate}>
        <CardHeader title="My Performance" />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col items-center justify-center gap-2 py-2">
          <div className="relative" style={{ width: 180, height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <MyPerformanceGauge />
            </ResponsiveContainer>
            <MyPerformanceLabel />
          </div>
          <span className="text-[13px] font-medium text-[#585858]">Ava Chen</span>
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

export default AgentView;
