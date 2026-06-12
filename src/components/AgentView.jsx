import { useState, useEffect, useContext } from 'react';
import {
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { Card, CardHeader, RadialGauge, AnimatedProgressBar, PipelineFunnel, DraggableCard, ChartConfigRegistryContext, CardIdContext, CHART_DEFAULTS } from './SharedUI';
import { agentStats, personalTargets, myPipelineData } from '../data/mockData';

const useChartConfig = () => {
  const { getConfig } = useContext(ChartConfigRegistryContext);
  const cardId = useContext(CardIdContext);
  return getConfig(cardId, CHART_DEFAULTS[cardId]);
};

const MyPerformanceGauge = () => {
  const { colors } = useChartConfig();
  return (
    <RadialBarChart data={[{ value: 80 }]} startAngle={90} endAngle={-270} innerRadius="75%" outerRadius="100%" barSize={14}>
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
      <div style={{ height: 200 }}>
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

  const cards = {
    stats: (
      <Card cardId="agent-stats-row">
        <CardHeader title="My Stats" />
        <div className="flex items-center justify-around">
          {agentStats.map((s) => (
            <RadialGauge key={s.label} pct={s.pct} display={s.display} label={s.label} color={statsColor} />
          ))}
        </div>
      </Card>
    ),
    targets: (
      <Card cardId="agent-targets">
        <CardHeader title="Personal Targets" />
        <div className="flex flex-col gap-4">
          {personalTargets.map((t) => (
            <AnimatedProgressBar key={t.label} label={t.label} current={t.current} target={t.target} pct={t.pct} color={targetsColor} />
          ))}
        </div>
      </Card>
    ),
    pipeline: (
      <Card cardId="agent-pipeline" data={pipelineTableData}>
        <CardHeader title="My Pipeline" />
        <MyPipelineChart />
        <div className="mt-2 text-center text-[12px] font-semibold text-[#3ca30f]">12% Conversion to Won</div>
      </Card>
    ),
    performance: (
      <Card cardId="agent-performance" data={performanceTableData}>
        <CardHeader title="My Performance" />
        <div className="flex flex-col items-center gap-2 py-2">
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

  const [cardOrder, setCardOrder] = useState(['stats', 'targets', 'pipeline', 'performance']);

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

export default AgentView;
