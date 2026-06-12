import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from 'recharts';
import { Card, CardHeader, DownArrow, DraggableCard } from './SharedUI';
import { kpis, trendData, repData, leadSourceData } from '../data/mockData';

const ManagerView = () => {
  const cards = {
    trend: (
      <Card>
        <CardHeader title="Call Activity Trend" />
        <div className="flex items-center gap-8 mb-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="flex items-center gap-2">
              <DownArrow color={kpi.color} />
              <div>
                <div className="text-[11px] text-[#949494]">{kpi.label}</div>
                <div className="text-[15px] font-semibold text-[#585858]">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#fafafa] rounded-lg p-2" style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
              <YAxis domain={[0, 300]} ticks={[0, 100, 200, 300]} axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="connected" stackId="1" stroke="#80cc60" fill="#80cc60" fillOpacity={0.7} />
              <Area type="monotone" dataKey="followups" stackId="1" stroke="#f1a013" fill="#f9d392" fillOpacity={0.7} />
              <Area type="monotone" dataKey="missed" stackId="1" stroke="#de3226" fill="#de3226" fillOpacity={0.5} />
              <Area type="monotone" dataKey="calls" stackId="1" stroke="#2477e8" fill="#2477e8" fillOpacity={0.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    ),
    reps: (
      <Card>
        <CardHeader title="Rep Performance Score" />
        <div className="flex flex-col gap-2.5">
          {repData.map((rep) => (
            <div key={rep.name} className="flex items-center gap-3">
              <span className="text-[11px] text-[#737373] w-28 shrink-0">{rep.name}</span>
              <div className="flex-1 h-1.5 bg-[#f1f1f1] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${rep.score}%`, backgroundColor: rep.color }} />
              </div>
              <span className="text-[11px] text-[#949494] w-8 text-right">{rep.score}%</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-4 text-[11px] text-[#737373]">
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
        <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858]">
          <span>Improve 30% + lift in calls to conversion</span>
          <span className="font-semibold cursor-pointer">Check how</span>
        </div>
      </Card>
    ),
    conversion: (
      <Card>
        <CardHeader title="Conversion Rate by Lead Source" />
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadSourceData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" horizontal={false} />
              <XAxis type="number" domain={[0, 40]} ticks={[0, 10, 20, 30, 40]}
                axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }}
                tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} width={90} />
              <Bar dataKey="value" fill="#7ed3cf" barSize={14} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    ),
  };

  const [cardOrder, setCardOrder] = useState(['trend', 'reps', 'conversion']);

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

export default ManagerView;
