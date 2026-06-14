import React from 'react';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export function AISuggestionsTab() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50">
      
      <div className="bg-white border border-[#e0e0e0] rounded-xl p-3 shadow-sm">
        <div className="flex items-start gap-2.5">
          <TrendingUpIcon sx={{ fontSize: 18 }} className="text-[#3ca30f] mt-0.5" />
          <div>
            <h4 className="text-[13px] font-semibold text-[#585858] mb-1">Upsell Opportunity</h4>
            <p className="text-[12px] text-[#737373] leading-relaxed">
              Customer mentioned integration pains with HubSpot. Pitch the "Enterprise Connect" add-on which includes native bi-directional sync.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#fef9f1] border border-[#f1a013]/30 rounded-xl p-3 shadow-sm">
        <div className="flex items-start gap-2.5">
          <WarningAmberIcon sx={{ fontSize: 18 }} className="text-[#f1a013] mt-0.5" />
          <div>
            <h4 className="text-[13px] font-semibold text-[#8a5b0b] mb-1">Price Objection Risk</h4>
            <p className="text-[12px] text-[#8a5b0b]/80 leading-relaxed">
              Customer hesitated when you mentioned 50 seats. Be prepared to offer the Q3 promotional discount (15% off annual).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#e0e0e0] rounded-xl p-3 shadow-sm">
        <div className="flex items-start gap-2.5">
          <LightbulbCircleIcon sx={{ fontSize: 18 }} className="text-[#2477e8] mt-0.5" />
          <div>
            <h4 className="text-[13px] font-semibold text-[#585858] mb-1">Suggested Response</h4>
            <p className="text-[12px] text-[#737373] leading-relaxed mb-2">
              "We have a promotional tier that fits perfectly for teams of 50, bringing the cost down while including all integration features."
            </p>
            <div className="flex gap-2">
              <button className="text-[11px] font-medium text-[#2477e8] bg-[#f0f6ff] px-2.5 py-1 rounded-md hover:bg-[#e0edff] transition-colors">
                Insert to Notes
              </button>
              <button className="text-[11px] font-medium text-[#585858] bg-[#f1f1f1] px-2.5 py-1 rounded-md hover:bg-[#e0e0e0] transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
