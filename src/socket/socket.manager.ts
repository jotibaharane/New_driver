import { createSocket } from './socket.instance';

export const initSocket = (driverId: string) => {
  const socket = createSocket();
  socket.auth = { driverId };
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  const socket = createSocket();
  socket.disconnect();
};
