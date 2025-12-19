import { ENV } from '@config/env';
import axios from 'axios';

export const getCoordinateDetails = ({
  LATITUDE,
  LONGITUDE,
}: {
  LATITUDE: number;
  LONGITUDE: number;
}) =>
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    params: {
      latlng: `${LATITUDE},${LONGITUDE}`,
      key: ENV.MAP_API_KEY,
    },
  });
