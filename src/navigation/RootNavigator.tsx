import { RootState } from '@store/index';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  disconnectSocket,
  initSocket,
  registerSocketListeners,
} from '../socket';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator = () => {
  const { isLoggedIn, driverDetails } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!driverDetails?.DriverID) return;
    initSocket(driverDetails?.DriverID);
    registerSocketListeners();
    return () => {
      disconnectSocket();
    };
  }, [driverDetails?.DriverID]);

  if (!isLoggedIn) return <AuthNavigator />;

  return <MainNavigator />;
};

export default RootNavigator;
