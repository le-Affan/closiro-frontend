import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import RingVolumeOutlinedIcon from '@mui/icons-material/RingVolumeOutlined';

const NAV2_ITEMS: any[] = [
  { label: 'Live', icon: RingVolumeOutlinedIcon },
  { label: 'Data', icon: DatasetOutlinedIcon },
  { label: 'Information', icon: InfoOutlinedIcon, active: true },
  { label: 'Insights', icon: BarChartOutlinedIcon },
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
