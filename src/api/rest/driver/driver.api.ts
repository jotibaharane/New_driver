import apiClient from '@api/client/axios.client';
import {
  CustomerPostRequest,
  driverOnlineOfflineRequest,
  LoadVerificationImages,
  PostDriverPayload,
} from './driver.types';

export const availableVehicle = (payload: PostDriverPayload) =>
  apiClient.post('/Insert_driver_load_post', payload).then(r => r.data);

export const driverOnlineOffline = (payload: driverOnlineOfflineRequest) =>
  apiClient.post('/Driver_online_offline_status', payload).then(r => r.data);

export const getDriverInfoByMobile = (payload: {
  MobileNo?: string;
  vendorid?: string;
}) => apiClient.post('/driver_location_by_mobile', payload).then(r => r.data);

export const postCustomerOtpVerify = (payload: CustomerPostRequest) =>
  apiClient.post('/Customer_PostStatus', payload).then(r => r.data);

export const postCustomerLoadAccept = (payload: any) =>
  apiClient.post('/Customer_PostStatus', payload).then(r => r.data);

export const postLoadingStatusPhotos = (payload: LoadVerificationImages) =>
  apiClient.post('/loading_Image', payload).then(r => r.data);

export const postCustomerLoadLoaded = (payload: any) =>
  apiClient.post('/Customer_PostStatus', payload).then(r => r.data);
