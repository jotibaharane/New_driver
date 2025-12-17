import { getCoordinateDetails } from '@api/endpoints/avilable.api';
import Geolocation from '@react-native-community/geolocation';
import { useIsFocused } from '@react-navigation/native';
import { RootState } from '@store/index';
import { setdriverLocation } from '@store/slices/mapSlice';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../../socket';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import { getBearing, transformLocationToPayload } from './helper';
const ICON_FIX = 180;
const MainDashboard = () => {
  const { driverDetails, isOnline } = useSelector(
    (state: RootState) => state?.auth,
  );
  const prevLocation = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  useEffect(() => {
    const socket = getSocket();
    let watchId = null;
    if (isFocus) {
      watchId = Geolocation.watchPosition(
        async position => {
          try {
            const { latitude, longitude, speed } = position.coords;

            let direction = 0;

            if (prevLocation.current) {
              direction = getBearing(
                prevLocation.current.latitude,
                prevLocation.current.longitude,
                latitude,
                longitude,
              );
            }

            prevLocation.current = { latitude, longitude };

            dispatch(
              setdriverLocation({
                latitude,
                longitude,
                rotation: (direction + ICON_FIX) % 360,
              }),
            );

            const apiResponse = await getCoordinateDetails({
              LATITUDE: latitude,
              LONGITUDE: longitude,
            });

            const payload = await transformLocationToPayload({
              apiResponse,
              direction,
              driverDetails,
              latitude,
              longitude,
              speed,
            });
            await socket?.emit('driverLiveLocation', payload);
          } catch (e) {
            console.log(e);
          }
        },
        error => console.log('Location error:', error),
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
          interval: 3000,
          fastestInterval: 2000,
        },
      );
    }

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isFocus]);

  return isOnline ? <FirstScreen /> : <SecondScreen />;
};

export default MainDashboard;
