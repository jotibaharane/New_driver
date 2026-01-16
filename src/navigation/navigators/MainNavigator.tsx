import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDashboard from '@screens/Dashboard';
import React, { useEffect } from 'react';

import { emitDriverJoin } from '@socket/socket.emitters';
import { registerSocketListeners } from '@socket/socket.listeners';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import { ROUTES } from '../constants';
import { MainStackParamList } from '../types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const { isLoggedIn, driverDetails } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!driverDetails?.DriverID) return;

    registerSocketListeners();
    emitDriverJoin(driverDetails.DriverID, driverDetails?.VendorID);
  }, [driverDetails?.DriverID]);
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.DASHBOARD}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROUTES.DASHBOARD} component={MainDashboard} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
