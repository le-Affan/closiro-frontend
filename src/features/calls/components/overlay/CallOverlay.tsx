import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CallControlDock } from './CallControlDock';
import { TranscriptPanel } from './TranscriptPanel';

export function CallOverlay() {
  const [isCallActive, setIsCallActive] = useState(true);
  const [callDuration, setCallDuration] = useState(842); // 14:02
  const [activeTab, setActiveTab] = useState<'transcript' | 'ai'>('transcript');
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(true);

  useEffect(() => {
    if (!isCallActive) return;
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCallActive]);

  if (!isCallActive) return null;

  const overlayContent = (
    <>
      {/* Transcript Panel: Fixed, right-aligned to Profile sidebar, bottom-aligned above the dock */}
      {isTranscriptOpen && (
        <div 
          className="fixed z-[9998]"
          style={{
            bottom: '100px', // 16px (dock bottom) + 72px (dock height) + 24px (gap)
            right: '16px',  // Exactly flush with the 320px Profile sidebar
          }}
        >
          <TranscriptPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={() => setIsTranscriptOpen(false)}
          />
        </div>
      )}

      {/* Call Dock: Fixed, horizontally centered, bottom aligned */}
      <div 
        className="fixed z-[9999]"
        style={{
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <CallControlDock
          duration={callDuration}
          isTranscriptOpen={isTranscriptOpen}
          onToggleTranscript={() => setIsTranscriptOpen(!isTranscriptOpen)}
          onEndCall={() => setIsCallActive(false)}
        />
      </div>
    </>
  );

  return createPortal(overlayContent, document.body);
}
