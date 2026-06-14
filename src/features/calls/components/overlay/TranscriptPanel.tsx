import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TranscriptTab } from './TranscriptTab';
import { AISuggestionsTab } from './AISuggestionsTab';

import TranscribeIcon from '@mui/icons-material/Transcribe';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

interface TranscriptPanelProps {
  activeTab: 'transcript' | 'ai';
  onTabChange: (tab: 'transcript' | 'ai') => void;
  onClose: () => void;
}

export function TranscriptPanel({ activeTab, onTabChange, onClose }: TranscriptPanelProps) {
  return (
    <div className="w-[580px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 h-[250px]">
      <div className="flex items-center justify-between px-6 pt-5 pb-0 bg-white">
        <h2 className="text-[16px] font-semibold text-neutral-900 tracking-tight">Profile</h2>
        <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors rounded-full hover:bg-neutral-100 p-1 -mr-1">
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>
      </div>

      <div className="flex px-6 gap-6 ">
        <button
          onClick={() => onTabChange('transcript')}
          className={`flex items-center justify-center gap-2 py-3.5 px-2 text-[12px] font-semibold tracking-wider uppercase transition-colors border-b-[2px] ${
            activeTab === 'transcript' ? 'border-[#62a5a2] text-[#62a5a2]' : 'border-transparent text-[#949494] hover:text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          <TranscribeIcon sx={{ fontSize: 18 }} className={activeTab === 'transcript' ? 'text-[#62a5a2]' : 'text-[#949494]'} />
          Transcript
        </button>
        <button
          onClick={() => onTabChange('ai')}
          className={`flex items-center justify-center gap-2 py-3.5 px-2 text-[12px] font-semibold tracking-wider uppercase transition-colors border-b-[2px] ${
            activeTab === 'ai' ? 'border-[#62a5a2] text-[#62a5a2]' : 'border-transparent text-[#949494] hover:text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          <AutoFixNormalIcon sx={{ fontSize: 18 }} className={activeTab === 'ai' ? 'text-[#62a5a2]' : 'text-[#949494]'} />
          AI Suggestions
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'transcript' ? <TranscriptTab /> : <AISuggestionsTab />}
      </div>
    </div>
  );
}
