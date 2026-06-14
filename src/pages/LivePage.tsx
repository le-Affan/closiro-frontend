import React, { useState } from 'react';
import ProfileSwitcher from '@/components/ProfileSwitcher';
import { LiveAgentView } from '@/components/live/LiveAgentView';
import { LiveManagerView } from '@/components/live/LiveManagerView';

export default function LivePage() {
  const [selectedProfile, setSelectedProfile] = useState('Sales Agent');
  const isAgent = selectedProfile === 'Sales Agent';
  const isManager = selectedProfile === 'Sales Manager';

  return (
    <>
      <ProfileSwitcher selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        {isAgent && <LiveAgentView />}
        {isManager && <LiveManagerView />}
      </div>
    </>
  );
}
