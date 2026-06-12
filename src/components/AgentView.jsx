import {
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';
import { Card, CardHeader, RadialGauge, AnimatedProgressBar, PipelineFunnel } from './SharedUI';
import { agentStats, personalTargets, myPipelineData } from '../data/mockData';

const AgentView = () => (
  <>
    {/* My Stats */}
    <Card>
      <CardHeader title="My Stats" />
      <div className="flex items-center justify-around">
        {agentStats.map((s) => (
          <RadialGauge key={s.label} pct={s.pct} display={s.display} label={s.label} />
        ))}
      </div>
    </Card>

    {/* Personal Targets */}
    <Card>
      <CardHeader title="Personal Targets" />
      <div className="flex flex-col gap-4">
        {personalTargets.map((t) => (
          <AnimatedProgressBar key={t.label} label={t.label} current={t.current} target={t.target} pct={t.pct} />
        ))}
      </div>
    </Card>

    {/* My Pipeline */}
    <Card>
      <CardHeader title="My Pipeline" />
      <PipelineFunnel data={myPipelineData} />
      <div className="mt-2 text-center text-[12px] font-semibold text-[#3ca30f]">12% Conversion to Won</div>
    </Card>

    {/* My Performance */}
    <Card>
      <CardHeader title="My Performance" />
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="relative" style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={[{ value: 80 }]} startAngle={90} endAngle={-270} innerRadius="75%" outerRadius="100%" barSize={14}>
              <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
              <RadialBar dataKey="value" cornerRadius={10} fill="#7ed3cf" background={{ fill: '#f1f1f1' }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[28px] font-semibold text-[#585858]">80%</span>
            <span className="text-[12px] text-[#949494]">Team Rank #2</span>
          </div>
        </div>
        <span className="text-[13px] font-medium text-[#585858]">Ava Chen</span>
      </div>
    </Card>
  </>
);

export default AgentView;
