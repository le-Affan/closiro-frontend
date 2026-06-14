import React from 'react';
import type { KpiCardColor } from '../types';const SPARKLINE_PATH = 'M 0 38 L 10 32 L 16 38 L 26 34 L 34 26 L 42 34 L 52 28 L 62 20 L 72 28 L 82 20 L 92 16 L 102 4 L 108 8 L 114 28 L 120 22 L 126 26 L 130 20';

const COLOR_MAP: Record<KpiCardColor, { bg: string; text: string }> = {
  blue:   { bg: '#2883ff', text: 'white' },
  red:    { bg: '#f4372a', text: 'white' },
  orange: { bg: '#f1a013', text: 'white' },
  green:  { bg: '#42b311', text: 'white' },
};

interface PrimaryKpiCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: KpiCardColor;
}

export function PrimaryKpiCard({ icon: Icon, title, value, trend, trendUp, color }: PrimaryKpiCardProps) {
  const c = COLOR_MAP[color];

  return (
    <div
      className="flex-1 min-w-0 rounded-[16px] p-5 flex flex-col relative overflow-hidden"
      style={{ backgroundColor: c.bg, color: c.text, minHeight: 130 }}
    >
      {/* Top row: icon + title + trend */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 opacity-95">
          <Icon sx={{ fontSize: 20, color: 'white' }} />
          <span className="text-[14px] font-medium tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-1 text-[14px] font-semibold tracking-wide">
          <span>{trend}</span>
          {trendUp ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10.5V1.5M6 1.5L2 5.5M6 1.5L10 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1.5V10.5M6 10.5L2 6.5M6 10.5L10 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>

      {/* Value */}
      <div className="text-[24px] font-bold tracking-tight mt-3 relative z-10">{value}</div>

      {/* Sparkline */}
      <div className="absolute bottom-4 right-4 opacity-90 z-0">
        <svg width="130" height="50" viewBox="0 0 130 50" fill="none">
          <defs>
            <linearGradient id={`sparkline-gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${SPARKLINE_PATH} L 130 50 L 0 50 Z`} fill={`url(#sparkline-gradient-${color})`} />
          <path d={SPARKLINE_PATH} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
