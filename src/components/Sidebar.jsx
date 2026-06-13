import CallMergeIcon from '@mui/icons-material/CallMerge';
import ContactsIcon from '@mui/icons-material/Contacts';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CallIcon from '@mui/icons-material/Call';
import InboxIcon from '@mui/icons-material/Inbox';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { SidebarIcon } from './SharedUI';

const Logo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.84375 0.000792695C14.3473 0.000792695 18 3.65353 18 8.15704C18 8.62462 17.6238 9.00079 17.1562 9.00079C16.6887 9.00079 16.3125 8.62462 16.3125 8.15704C16.3125 4.58517 13.4156 1.68829 9.84375 1.68829C9.37617 1.68829 9 1.31212 9 0.844543C9 0.376965 9.37617 0.000792695 9.84375 0.000792695ZM10.125 6.75079C10.4234 6.75079 10.7095 6.86932 10.9205 7.0803C11.1315 7.29128 11.25 7.57742 11.25 7.87579C11.25 8.17416 11.1315 8.46031 10.9205 8.67129C10.7095 8.88227 10.4234 9.00079 10.125 9.00079C9.82663 9.00079 9.54048 8.88227 9.3295 8.67129C9.11853 8.46031 9 8.17416 9 7.87579C9 7.57742 9.11853 7.29128 9.3295 7.0803C9.54048 6.86932 9.82663 6.75079 10.125 6.75079ZM9 4.21954C9 3.75196 9.37617 3.37579 9.84375 3.37579C12.484 3.37579 14.625 5.51681 14.625 8.15704C14.625 8.62462 14.2488 9.00079 13.7812 9.00079C13.3137 9.00079 12.9375 8.62462 12.9375 8.15704C12.9375 6.44845 11.5523 5.06329 9.84375 5.06329C9.37617 5.06329 9 4.68712 9 4.21954ZM4.13086 0.0500114C4.81289 -0.136317 5.52656 0.21173 5.79727 0.865636L7.20352 4.24064C7.44258 4.81368 7.27734 5.47814 6.7957 5.86837L5.0625 7.28868C6.2332 9.76368 8.23711 11.7676 10.7121 12.9383L12.1289 11.2051C12.5227 10.7234 13.1836 10.5582 13.7566 10.7973L17.1316 12.2035C17.7855 12.4742 18.1336 13.1879 17.9473 13.8699L17.1035 16.9637C16.9383 17.5754 16.3828 18.0008 15.75 18.0008C7.05234 18.0008 0 10.9484 0 2.25079C0 1.61798 0.425391 1.06251 1.03711 0.893761L4.13086 0.0500114Z" fill="url(#paint0_linear_177_7159)" />
    <defs>
      <linearGradient id="paint0_linear_177_7159" x1="9" y1="0" x2="9" y2="18.0008" gradientUnits="userSpaceOnUse">
        <stop stopColor="#62A5A2" />
        <stop offset="1" stopColor="#7EB08C" />
      </linearGradient>
    </defs>
  </svg>
);

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
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        background: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Logo />
    </div>
    <SidebarIcon icon={InboxIcon} />
    <SidebarIcon icon={CallIcon} active />
    <SidebarIcon icon={HeadphonesIcon} />
    <SidebarIcon icon={ContactsIcon} />
    <SidebarIcon icon={CallMergeIcon} />
    <SidebarIcon icon={SpaceDashboardIcon} />
  </div>
);

export default Sidebar;
