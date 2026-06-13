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
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function App() {
  const [selectedProfile, setSelectedProfile] = useState('Sales Manager');
  const isAgent = selectedProfile === 'Sales Agent';
  const isAdmin = selectedProfile === 'Admin/Founder';
  const isManager = selectedProfile === 'Sales Manager';

  return (
    <ChartConfigRegistryProvider>
      <div className="w-full overflow-x-hidden flex tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
        <ProfileSwitcher selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
        <Sidebar />

        {/* Header + (Sidenav_two + content) */}
        <div className="flex-1 flex flex-col">
          <TopBar />

          <div className="flex-1 flex">
            <SecondSidebar />

            {/* Main content */}
            <div className="flex-1 bg-white flex flex-col">
              {/* Page content */}
              <div className="p-6 flex flex-col gap-5 overflow-y-auto">
                <PageHeader selectedProfile={selectedProfile} />

                {isAgent && <AgentView />}
                {isManager && <ManagerView />}
                {isAdmin && <FounderView />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChartConfigRegistryProvider>
  );
}

export default App;
