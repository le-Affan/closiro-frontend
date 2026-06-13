import React from 'react';
import { AppSidebar } from '@/layout/AppSidebar';
import { ModuleNav } from '@/layout/ModuleNav';
import { CallsList } from '@/features/calls/components/CallsList';
import { ConversationPanel } from '@/features/conversation/components/ConversationPanel';
import { CustomerProfilePanel } from '@/features/crm/components/CustomerProfilePanel';
import { NotesSection } from '@/features/notes/components/NotesSection';
import { CRMIntegrationCard } from '@/features/crm/components/CRMIntegrationCard';
import { ActivityTimeline } from '@/features/crm/components/ActivityTimeline';
import { TopNavbar } from '@/layout/TopNavbar';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* 1. App Level Navigation */}
      <AppSidebar />
      
      {/* Main Column that takes up full width (or right side if sidebar was present) */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        
        {/* Global Top Navbar */}
        <TopNavbar />
        
        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* 2. Module Level Navigation */}
          <ModuleNav />

          {/* 3. Calls List Panel */}
          <CallsList />

          {/* 4. Active Conversation Center Panel */}
          <ConversationPanel />

          {/* 5. Right Sidebar: Customer Profile Context */}
          <CustomerProfilePanel customerId="123" name="Andrew Smith" role="VP of Sales" company="Stark Industries">
            <NotesSection targetId="123" targetType="customer" />
            
            <CRMIntegrationCard 
              provider="salesforce" 
              data={{
                name: 'Pepper Potts',
                title: 'Regional Manager',
                company: 'Stark Industries [US]',
                owner: 'Tony Stark'
              }} 
            />
            
            <ActivityTimeline 
              title="Open Activities"
              activities={[]}
            />
            
            <ActivityTimeline 
              title="Activities History"
              activities={[]}
            />
          </CustomerProfilePanel>
        </div>
      </div>
    </div>
  );
}

export default App;
