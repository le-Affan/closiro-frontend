import React, { useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { PrimaryKpiCard } from './PrimaryKpiCard';
import { SecondaryMetricCard } from './SecondaryMetricCard';
import { DashboardTable } from './DashboardTable';
import { FilterPopover } from './FilterPopover';
import { PeriodPopover } from './PeriodPopover';
import { CustomisePopover } from './CustomisePopover';
import { SearchPopover } from './SearchPopover';
import type { DashboardConfig } from '../types';

interface DashboardPageTemplateProps {
  config: DashboardConfig;
}

export function DashboardPageTemplate({ config }: DashboardPageTemplateProps) {
  const [activeTab, setActiveTab] = useState(config.tabs[0]?.value ?? '');
  const [activeMenu, setActiveMenu] = useState<'search' | 'filter' | 'period' | 'customise' | null>(null);

  const toggleMenu = (menu: 'search' | 'filter' | 'period' | 'customise') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-white px-6 py-5 gap-5">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900 tracking-tight leading-tight">{config.title}</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{config.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[14px] font-medium text-[#585858] hover:bg-neutral-50 transition-colors">
            <FileUploadOutlinedIcon sx={{ fontSize: 18 }} />
            Export
          </button>
          <button className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-neutral-100 transition-colors text-[#585858]">
            <MoreVertIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* ── Tabs + Right filter ── */}
      {config.tabs.length > 0 && (
        <div className="flex items-center justify-between -mb-3">
          <div className="flex items-center gap-0">
            {config.tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold tracking-wider uppercase transition-colors border-b-2 -mb-px ${
                    isActive
                      ? 'border-[#62a5a2] text-[#62a5a2]'
                      : 'border-transparent text-[#949494] hover:text-[#585858] hover:bg-neutral-50'
                  }`}
                >
                  <Icon sx={{ fontSize: 16 }} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 pb-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[14px] text-[#62a5a2] border-2 border-[#62a5a2] rounded-md bg-[#f4fafa] hover:bg-[#ebf5f5] transition-colors">
              <span className="font-medium">Krati Surana</span>
              <ArrowDropDownIcon sx={{ fontSize: 22, ml: -0.5 }} />
            </button>
            <button className="flex items-center justify-center w-[36px] h-[36px] rounded-md border-2 border-[#62a5a2] hover:bg-neutral-50 transition-colors text-[#62a5a2]">
              <CalendarMonthIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between mb-0">
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors mr-2 shadow-sm border-none outline-none leading-none h-[30px]">
            New Segment
            <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => toggleMenu('search')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-md transition-colors border-none outline-none leading-none h-[30px] ${activeMenu === 'search' ? 'bg-neutral-100 text-neutral-900' : 'text-[#585858] hover:bg-neutral-100'}`}
            >
              <SearchIcon sx={{ fontSize: 16 }} />
              Search
            </button>
            {activeMenu === 'search' && <SearchPopover />}
          </div>

          <div className="relative">
            <button 
              onClick={() => toggleMenu('filter')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-md transition-colors border-none outline-none leading-none h-[30px] ${activeMenu === 'filter' ? 'bg-neutral-100 text-neutral-900' : 'text-[#585858] hover:bg-neutral-100'}`}
            >
              <FilterListIcon sx={{ fontSize: 16 }} />
              Filter
            </button>
            {activeMenu === 'filter' && <FilterPopover />}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => toggleMenu('period')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-md transition-colors border-none outline-none leading-none h-[30px] ${activeMenu === 'period' ? 'bg-neutral-100 text-neutral-900' : 'text-[#585858] hover:bg-neutral-100'}`}
            >
              <DateRangeIcon sx={{ fontSize: 16 }} />
              Period
            </button>
            {activeMenu === 'period' && <PeriodPopover />}
          </div>

          <div className="relative">
            <button 
              onClick={() => toggleMenu('customise')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-md transition-colors border-none outline-none leading-none h-[30px] ${activeMenu === 'customise' ? 'bg-neutral-100 text-neutral-900' : 'text-[#585858] hover:bg-neutral-100'}`}
            >
              <DashboardCustomizeOutlinedIcon sx={{ fontSize: 16 }} />
              Customise
            </button>
            {activeMenu === 'customise' && <CustomisePopover />}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#737373]">
          <span>Weekly updates</span>
          <InfoOutlinedIcon sx={{ fontSize: 14 }} />
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {/* ── Primary KPI Cards ── */}
        <div className="flex gap-4">
          {config.kpiCards.map((card, i) => (
            <PrimaryKpiCard key={i} {...card} />
          ))}
        </div>

        {/* ── Secondary Metric Cards ── */}
        <div className="flex gap-4">
          {config.secondaryMetrics.map((metric, i) => (
            <SecondaryMetricCard key={i} {...metric} />
          ))}
        </div>

        {/* ── Data Table ── */}
        <div className="mt-1 flex-1 min-h-0 bg-white rounded-lg border border-[#e5e5e5] overflow-hidden">
          <DashboardTable columns={config.tableColumns} rows={config.tableRows} />
        </div>
      </div>
    </div>
  );
}
