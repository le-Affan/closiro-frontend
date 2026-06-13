interface ProfileSwitcherProps {
  selectedProfile: string;
  setSelectedProfile: (profile: string) => void;
}

// ---------- profile switcher (self-contained, delete this block to remove) ----------
const ProfileSwitcher = ({ selectedProfile, setSelectedProfile }: ProfileSwitcherProps) => (
  <div className="fixed top-3 right-3" style={{ zIndex: 9999 }}>
    <select
      value={selectedProfile}
      onChange={(e) => setSelectedProfile(e.target.value)}
      className="bg-white border border-[#e0e0e0] rounded-sm text-[13px] font-medium text-[#585858] px-3 py-1.5 shadow-sm hover:bg-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#7ed3cf] transition-colors duration-150 cursor-pointer"
    >
      <option value="Sales Agent">Sales Agent</option>
      <option value="Sales Manager">Sales Manager</option>
      <option value="Admin/Founder">Admin/Founder</option>
    </select>
  </div>
);

export default ProfileSwitcher;
