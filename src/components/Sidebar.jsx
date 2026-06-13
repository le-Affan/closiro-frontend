import { SidebarIcon } from './SharedUI';
import { ICONS } from './icons';

const Sidebar = () => (
  <div
    className="w-14 flex flex-col items-center py-4 gap-3 shrink-0"
    style={{ background: 'linear-gradient(167deg, #7ed3cf 6.5%, #a1e2b3 111%)' }}
  >
    <SidebarIcon d={ICONS.grid} />
    <SidebarIcon d={ICONS.phone} active />
    <SidebarIcon d={ICONS.headset} />
    <SidebarIcon d={ICONS.briefcase} />
    <SidebarIcon d={ICONS.users} />
    <SidebarIcon d={ICONS.squares} />
  </div>
);

export default Sidebar;
