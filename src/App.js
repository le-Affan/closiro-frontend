import { useState } from 'react';
import ProfileSwitcher from './components/ProfileSwitcher';
import Sidebar from './components/Sidebar';
import SecondSidebar from './components/SecondSidebar';
import TopBar from './components/TopBar';
import PageHeader from './components/PageHeader';
import AgentView from './components/AgentView';
import ManagerView from './components/ManagerView';
import FounderView from './components/FounderView';
import { ChartConfigRegistryProvider } from './components/SharedUI';

function App() {
  const [selectedProfile, setSelectedProfile] = useState('Sales Manager');
  const isAgent = selectedProfile === 'Sales Agent';
  const isAdmin = selectedProfile === 'Admin/Founder';
  const isManager = selectedProfile === 'Sales Manager';

  return (
    <ChartConfigRegistryProvider>
      <div className="w-[1440px] overflow-x-hidden flex tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
        <ProfileSwitcher selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
        <Sidebar />
        <SecondSidebar />

        {/* Main content */}
        <div className="flex-1 bg-white flex flex-col">
          <TopBar />

          {/* Page content */}
          <div className="p-6 flex flex-col gap-5 overflow-y-auto">
            <PageHeader selectedProfile={selectedProfile} />

            {isAgent && <AgentView />}
            {isManager && <ManagerView />}
            {isAdmin && <FounderView />}
          </div>
        </div>
      </div>
    </ChartConfigRegistryProvider>
  );
}

export default App;
