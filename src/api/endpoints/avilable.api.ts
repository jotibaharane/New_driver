import apiClient from '@api/base';
import { ENV } from '@config/env';
import axios from 'axios';

export const avialbleVehicle = async (payload: any): Promise<any> => {
  const response = await apiClient.post('/Insert_driver_load_post', payload);
  return response.data;
};

export const getDriverInfoByMobile = async (payload: {
  MobileNo?: String;
  vendorid?: String;
}): Promise<any> => {
  const response = await apiClient.post('/driver_location_by_mobile', payload);
  return response.data;
};

export const getCoordinateDetails = async ({
  LATITUDE,
  LONGITUDE,
}: {
  LATITUDE: any;
  LONGITUDE: any;
}) => {
  const resp = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${ENV.MAP_API_KEY}`,
  );
  return resp;
};
