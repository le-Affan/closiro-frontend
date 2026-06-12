// ---------- shared mock data ----------
export const trendData = [
  { month: 'Jan', connected: 70, followups: 20, missed: 30, calls: 40 },
  { month: 'Feb', connected: 65, followups: 25, missed: 35, calls: 45 },
  { month: 'Mar', connected: 75, followups: 20, missed: 40, calls: 50 },
  { month: 'Apr', connected: 80, followups: 25, missed: 45, calls: 60 },
  { month: 'May', connected: 70, followups: 30, missed: 60, calls: 70 },
  { month: 'Jun', connected: 75, followups: 25, missed: 55, calls: 90 },
  { month: 'Jul', connected: 85, followups: 30, missed: 50, calls: 110 },
  { month: 'Aug', connected: 80, followups: 35, missed: 45, calls: 90 },
  { month: 'Sep', connected: 90, followups: 30, missed: 40, calls: 70 },
  { month: 'Oct', connected: 85, followups: 35, missed: 35, calls: 95 },
  { month: 'Nov', connected: 95, followups: 30, missed: 30, calls: 110 },
  { month: 'Dec', connected: 100, followups: 25, missed: 30, calls: 100 },
];

export const leadSourceData = [
  { name: 'Inbound', value: 45 },
  { name: 'Outbound', value: 30 },
  { name: 'Referral', value: 10 },
  { name: 'Discounts', value: 50 },
  { name: 'Meta Ads', value: 10 },
  { name: 'Emails', value: 45 },
  { name: 'Social Media', value: 30 },
];

export const repData = [
  { name: 'Isabella Wilson', score: 80, color: '#3ca30f' },
  { name: 'Ava Chen', score: 80, color: '#3ca30f' },
  { name: 'Liam Johnson', score: 73, color: '#3ca30f' },
  { name: 'Sofia Martinez', score: 70, color: '#3ca30f' },
  { name: 'Ethan Garcia', score: 68, color: '#f1a013' },
  { name: 'Mia Rodriguez', score: 63, color: '#f1a013' },
  { name: 'Noah Lee', score: 40, color: '#f1a013' },
  { name: 'Olivia Brown', score: 20, color: '#de3226' },
];

export const pipelineData = [
  { name: 'New', value: 20 },
  { name: 'Discovery', value: 18 },
  { name: 'Proposal', value: 14 },
  { name: 'Negotiation', value: 7 },
  { name: 'Won', value: 7 },
];

export const monthlyRevenueData = [
  { name: 'rev', a: 5000, b: 3000, c: 2000 },
];

export const kpis = [
  { label: 'Total Calls', value: '1209', color: '#2477e8' },
  { label: 'Connected Calls', value: '842', color: '#3ca30f' },
  { label: 'Missed Calls', value: '198', color: '#de3226' },
  { label: 'Follow-ups', value: '78', color: '#f1a013' },
  { label: 'Conversion Signal', value: '24', color: '#62a5a2' },
];

// ---------- profile-scoped mock data (Sales Agent) ----------
export const agentStats = [
  { label: 'Calls Today', display: '21 / 25', pct: 84 },
  { label: 'Conversion Rate', display: '14% / 18%', pct: 78 },
  { label: 'Pipeline Deals', display: '4', pct: 40 },
  { label: 'Rank', display: '#2 of 8', pct: 88 },
];

export const personalTargets = [
  { label: 'Calls/Day', current: '21', target: '25', pct: 84 },
  { label: 'Conversion Rate', current: '14%', target: '18%', pct: 78 },
  { label: 'Monthly Revenue', current: '5K', target: '8K', pct: 63 },
];

export const myPipelineData = [
  { name: 'New', value: 3 },
  { name: 'Discovery', value: 2 },
  { name: 'Proposal', value: 2 },
  { name: 'Negotiation', value: 1 },
  { name: 'Won', value: 1 },
];

// ---------- profile-scoped mock data (Admin/Founder) ----------
export const adminKpis = [
  { label: 'Total Calls', value: '1209', color: '#2477e8' },
  { label: 'Connected Calls', value: '842', color: '#3ca30f' },
  { label: 'Revenue This Month', value: '62K', color: '#62a5a2' },
  { label: 'AI Projected Revenue', value: '82K', color: '#f1a013' },
  { label: 'Conversion Signal', value: '24', color: '#62a5a2' },
];

export const repPerformanceTable = [
  { name: 'Isabella Wilson', score: 80, calls: 142, conversion: '32%' },
  { name: 'Ava Chen', score: 80, calls: 138, conversion: '31%' },
  { name: 'Liam Johnson', score: 73, calls: 120, conversion: '28%' },
  { name: 'Sofia Martinez', score: 70, calls: 115, conversion: '27%' },
  { name: 'Ethan Garcia', score: 68, calls: 108, conversion: '24%' },
  { name: 'Mia Rodriguez', score: 63, calls: 99, conversion: '22%' },
  { name: 'Noah Lee', score: 40, calls: 75, conversion: '15%' },
  { name: 'Olivia Brown', score: 20, calls: 54, conversion: '9%' },
];
