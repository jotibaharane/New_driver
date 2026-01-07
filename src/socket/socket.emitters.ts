import { SOCKET_EVENTS } from './socket.events';
import { getSocket } from './socket.service';

export interface DriverLocationPayload {
  DriverID: string;
  VendorID: string;
  VehicleID: string;
  MobileNo: string;
  lat: string;
  lng: string;
  Speed: string;
  Direction: string;
  City: string;
  District: string;
  Taluka: string;
  State: string;
  Pincode: string;
  Address: string;
  Driver_LPStatus: string;
  Status: string;
}

// driver location send
export const emitDriverLocation = (payload: DriverLocationPayload) => {
  const socket = getSocket();
  if (!socket.connected) return;
  socket.emit(SOCKET_EVENTS.DRIVER_LOCATION, payload);
};

export const emitDriverJoin = (payload: any) => {
  const socket = getSocket();
  if (!socket.connected) return;
  socket.emit(SOCKET_EVENTS.JOIN, {
    userId: payload,
    role: 'driver',
  });
};
