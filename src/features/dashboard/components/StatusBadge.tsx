import React from 'react';
import type { StatusBadgeVariant } from '../types';

const BADGE_STYLES: Record<StatusBadgeVariant, { border: string; text: string; bg: string }> = {
  'Booking':     { border: '#2563eb', text: '#2563eb', bg: '#eff6ff' },
  'Missed':      { border: '#ef4444', text: '#ef4444', bg: '#fef2f2' },
  'Closed':      { border: '#16a34a', text: '#16a34a', bg: '#f0fdf4' },
  'Inquiry':     { border: '#d97706', text: '#d97706', bg: '#fffbeb' },
  'AI Answered': { border: '#7c3aed', text: '#7c3aed', bg: '#f5f3ff' },
};

interface StatusBadgeProps {
  status: StatusBadgeVariant;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const s = BADGE_STYLES[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
      style={{ borderColor: s.border, color: s.text, backgroundColor: s.bg }}
    >
      {status}
    </span>
  );
}
