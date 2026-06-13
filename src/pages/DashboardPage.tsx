import { useState } from 'react';
import ProfileSwitcher from '@/components/ProfileSwitcher';
import PageHeader from '@/components/PageHeader';
import AgentView from '@/components/AgentView';
import ManagerView from '@/components/ManagerView';
import FounderView from '@/components/FounderView';
import { ChartConfigRegistryProvider } from '@/components/SharedUI';

export default function DashboardPage() {
  const [selectedProfile, setSelectedProfile] = useState('Sales Manager');
  const isAgent = selectedProfile === 'Sales Agent';
  const isAdmin = selectedProfile === 'Admin/Founder';
  const isManager = selectedProfile === 'Sales Manager';

  return (
    <ChartConfigRegistryProvider>
      <ProfileSwitcher selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
      <div className="p-6 flex flex-col gap-5 overflow-y-auto">
        <PageHeader selectedProfile={selectedProfile} />

        {isAgent && <AgentView />}
        {isManager && <ManagerView />}
        {isAdmin && <FounderView />}
      </div>
    </ChartConfigRegistryProvider>
  );
}
