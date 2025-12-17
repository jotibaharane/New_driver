import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (driverId: string) => {
  if (!socket) {
    socket = io('https://motohelpindia.com', {
      transports: ['websocket'],
      query: { driverId }, // identify driver without token
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
    });

    socket.on('connect', () => {
      console.log('✅ Connected to socket:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
