import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainDashboard from '../screens/Dashboard/MainDashboard';

export type MainStackParamList = {
  Dashboard: undefined;
  Vehicles: undefined;
  Drivers: undefined;
  Assign: undefined;
  Available: undefined;
  ProfileNavigator: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Dashboard" component={MainDashboard} />
  </Stack.Navigator>
);

export default MainNavigator;
