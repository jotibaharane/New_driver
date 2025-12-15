// types/DashboardTypes.ts
// ==================== TYPES ====================
export type DriverStatus = 'active' | 'on-break' | 'off-duty';
export type DeliveryStatus =
  | 'pending'
  | 'loading'
  | 'in-transit'
  | 'delivered'
  | 'delayed';
export type Priority = 'high' | 'medium' | 'low';

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  totalHours: number;
  remainingHours: number;
  status: DriverStatus;
  currentLocation: string;
  nextRestStop: string;
  todaysEarnings: number;
  weeklyEarnings: number;
  totalDistance: number;
  fuelLevel: number;
  engineTemp: number;
  speed: number;
}

export interface Delivery {
  id: string;
  reference: string;
  client: string;
  pickup: string;
  destination: string;
  status: DeliveryStatus;
  estimatedArrival: string;
  distance: number;
  weight: number;
  priority: Priority;
  progress: number;
}

export interface QuickAction {
  id: string;
  icon: string;
  label: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'alert' | 'success';
}

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
  { id: '1', icon: 'camera', label: 'Documents', color: '#2196f3' },
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
