import React from 'react';

interface CallTimerProps {
  duration: number;
}

export function CallTimer({ duration }: CallTimerProps) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="text-white font-semibold text-[18px] tracking-wider w-[50px] text-center flex items-center justify-center">
      {formatTime(duration)}
    </div>
  );
}
