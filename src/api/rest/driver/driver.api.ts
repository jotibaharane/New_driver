import apiClient from '@api/client/axios.client';
import { driverOnlineOfflineRequest, PostDriverPayload } from './driver.types';

export const availableVehicle = (payload: PostDriverPayload) =>
  apiClient.post('/Insert_driver_load_post', payload).then(r => r.data);

export const driverOnlineOffline = (payload: driverOnlineOfflineRequest) =>
  apiClient.post('/Driver_online_offline_status', payload).then(r => r.data);

export const getDriverInfoByMobile = (payload: {
  MobileNo?: string;
  vendorid?: string;
}) => apiClient.post('/driver_location_by_mobile', payload).then(r => r.data);
