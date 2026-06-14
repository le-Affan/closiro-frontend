import React from 'react';

interface CallControlButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

export function CallControlButton({ icon, label, onClick, active, disabled }: CallControlButtonProps) {
  const bgClass = active ? 'bg-white/20' : 'bg-transparent hover:bg-white/10';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center w-[60px] h-[60px] rounded-lg transition-all duration-200 ${bgClass} text-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="mb-1.5 flex items-center justify-center">{icon}</div>
      <span className="text-[11px] font-medium leading-none tracking-wide">{label}</span>
    </button>
  );
}
