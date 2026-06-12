import { useState, useEffect, useContext } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, DownArrow, DotsIcon, Sparkle, PerformersTable, DraggableCard, ChartConfigContext } from './SharedUI';
import { adminKpis, pipelineData, monthlyRevenueData, repPerformanceTable } from '../data/mockData';

const AnnualRevenueTarget = () => {
  const { colors, actualValue, targetValue, potentialValue } = useContext(ChartConfigContext);
  const current = actualValue ?? '62K';
  const target = targetValue ?? '100K';
  const potential = potentialValue ?? '150K';

  return (
    <>
      <div style={{ height: 180 }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
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
              <Cell fill={colors.primary} />
              <Cell fill="#dbf2f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-1 left-0 right-0 flex justify-between px-4 text-[10px] text-[#949494]">
          <span>0</span>
          <span>10K</span>
          <span>20K</span>
          <span>40K</span>
          <span>60K</span>
          <span>80K</span>
        </div>
      </div>
      <div className="flex justify-between mt-4 px-2">
        <div>
          <div className="text-[10px] text-[#949494]">CURRENT</div>
          <div className="text-[15px] font-semibold text-[#585858]">{current}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494]">TARGET</div>
          <div className="text-[15px] font-semibold text-[#585858]">{target}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494] flex items-center gap-1">
            <Sparkle />AI POTENTIAL
          </div>
          <div className="text-[15px] font-semibold text-[#585858]">{potential}</div>
        </div>
      </div>
    </>
  );
};

const MonthlyRevenueTarget = () => {
  const { colors, showGrid, actualValue, targetValue, potentialValue } = useContext(ChartConfigContext);
  const current = actualValue ?? '5K';
  const target = targetValue ?? '10K';
  const potential = potentialValue ?? '12K';

  return (
    <>
      <div style={{ height: 60 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyRevenueData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" horizontal={false} strokeOpacity={showGrid ? 1 : 0} />
            <XAxis type="number" domain={[0, 12000]} ticks={[0, 2000, 4000, 6000, 8000, 10000]}
              axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }}
              tickFormatter={(v) => v === 0 ? '0' : `${v / 1000}K`} />
            <YAxis type="category" dataKey="name" hide />
            <Bar dataKey="a" stackId="r" fill={colors.primary} barSize={32} radius={[4, 0, 0, 4]} />
            <Bar dataKey="b" stackId="r" fill="#80cc60" barSize={32} />
            <Bar dataKey="c" stackId="r" fill="#cdeec1" barSize={32} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-8 px-2">
        <div>
          <div className="text-[10px] text-[#949494]">CURRENT</div>
          <div className="text-[15px] font-semibold text-[#585858]">{current}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494]">TARGET</div>
          <div className="text-[15px] font-semibold text-[#585858]">{target}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#949494] flex items-center gap-1">
            <Sparkle />AI POTENTIAL
          </div>
          <div className="text-[15px] font-semibold text-[#585858]">{potential}</div>
        </div>
      </div>
    </>
  );
};

const FounderView = () => {
  const cards = {
    kpis: (
      <Card>
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
    <div className="grid grid-cols-2 gap-5">
      {/* Annual Revenue Target */}
      <Card data={[{ name: 'Current', value: 62 }, { name: 'Remaining', value: 38 }]}>
        <CardHeader title="Annual Revenue Target" />
        <AnnualRevenueTarget />
        <div className="mt-4 bg-[#eaf7e9] rounded-lg px-4 py-2 flex items-center justify-between text-[12px] text-[#585858]">
          <span>Improve 30% + lift in calls to conversion</span>
          <span className="font-semibold cursor-pointer">Check how</span>
        </div>
      </Card>

      {/* Monthly Revenue Target */}
      <Card data={monthlyRevenueData.map((d) => ({ name: d.name, value: d.a + d.b + d.c }))}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[13px] font-semibold text-[#585858]">Monthly Revenue Target</h3>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#bebebe" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[11px] font-medium text-[#585858] border border-[#e0e0e0] rounded-lg px-3 py-1.5">
              Check how to improve
            </button>
            <DotsIcon />
          </div>
        </div>
        <MonthlyRevenueTarget />
      </Card>
    </div>
    ),
    pipeline: (
      <Card>
        <CardHeader title="Pipeline conversation" />
        <div className="mb-3">
          <span className="bg-[#eaf7e9] text-[#3ca30f] text-[11px] font-medium rounded-full px-3 py-1">
            AI projects 28% conversion by Q3
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex-1" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} />
                <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }} />
                <Bar dataKey="value" fill="#7ed3cf" barSize={48} radius={[4, 4, 0, 0]}>
                  {pipelineData.map((entry, i) => (
                    <Cell key={i} fill={entry.name === 'Won' ? '#3ca30f' : '#7ed3cf'} />
                  ))}
                </Bar>
              </BarChart>
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
      <Card>
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

export default FounderView;
