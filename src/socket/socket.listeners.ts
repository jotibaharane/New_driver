// import { getSocket } from './socket.service';

// let registered = false;

// export const registerSocketListeners = () => {
//   if (registered) return;
//   registered = true;
//   const socket = getSocket();
//   // socket.on(SOCKET_EVENTS.AVAILABLE_LOADS, loads => {
//   //   console.log('🟢 Driver Available Loads:', loads);
//   //   // store.dispatch(setTripStatus(status?.driverData?.[0]?.Driver_LPStatus));
//   // });

//   socket.on('driver:available_loads', loads => {
//     console.log('🚚 Nearby Load Received:\n' + JSON.stringify(loads, null, 2));
//     console.log('🚚 Loads array:', loads);
//   });
//   // socket.on(SOCKET_EVENTS.DRIVER_LP_FLAG, status => {
//   //   console.log('🟢 Driver LP Flag:', status);
//   //   store.dispatch(setTripStatus(status?.payload?.Driver_LPStatus));
//   // });
//   // socket.on(SOCKET_EVENTS.NEARBY_CUSTOMER_LOAD, status => {
//   //   console.log('🟢 Driver Customer:', status);
//   //   store.dispatch(setDriverLpList(status?.nearestCustomerpost?.data));
//   // });
//   // socket.on('driverLPFlag', status => {
//   //   console.log('🟢 driverLPFlag:', status);
//   //   // store.dispatch(setDriverLpList(status?.nearestCustomerpost?.data));
//   // });
// };

// socket.listeners.ts
import { store } from '@store/index';
import { setCustomerLocations } from '@store/slices/mapSlice';
import { SOCKET_EVENTS } from './socket.events';
import { getSocket } from './socket.service';

let registered = false;

export const registerSocketListeners = () => {
  if (registered) return;

  const socket = getSocket();

  const register = () => {
    if (registered) return;
    registered = true;

    console.log('🟢 Socket listeners registered');

    socket.on(SOCKET_EVENTS.AVAILABLE_LOADS, loads => {
      store.dispatch(setCustomerLocations(loads));
      console.log('🚚 Nearby Load Received:', JSON.stringify(loads, null, 2));
    });
    // NEW load
    socket.on(SOCKET_EVENTS.AVAILABLE_OLD, load => {
      console.log(
        '🚚 Nearby New Load Received:',
        JSON.stringify(load, null, 2),
      );
      store.dispatch(setCustomerLocations(load));
    });
  };

  if (socket.connected) {
    register();
  } else {
    socket.once('connect', register);
  }
};
