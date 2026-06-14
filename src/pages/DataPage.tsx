import { DashboardPageTemplate } from '@/features/dashboard/components/DashboardPageTemplate';
import { DataDashboardConfig } from '@/features/dashboard/configs/DataDashboardConfig';

export default function DataPage() {
  return <DashboardPageTemplate config={DataDashboardConfig} />;
}
