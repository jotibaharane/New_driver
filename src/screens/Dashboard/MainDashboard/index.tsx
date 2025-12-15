import Geolocation from '@react-native-community/geolocation';
import { useIsFocused } from '@react-navigation/native';
import { setdriverLocation } from '@store/slices/mapSlice';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import SecondScreen from './SecondScreen';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        dispatch(
          setdriverLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        );
      },
      error => Alert.alert('Location Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    );
  }, [isFocus]);
  return <SecondScreen />;
};

export default MainDashboard;
