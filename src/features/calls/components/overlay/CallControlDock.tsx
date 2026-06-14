import React from 'react';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TagIcon from '@mui/icons-material/Tag';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShareIcon from '@mui/icons-material/Share';
import CallIcon from '@mui/icons-material/Call';

import { CallControlButton } from './CallControlButton';
import { CallTimer } from './CallTimer';

interface CallControlDockProps {
  duration: number;
  isTranscriptOpen: boolean;
  onToggleTranscript: () => void;
  onEndCall: () => void;
}

export function CallControlDock({ duration, isTranscriptOpen, onToggleTranscript, onEndCall }: CallControlDockProps) {
  return (
    <div className="bg-black rounded-xl shadow-2xl px-8 py-1.5 flex items-center h-[72px] w-[58vw] mx-auto relative">
      <div className="flex items-center gap-6">
        <CallControlButton
          icon={<AutoFixNormalIcon sx={{ fontSize: 24 }} />}
          label="AI"
          active={isTranscriptOpen}
          onClick={onToggleTranscript}
        />
        <CallControlButton
          icon={<MicNoneIcon sx={{ fontSize: 24 }} />}
          label="Mute"
          onClick={() => { }}
        />
        <CallControlButton
          icon={<PauseCircleOutlinedIcon sx={{ fontSize: 24 }} />}
          label="Hold"
          onClick={() => { }}
        />
        <CallControlButton
          icon={<SwapHorizIcon sx={{ fontSize: 24 }} />}
          label="Transfer"
          onClick={() => { }}
        />
        <CallControlButton
          icon={<TagIcon sx={{ fontSize: 24 }} />}
          label="Keypad"
          onClick={() => { }}
        />
        <CallControlButton
          icon={<RadioButtonCheckedIcon sx={{ fontSize: 24 }} />}
          label="Record"
          onClick={() => { }}
        />
        <CallControlButton
          icon={<PersonAddAltIcon sx={{ fontSize: 24 }} />}
          label="Add"
          onClick={() => { }}
        />
        <CallControlButton
          icon={<ShareIcon sx={{ fontSize: 24 }} />}
          label="Share"
          onClick={() => { }}
        />
      </div>

      <div className="absolute right-6 flex items-center gap-6 pl-5 border-l border-white/10 h-[40px]">
        <CallTimer duration={duration} />

        <button
          onClick={onEndCall}
          className="flex items-center justify-center gap-1.5 bg-[#ea4335] hover:bg-[#d93025] text-white px-5 py-2.5 rounded-[6px] transition-colors font-medium text-[14px] tracking-wide"
        >
          <CallIcon sx={{ fontSize: 24 }} />
          END
        </button>
      </div>
    </div>
  );
}
