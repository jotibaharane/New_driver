import { RootState } from '@store/index';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { disconnectSocket, initSocket } from '../socket';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator = () => {
  const { isLoggedIn, driverDetails } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isLoggedIn) {
      initSocket(driverDetails?.DriverID!);
    }
    return () => {
      disconnectSocket();
    };
  }, [isLoggedIn]);

  if (!isLoggedIn) return <AuthNavigator />;

  return <MainNavigator />;
};

export default RootNavigator;
