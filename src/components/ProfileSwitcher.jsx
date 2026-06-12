// ---------- profile switcher (self-contained, delete this block to remove) ----------
const ProfileSwitcher = ({ selectedProfile, setSelectedProfile }) => (
  <div className="fixed top-3 right-3" style={{ zIndex: 9999 }}>
    <select
      value={selectedProfile}
      onChange={(e) => setSelectedProfile(e.target.value)}
      className="bg-white border border-[#e0e0e0] rounded-lg text-[12px] text-[#585858] px-3 py-1.5 shadow-sm"
    >
      <option value="Sales Agent">Sales Agent</option>
      <option value="Sales Manager">Sales Manager</option>
      <option value="Admin/Founder">Admin/Founder</option>
    </select>
  </div>
);

export default ProfileSwitcher;
