// socket.events.ts
export const SOCKET_EVENTS = {
  JOIN: 'join',
  DRIVER_LOCATION: 'driver:location',
  AVAILABLE_LOADS: 'driver:available_loads',
  LOAD_ACCEPT: 'driver:accept_load',
  NEW_LOAD: 'driver:new_load',
  // local
  UPDATE_STATUS: 'driver:update_status',
  DRIVER_STATUS: 'driver:lp_status_updated',
};
