import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDashboard from '@screens/Dashboard';
import React from 'react';

import { ROUTES } from '../constants';
import { MainStackParamList } from '../types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.DASHBOARD}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={ROUTES.DASHBOARD} component={MainDashboard} />
  </Stack.Navigator>
);

export default MainNavigator;
