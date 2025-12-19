import * as Yup from 'yup';
import {
  Delivery,
  Driver,
  DriverStatus,
  Notification,
  QuickAction,
} from './types';
// ==================== DUMMY DATA ====================
export const driverData: Driver = {
  id: 'DRV001',
  name: 'Michael Johnson',
  licenseNumber: 'CDL-789456',
  vehicleNumber: 'TRK-7890',
  vehicleType: '18-Wheeler',
  totalHours: 62.5,
  remainingHours: 7.5,
  status: 'active',
  currentLocation: 'I-95 N, Mile Marker 245',
  nextRestStop: 'Rest Area - 25 miles',
  todaysEarnings: 425.5,
  weeklyEarnings: 2850.75,
  totalDistance: 1250,
  fuelLevel: 78,
  engineTemp: 185,
  speed: 65,
};

export const deliveriesData: Delivery[] = [
  {
    id: 'DEL001',
    reference: '#789456',
    client: 'Global Logistics Inc.',
    pickup: 'Warehouse 45, Chicago',
    destination: 'Distribution Center 12, Detroit',
    status: 'in-transit',
    estimatedArrival: 'Today, 18:30',
    distance: 280,
    weight: 18000,
    priority: 'high',
    progress: 65,
  },
  {
    id: 'DEL002',
    reference: '#789457',
    client: 'Food Supplies Co.',
    pickup: 'Farm Fresh Market, Detroit',
    destination: 'Super Mart, Cleveland',
    status: 'pending',
    estimatedArrival: 'Tomorrow, 14:00',
    distance: 170,
    weight: 12000,
    priority: 'medium',
    progress: 0,
  },
  {
    id: 'DEL003',
    reference: '#789458',
    client: 'Tech Equipment Ltd.',
    pickup: 'Tech Park, St. Louis',
    destination: 'Business Center, Chicago',
    status: 'delivered',
    estimatedArrival: 'Completed',
    distance: 300,
    weight: 8000,
    priority: 'high',
    progress: 100,
  },
];

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

export const getStatusColor = (status: DriverStatus) => {
  switch (status) {
    case 'active':
      return '#4caf50';
    case 'on-break':
      return '#ff9800';
    case 'off-duty':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

export const getStatusIcon = (status: DriverStatus) => {
  switch (status) {
    case 'active':
      return 'run-fast';
    case 'on-break':
      return 'coffee';
    case 'off-duty':
      return 'sleep';
    default:
      return 'account';
  }
};

// Add validation schema
export const VehicleMakeSchema = Yup.object().shape({
  vehicleMake: Yup.string()
    .required('Vehicle make is required')
    .min(2, 'Vehicle make must be at least 2 characters')
    .max(50, 'Vehicle make must be less than 50 characters'),
  licensePlate: Yup.string()
    .required('License plate is required')
    .min(3, 'License plate must be at least 3 characters')
    .max(20, 'License plate must be less than 20 characters'),
  availabilityHours: Yup.number()
    .required('Availability hours is required')
    .min(1, 'Must be at least 1 hour')
    .max(24, 'Cannot exceed 24 hours'),
  currentLocation: Yup.string().required('Current location is required'),
  notes: Yup.string().max(200, 'Notes must be less than 200 characters'),
});
