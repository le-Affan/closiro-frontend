import { useState, useEffect, useContext } from 'react';
import {
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';
import { Card, CardHeader, RadialGauge, AnimatedProgressBar, PipelineFunnel, DraggableCard, ChartConfigContext } from './SharedUI';
import { agentStats, personalTargets, myPipelineData } from '../data/mockData';

const MyPerformanceGauge = () => {
  const { colors } = useContext(ChartConfigContext);
  return (
    <RadialBarChart data={[{ value: 80 }]} startAngle={90} endAngle={-270} innerRadius="75%" outerRadius="100%" barSize={14}>
      <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
      <RadialBar dataKey="value" cornerRadius={10} fill={colors.primary} background={{ fill: '#f1f1f1' }} />
    </RadialBarChart>
  );
};

const AgentView = () => {
  const cards = {
    stats: (
      <Card data={agentStats.map((s) => ({ name: s.label, value: s.pct }))}>
        <CardHeader title="My Stats" />
        <div className="flex items-center justify-around">
          {agentStats.map((s) => (
            <RadialGauge key={s.label} pct={s.pct} display={s.display} label={s.label} />
          ))}
        </div>
      </Card>
    ),
    targets: (
      <Card>
        <CardHeader title="Personal Targets" />
        <div className="flex flex-col gap-4">
          {personalTargets.map((t) => (
            <AnimatedProgressBar key={t.label} label={t.label} current={t.current} target={t.target} pct={t.pct} />
          ))}
        </div>
      </Card>
    ),
    pipeline: (
      <Card>
        <CardHeader title="My Pipeline" />
        <PipelineFunnel data={myPipelineData} />
        <div className="mt-2 text-center text-[12px] font-semibold text-[#3ca30f]">12% Conversion to Won</div>
      </Card>
    ),
    performance: (
      <Card data={[{ name: 'Team Rank #2', value: 80 }]}>
        <CardHeader title="My Performance" />
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="relative" style={{ width: 180, height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <MyPerformanceGauge />
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[28px] font-semibold text-[#585858]">80%</span>
              <span className="text-[12px] text-[#949494]">Team Rank #2</span>
            </div>
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
      setAddedWidgets((prev) => [...prev, { name: e.detail.name, type: e.detail.type, id: Date.now() }]);
    };
    window.addEventListener('addWidget', handler);
    return () => window.removeEventListener('addWidget', handler);
  }, []);

  return (
    <>
      {cardOrder.map((id, index) => (
        <DraggableCard key={id} index={index} onReorder={handleReorder}>
          {cards[id]}
        </DraggableCard>
      ))}
      {addedWidgets.map((w) => (
        <Card key={w.id}>
          <CardHeader title={w.name} />
          <p className="text-[12px] text-[#949494]">Widget type: {w.type}</p>
        </Card>
      ))}
    </>
  );
};

export default AgentView;
