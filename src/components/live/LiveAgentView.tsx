import React from 'react';
import { CallsList } from '@/features/calls/components/CallsList';
import { ConversationPanel } from '@/features/conversation/components/ConversationPanel';
import { CustomerProfilePanel } from '@/features/crm/components/CustomerProfilePanel';
import { NotesSection } from '@/features/notes/components/NotesSection';
import { CRMIntegrationCard } from '@/features/crm/components/CRMIntegrationCard';
import { ActivityTimeline } from '@/features/crm/components/ActivityTimeline';
import { CallOverlay } from '@/features/calls/components/overlay/CallOverlay';

export function LiveAgentView() {
  return (
    <div className="flex flex-1 overflow-hidden relative">
      <CallsList />
      <ConversationPanel />
      <CustomerProfilePanel customerId="123" name="Andrew Smith" role="VP of Sales" company="Stark Industries">
        <NotesSection targetId="123" />
        <CRMIntegrationCard
          provider="salesforce"
          data={{
            name: 'Pepper Potts',
            title: 'Regional Manager',
            company: 'Stark Industries [US]',
            owner: 'Tony Stark'
          }}
        />
        <ActivityTimeline title="Open Activities" activities={[]} />
        <ActivityTimeline title="Activities History" activities={[]} />
      </CustomerProfilePanel>
      <CallOverlay />
    </div>
  );
}
