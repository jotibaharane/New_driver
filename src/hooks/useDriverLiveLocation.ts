import Geolocation from '@react-native-community/geolocation';
import { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { getCoordinateDetails } from '@api/index';
import { transformLocationToPayload } from '@services/location/locationPayload.service';
import { canEmitLocation } from '@services/locationEmitter.service';
import { emitDriverLocation } from '@socket/socket.emitters';
import { setdriverLocation } from '@store/slices/mapSlice';
import { getBearing } from '@utils/index';

const ICON_FIX = 180;

/* ----------------------------- */
/* MAIN HOOK */
/* ----------------------------- */
export const useDriverLiveLocation = ({
  isFocus,
  isOnline,
  driverDetails,
  tripStatus,
}: any) => {
  const dispatch = useDispatch();

  const watchIdRef = useRef<number | null>(null);
  const prevLocation = useRef<{ latitude: number; longitude: number } | null>(
    null,
  );

  useEffect(() => {
    const startLocationTracking = async () => {
      if (watchIdRef.current !== null) return;
      Geolocation.requestAuthorization(
        () => {
          watchIdRef.current = Geolocation.watchPosition(
            async position => {
              try {
                console.log({ position });
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

                /* ---------------- MAP UPDATE ---------------- */
                dispatch(
                  setdriverLocation({
                    latitude,
                    longitude,
                    rotation: (direction + ICON_FIX) % 360,
                  }),
                );

                if (!canEmitLocation()) return;

                /* ---------------- API + SOCKET ---------------- */
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

                console.log('LOCATION PAYLOAD', payload);
                emitDriverLocation(payload);
              } catch (err) {
                console.log('Location processing error', err);
              }
            },
            error => {
              console.log('LOCATION ERROR', error);
              Alert.alert('Location Error', error.message);
            },
          );
        },
        error => {
          console.log({ error });
        },
      );
    };

    if (isFocus && isOnline && driverDetails?.DriverID) {
      startLocationTracking();
    } else {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        prevLocation.current = null;
      }
    }

    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isFocus, isOnline, driverDetails?.DriverID, tripStatus]);
};
