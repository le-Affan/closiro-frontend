import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import type { DashboardConfig } from '../types';

export const LiveDashboardConfig: DashboardConfig = {
  title: 'Live',
  description: 'Track live call metrics, analyze outcomes, and identify key trends in real-time.',

  tabs: [],

  kpiCards: [
    {
      icon: CallIcon,
      title: 'Live Calls',
      value: '1,284',
      trend: '18.23%',
      trendUp: true,
      color: 'green',
    },
    {
      icon: PersonIcon,
      title: 'AI Agent Calls',
      value: '1,284',
      trend: '6.09%',
      trendUp: false,
      color: 'blue',
    },
    {
      icon: CallMergeIcon,
      title: 'On Hold',
      value: '1,284',
      trend: '7.34%',
      trendUp: true,
      color: 'orange',
    },
  ],

  secondaryMetrics: [
    { title: 'Call Duration', value: '03:20 Min', trendUp: true },
    { title: 'Inactive agents', value: '12', trendUp: false },
    { title: 'Conversions', value: '25', trendUp: true },
    { title: 'Abandon Calls', value: '25', trendUp: false },
    { title: 'Follow Up Calls', value: '50', trendUp: false },
    { title: 'Answered Calls', value: '13', trendUp: true },
  ],

  tableColumns: [
    { key: 'checkbox', label: '', width: '4%', sortable: false },
    { key: 'name', label: 'Name', width: '18%', sortable: true },
    { key: 'contact', label: 'Contact', width: '16%', sortable: true },
    { key: 'assignedTo', label: 'Assigned to', width: '16%', sortable: true },
    { key: 'lastCall', label: 'Last Call', width: '14%', sortable: true },
    { key: 'categories', label: 'Categories', width: '14%', sortable: true },
    { key: 'actions', label: 'Actions', width: '12%', sortable: false },
  ],

  tableRows: [
    {
      id: '1',
      name: 'Anya Sharma',
      statusDotColor: '#ef4444',
      contact: '+91 9876543210',
      assignedTo: 'Vikram Patel',
      assignedIcon: true,
      lastCallDate: '11/15/2024',
      lastCallTime: '10:15 AM',
      category: 'Booking',
    },
    {
      id: '2',
      name: 'Rajesh Agrawal',
      statusDotColor: '#ef4444',
      contact: '+91 8928899001',
      assignedTo: 'Jayesh Bhargav',
      assignedIcon: false,
      lastCallDate: '09/03/2026',
      lastCallTime: '03:00 PM',
      category: 'Missed',
    },
    {
      id: '3',
      name: 'Amit Joshi',
      statusDotColor: '#f59e0b',
      contact: '+91 9988776655',
      assignedTo: 'Nisha Mehta',
      assignedIcon: false,
      lastCallDate: '02/14/2025',
      lastCallTime: '11:45 AM',
      category: 'Closed',
    },
    {
      id: '4',
      name: 'Pooja Rao',
      statusDotColor: '#f59e0b',
      contact: '+91 9765432109',
      assignedTo: 'Tarun Singh',
      assignedIcon: true,
      lastCallDate: '03/28/2025',
      lastCallTime: '02:00 PM',
      category: 'Inquiry',
    },
    {
      id: '5',
      name: 'Deepak Nair',
      statusDotColor: '#16a34a',
      contact: '+91 9456123789',
      assignedTo: 'Anjali Desai',
      assignedIcon: true,
      lastCallDate: '04/10/2025',
      lastCallTime: '05:30 PM',
      category: 'AI Answered',
    },
  ],
};
