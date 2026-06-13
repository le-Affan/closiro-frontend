import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface EscalationBannerProps {
  isVisible: boolean;
  reason: string;
  onEscalate: () => void;
  onDismiss: () => void;
}

export function EscalationBanner({ isVisible, reason, onEscalate, onDismiss }: EscalationBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-error-50 border border-error-200 rounded-lg p-3 flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <WarningAmberIcon sx={{ width: 20, height: 20 }} className="text-error-600 mt-0.5 shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-error-900">Escalation Suggested</h3>
          <p className="text-xs text-error-700 mt-0.5">{reason}</p>
        </div>
      </div>
      <div className="flex space-x-2 shrink-0 ml-4">
        <button onClick={onDismiss} className="text-xs text-error-700 hover:text-error-900 px-2 py-1">
          Dismiss
        </button>
        <button onClick={onEscalate} className="text-xs bg-error-600 text-white hover:bg-error-700 px-3 py-1 rounded shadow-sm transition-colors">
          Escalate Call
        </button>
      </div>
    </div>
  );
}
