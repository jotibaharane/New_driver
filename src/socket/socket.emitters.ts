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

export const emitDriverLocation = (payload: DriverLocationPayload) => {
  const socket = getSocket();

  const emit = () => {
    socket.emit(SOCKET_EVENTS.DRIVER_LOCATION, payload);
  };

  if (socket.connected) {
    emit();
  } else {
    socket.once('connect', emit);
  }
};

export const emitDriverJoin = (driverId: string) => {
  const socket = getSocket();

  const emit = () => {
    console.log('📤 Emitting JOIN for driver:', driverId);
    socket.emit(SOCKET_EVENTS.JOIN, {
      userId: driverId,
      role: 'driver',
    });
  };

  if (socket.connected) {
    emit();
  } else {
    socket.once('connect', emit);
  }
};
