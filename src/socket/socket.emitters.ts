// socket.emitters.ts
import { SOCKET_EVENTS } from './socket.events';
import { getSocket } from './socket.service';

export const emitDriverJoin = (driverId: string, vendorId: string) => {
  const socket = getSocket();
  const emit = () =>
    socket.emit(SOCKET_EVENTS.JOIN, {
      userId: driverId,
      role: 'driver',
      VendorID: vendorId,
    });

  socket.connected ? emit() : socket.once('connect', emit);
};

export const emitDriverLocation = (payload: {
  DriverID: string;
  lat: number;
  lng: number;
}) => {
  const socket = getSocket();
  const emit = () => socket.emit(SOCKET_EVENTS.DRIVER_LOCATION, payload);

  socket.connected ? emit() : socket.once('connect', emit);
};

export const emitAcceptLoad = (payload: {
  loadId: string;
  DriverID: string;
}) => {
  const socket = getSocket();
  const emit = () => socket.emit(SOCKET_EVENTS.LOAD_ACCEPT, payload);

  socket.connected ? emit() : socket.once('connect', emit);
};
