import CallMergeIcon from '@mui/icons-material/CallMerge';
import ContactsIcon from '@mui/icons-material/Contacts';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CallIcon from '@mui/icons-material/Call';
import InboxIcon from '@mui/icons-material/Inbox';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { SidebarIcon } from './SharedUI';

const Sidebar = () => (
  <div
    className="shrink-0"
    style={{
      width: 56,
      padding: '12px 8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      background: 'linear-gradient(179deg, #7ed3cf -6.5%, #a1e2b3 111.31%)',
      borderRight: '1px solid #e0e0e0',
      borderLeft: '1px solid #e0e0e0',
    }}
  >
    <SidebarIcon icon={CallMergeIcon} />
    <SidebarIcon icon={ContactsIcon} active />
    <SidebarIcon icon={HeadphonesIcon} />
    <SidebarIcon icon={CallIcon} />
    <SidebarIcon icon={InboxIcon} />
    <SidebarIcon icon={SpaceDashboardIcon} />
  </div>
);

export default Sidebar;
