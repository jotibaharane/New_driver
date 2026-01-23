// socket.listeners.ts
import { store } from '@store/index';
import { setTripStatus } from '@store/slices/authSlice';
import { setCustomerLocations } from '@store/slices/mapSlice';
import { SOCKET_EVENTS } from './socket.events';
import { getSocket } from './socket.service';

let attached = false;

export const registerSocketListeners = () => {
  if (attached) return;
  const socket = getSocket();

  const handler = () => {
    if (attached) return;
    attached = true;

    console.log('🟢 Listeners attached');

    socket.on(SOCKET_EVENTS.AVAILABLE_LOADS, loads => {
      console.log('📦 Loads:', loads);
      store.dispatch(setCustomerLocations(loads));
    });

    socket.on(SOCKET_EVENTS.DRIVER_STATUS, data => {
      console.log('🔔 STATUS:', data);
      store.dispatch(setTripStatus(data?.LPStatus));
    });
    // socket.on('driver:start_tracking', data => {
    //   console.log('▶ Load Assigned: ' + JSON.stringify(data));
    // });
    // socket.on(SOCKET_EVENTS.NEW_LOAD, load => {
    //   console.log('🆕 New Load:', load);
    //   store.dispatch(setCustomerLocations([load]));
    // });
  };

  socket.connected ? handler() : socket.once('connect', handler);
};
