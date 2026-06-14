import React from 'react';
import { DashboardPageTemplate } from '@/features/dashboard/components/DashboardPageTemplate';
import { LiveDashboardConfig } from '@/features/dashboard/configs/LiveDashboardConfig';

export function LiveManagerView() {
  return <DashboardPageTemplate config={LiveDashboardConfig} />;
}
