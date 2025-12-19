// hooks/useDriverLiveLocation.ts
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getCoordinateDetails } from '@api/endpoints/avilable.api';
import { transformLocationToPayload } from '@services/location/locationPayload.service';
import { canEmitLocation } from '@services/locationEmitter.service';
import { emitDriverLocation } from '@socket/socket.emitters';
import { setdriverLocation } from '@store/slices/mapSlice';
import { getBearing } from '@utils/geo/getBearing';

const ICON_FIX = 180;

export const useDriverLiveLocation = ({
  isFocus,
  isOnline,
  driverDetails,
  tripStatus,
}: any) => {
  const dispatch = useDispatch();
  const watchIdRef = useRef<number | null>(null);
  const prevLocation = useRef<any>(null);

  useEffect(() => {
    if (!isFocus || !isOnline || !driverDetails?.DriverID) {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    watchIdRef.current = Geolocation.watchPosition(
      async position => {
        if (!isOnline) return;

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

        if (!canEmitLocation()) return;

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
          status: 'Online',
          tripStatus,
        });

        emitDriverLocation(payload);
      },
      console.log,
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 3000,
        fastestInterval: 2000,
      },
    );

    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isFocus, isOnline, driverDetails?.DriverID, tripStatus]);
};
