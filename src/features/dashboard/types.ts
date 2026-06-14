import type React from 'react';

export type KpiCardColor = 'blue' | 'red' | 'orange' | 'green';

export type StatusBadgeVariant = 'Booking' | 'Missed' | 'Closed' | 'Inquiry' | 'AI Answered';

export interface Tab {
  label: string;
  value: string;
  icon: React.ElementType;
}

export interface KpiCardConfig {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: KpiCardColor;
}

export interface SecondaryMetricConfig {
  title: string;
  value: string;
  trendUp: boolean;
}

export interface ColumnDef {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
}

export interface TableRow {
  id: string;
  name: string;
  statusDotColor: string;
  contact: string;
  assignedTo: string;
  assignedIcon?: boolean; // shows ✦ marker icon
  lastCallDate: string;
  lastCallTime: string;
  category: StatusBadgeVariant;
}

export interface DashboardConfig {
  title: string;
  description: string;
  tabs: Tab[];
  kpiCards: KpiCardConfig[];
  secondaryMetrics: SecondaryMetricConfig[];
  tableColumns: ColumnDef[];
  tableRows: TableRow[];
}
