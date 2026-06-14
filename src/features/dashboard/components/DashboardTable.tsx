import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { StatusBadge } from './StatusBadge';
import type { ColumnDef, TableRow } from '../types';

interface DashboardTableProps {
  columns: ColumnDef[];
  rows: TableRow[];
}

export function DashboardTable({ columns, rows }: DashboardTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const allSelected = selectedRows.size === rows.length && rows.length > 0;

  const toggleAll = () => {
    if (allSelected) setSelectedRows(new Set());
    else setSelectedRows(new Set(rows.map(r => r.id)));
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-100">
            {/* Checkbox column */}
            <th className="w-10 px-4 py-3.5">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-neutral-300 cursor-pointer accent-[#4c9f9b]"
              />
            </th>
            {columns.map(col => (
              <th
                key={col.key}
                className="text-left px-3 py-3.5 text-[12px] font-semibold text-neutral-500"
                style={{ width: col.width }}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable !== false && (
                    <UnfoldMoreIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${i === rows.length - 1 ? 'border-b-0' : ''}`}
            >
              {/* Checkbox */}
              <td className="px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                  className="w-4 h-4 rounded border-neutral-300 cursor-pointer accent-[#4c9f9b]"
                />
              </td>

              {/* Name column */}
              <td className="px-3 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: row.statusDotColor }}
                  />
                  <span className="text-[13px] font-medium text-neutral-900">{row.name}</span>
                </div>
              </td>

              {/* Contact */}
              <td className="px-3 py-3.5 text-[13px] text-neutral-600">{row.contact}</td>

              {/* Assigned To */}
              <td className="px-3 py-3.5">
                <div className="flex items-center gap-1.5 text-[13px] text-neutral-700">
                  {row.assignedIcon && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#4c9f9b">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                  )}
                  <span>{row.assignedTo}</span>
                </div>
              </td>

              {/* Last Call */}
              <td className="px-3 py-3.5">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-neutral-800">{row.lastCallDate}</span>
                  <span className="text-[11px] text-neutral-400">{row.lastCallTime}</span>
                </div>
              </td>

              {/* Categories */}
              <td className="px-3 py-3.5">
                <StatusBadge status={row.category} />
              </td>

              {/* Actions */}
              <td className="px-3 py-3.5">
                <div className="flex items-center gap-3">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eff6ff] hover:bg-[#dbeafe] transition-colors">
                    <CallIcon sx={{ fontSize: 16, color: '#2563eb' }} />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500">
                    <AddIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer pagination */}
      <div className="flex items-center justify-end gap-4 px-4 py-3 border-t border-neutral-100">
        <div className="flex items-center gap-2 text-[12px] text-neutral-500">
          <span>Rows per page:</span>
          <select className="border border-neutral-200 rounded px-1.5 py-0.5 text-[12px] text-neutral-700 bg-white focus:outline-none">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <span className="text-[12px] text-neutral-500">1–10 of {rows.length}</span>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded border border-neutral-200 hover:bg-neutral-100 disabled:opacity-40" disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-neutral-200 hover:bg-neutral-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
