import React from 'react';
import { ConversationHeader } from './ConversationHeader';
import { ChatComposer } from './ChatComposer';
import { CallSummaryCard } from '@/features/ai/components/CallSummaryCard';
import { DiscussionTimeline } from './DiscussionTimeline';

interface ConversationPanelProps {
  // Normally would take a conversation ID and fetch data, or take the data via props
  children?: React.ReactNode; 
}

export function ConversationPanel({ children }: ConversationPanelProps) {
  return (
    <div className="flex flex-col flex-1 h-full bg-neutral-50">
      <ConversationHeader 
        contactName="Andrew Smith"
        initials="AS"
        phoneNumber="(415) 289-9580"
        status="Inquiry"
        avatarColorClass="bg-[#74A9FF] text-black"
      />
      
      {/* Scrollable middle area where Call Metadata and AI Summary will go */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* AI Summary and Timeline */}
        <div className="space-y-6">
          <CallSummaryCard 
            summary="Sarah expressed strong interest in our enterprise package. She's currently evaluating solutions for her team of 50+ members and mentioned budget approval is already secured. Key pain points include lack of integration with their current CRM and poor call quality with existing provider."
          >
            <div>
              <h4 className="text-[14px] font-semibold text-neutral-900 mb-2.5">Key Discussion Points</h4>
              <DiscussionTimeline 
                points={[
                  { id: '1', timestamp: '01:14', content: 'Asked about pricing options', type: 'warning' },
                  { id: '2', timestamp: '02:48', content: 'Requested site visit availability', type: 'positive' },
                  { id: '3', timestamp: '09:15', content: 'Inquired about payment plans', type: 'warning' },
                  { id: '4', timestamp: '11:45', content: 'Discussed contract terms', type: 'positive' },
                  { id: '5', timestamp: '13:30', content: 'Explored additional service options', type: 'warning' },
                  { id: '6', timestamp: '15:00', content: 'Set a follow-up meeting date', type: 'success' },
                ]}
              />
            </div>
            
            <div className="bg-[#EEF8ED] rounded-lg p-4 mt-4">
              <h4 className="text-[14px] font-semibold text-[#3B823D] mb-2">Follow-up Recommendation</h4>
              <ul className="text-[14px] text-[#3B823D] space-y-1.5 leading-relaxed">
                <li>Schedule demo within 48 hours. Prepare custom ROI presentation focusing on integration capabilities and call quality improvements.</li>
                <li><strong>Conduct a competitive analysis to highlight our advantages over key competitors.</strong></li>
                <li>Send a personalized thank-you email after the meeting, summarizing key discussion points.</li>
              </ul>
            </div>
          </CallSummaryCard>
        </div>

        {children}

      </div>

      <ChatComposer 
        onSendMessage={(msg) => {}}
        placeholder="New message as Billing" 
      />
    </div>
  );
}
