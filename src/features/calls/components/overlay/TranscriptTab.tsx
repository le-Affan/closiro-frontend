import React, { useEffect, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';

const MOCK_TRANSCRIPT = [
  { id: 1, speaker: 'Customer', name: 'Evelyn Hayes', text: 'Evelyn shares her thoughts on the recent market trends, focusing on tech stocks and their impressive gains. She touches upon the upcoming earnings reports and their possible effects on investor sentiment. Evelyn is optimistic about the market\'s resilience and future prospects.' },
  { id: 2, speaker: 'Agent', name: 'Ricardo Torres', text: 'Ricardo analyzes the current economic situation, with a special emphasis on inflation rates and their influence on consumer spending. He refers to the latest jobs report and its implications for the labor market. Ricardo remains cautious, advising a balanced approach to financial planning.' },
];

export function TranscriptTab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom on mount/update
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" ref={containerRef}>
      {MOCK_TRANSCRIPT.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-bold text-neutral-900">
              {msg.name}
            </span>
            {msg.speaker === 'Agent' && (
              <MicIcon sx={{ fontSize: 16 }} className="text-[#3ca30f]" />
            )}
          </div>
          <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
            {msg.text}
          </p>
        </div>
      ))}
    </div>
  );
}
