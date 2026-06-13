import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import DatasetIcon from '@mui/icons-material/Dataset';
import RingVolumeIcon from '@mui/icons-material/RingVolume';

const NAV2_ITEMS = [
  { label: 'Live', icon: BarChartIcon },
  { label: 'Data', icon: InfoIcon },
  { label: 'Information', icon: DatasetIcon, active: true },
  { label: 'Insights', icon: RingVolumeIcon },
];

const SecondSidebar = () => (
  <div
    className="shrink-0"
    style={{
      width: 224,
      padding: '12px 8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'stretch',
      background: '#fafafa',
      borderRight: '1px solid #eaeaea',
    }}
  >
    {NAV2_ITEMS.map((item) => {
      const Icon = item.icon;
      const color = item.active ? '#4c807d' : '#737373';
      return (
        <div
          key={item.label}
          className="cursor-pointer transition-colors duration-150 rounded"
          style={{
            width: 208,
            height: 36,
            padding: '0 4px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: item.active ? '#dbf8f7' : 'transparent',
          }}
        >
          <Icon sx={{ fontSize: 24, width: 24, height: 24, flexShrink: 0 }} style={{ color }} />
          <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color }}>{item.label}</span>
        </div>
      );
    })}
  </div>
);

export default SecondSidebar;
