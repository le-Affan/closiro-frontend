import { useState, useEffect, useContext } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { Card, CardHeader, DownArrow, DraggableCard, ChartConfigContext } from './SharedUI';
import { kpis, trendData, repData, leadSourceData } from '../data/mockData';

const CallActivityChart = () => {
  const { chartType, colors, showLegend, showGrid } = useContext(ChartConfigContext);
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
        <Bar dataKey="connected" fill={colors.primary} />
        <Bar dataKey="followups" fill="#f9d392" />
        <Bar dataKey="missed" fill="#de3226" />
        <Bar dataKey="calls" fill="#2477e8" />
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
        <Line type="monotone" dataKey="connected" stroke={colors.primary} dot={false} />
        <Line type="monotone" dataKey="followups" stroke="#f1a013" dot={false} />
        <Line type="monotone" dataKey="missed" stroke="#de3226" dot={false} />
        <Line type="monotone" dataKey="calls" stroke="#2477e8" dot={false} />
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
      <Area type="monotone" dataKey="connected" stackId="1" stroke={colors.primary} fill={colors.primary} fillOpacity={0.7} />
      <Area type="monotone" dataKey="followups" stackId="1" stroke="#f1a013" fill="#f9d392" fillOpacity={0.7} />
      <Area type="monotone" dataKey="missed" stackId="1" stroke="#de3226" fill="#de3226" fillOpacity={0.5} />
      <Area type="monotone" dataKey="calls" stackId="1" stroke="#2477e8" fill="#2477e8" fillOpacity={0.5} />
    </AreaChart>
  );
};

const ConversionByLeadSourceChart = () => {
  const { colors, showGrid } = useContext(ChartConfigContext);
  return (
    <BarChart data={leadSourceData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="4 4" stroke="#eaeaea" horizontal={false} strokeOpacity={showGrid ? 1 : 0} />
      <XAxis type="number" domain={[0, 40]} ticks={[0, 10, 20, 30, 40]}
        axisLine={false} tickLine={false} tick={{ fill: '#949494', fontSize: 11 }}
        tickFormatter={(v) => `${v}%`} />
      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11 }} width={90} />
      <Bar dataKey="value" fill={colors.primary} barSize={14} radius={[0, 4, 4, 0]} />
    </BarChart>
  );
};

const ManagerView = () => {
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

  const cards = {
    trend: (
      <Card data={trendData.map((d) => ({ name: d.month, value: d.calls }))}>
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
        {period && (
          <div className="mb-3 text-[11px] text-[#737373] bg-[#f5f5f5] inline-block px-2.5 py-1 rounded-md">
            Showing data for: {period}
          </div>
        )}
        <div className="bg-[#fafafa] rounded-lg p-2" style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <CallActivityChart />
          </ResponsiveContainer>
        </div>
      </Card>
    ),
    reps: (
      <Card>
        <CardHeader title="Rep Performance Score" />
        <div className="flex flex-col gap-2.5">
          {filteredRepData.map((rep) => (
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
      <Card data={leadSourceData}>
        <CardHeader title="Conversion Rate by Lead Source" />
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ConversionByLeadSourceChart />
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
      {filters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <span key={f} className="bg-[#7ed3cf] text-white text-[11px] font-medium rounded-full px-3 py-1">{f}</span>
          ))}
        </div>
      )}
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
