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
    socket.emit(SOCKET_EVENTS.DRIVER_LOCATION, {
      DriverID: payload?.DriverID,
      lat: payload?.lat,
      lng: payload?.lng,
    });
  };

  if (socket.connected) {
    emit();
  } else {
    socket.once('connect', emit);
  }
};

export const emitAcceptLoad = (payload: {
  loadId: string;
  DriverID: string;
  CustomerID: string;
}) => {
  const socket = getSocket();

  const emit = () => {
    socket.emit(SOCKET_EVENTS.LOAD_ACCEPT, payload);
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
    // console.log('📤 Emitting JOIN for driver:', driverId);
    //   socket.emit(SOCKET_EVENTS.ROOM_JOIN, {
    //   DriverID: driverId,
    // });
    socket.emit(SOCKET_EVENTS.JOIN, {
      DriverID: driverId,
      lat: 19.1418,
      lng: 72.9313,
    });
  };

  if (socket.connected) {
    emit();
  } else {
    socket.once('connect', emit);
  }
};
