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
