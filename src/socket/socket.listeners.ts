import { store } from '@store/index';
import { setDriverLpList } from '@store/slices/driverLp.slice';
import { SOCKET_EVENTS } from './socket.events';
import { getSocket } from './socket.service';

let registered = false;

export const registerSocketListeners = () => {
  if (registered) return;
  registered = true;
  const socket = getSocket();
  socket.on(SOCKET_EVENTS.DRIVER_LP_STATUS, status => {
    console.log('🟢 Driver LP Status:', status);
    // store.dispatch(setTripStatus(status?.Driver_LPStatus));
  });
  socket.on(SOCKET_EVENTS.NEARBY_CUSTOMER_LOAD, status => {
    console.log('🟢 Driver Customer:', status);
    store.dispatch(setDriverLpList(status?.nearestCustomerpost?.data));
  });
};
