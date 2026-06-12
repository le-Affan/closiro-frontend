import { SidebarIcon } from './SharedUI';
import { ICONS } from './icons';

const Sidebar = () => (
  <div
    className="w-14 flex flex-col items-center py-4 gap-3 shrink-0"
    style={{ background: 'linear-gradient(167deg, rgb(126,211,207) 6.5%, rgb(161,226,179) 111%)' }}
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
