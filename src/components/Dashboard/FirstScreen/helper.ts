import { Notification, QuickAction } from './types';

export const quickActions: QuickAction[] = [
  { id: '1', icon: 'camera', label: 'Load Post', color: '#2196f3' },
  { id: '2', icon: 'note-plus', label: 'Duty Log', color: '#4caf50' },
  { id: '3', icon: 'gas-station', label: 'Fuel Log', color: '#ff9800' },
  { id: '4', icon: 'wrench', label: 'Maintenance', color: '#9c27b0' },
  { id: '5', icon: 'weather-night', label: 'Night Mode', color: '#673ab7' },
  { id: '6', icon: 'alert', label: 'Report Issue', color: '#f44336' },
  { id: '7', icon: 'map-marker-path', label: 'Route Info', color: '#00bcd4' },
  { id: '8', icon: 'clipboard-check', label: 'Check-in', color: '#8bc34a' },
];

export const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'Route Update',
    message: 'Traffic alert on I-95 North. Consider alternate route.',
    time: '10 min ago',
    read: false,
    type: 'warning',
  },
  {
    id: '2',
    title: 'Delivery Confirmed',
    message: 'Delivery #789456 has been checked in at Detroit DC.',
    time: '45 min ago',
    read: true,
    type: 'success',
  },
  {
    id: '3',
    title: 'Maintenance Due',
    message: 'Vehicle service due in 250 miles.',
    time: '2 hours ago',
    read: false,
    type: 'info',
  },
];
