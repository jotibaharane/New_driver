import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MobileNumberScreen from '@screens/AuthModule/Login';
import OTPVerify from '@screens/AuthModule/OTPVerify';
import React from 'react';

import { ROUTES } from '../constants';
import { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name={ROUTES.LOGIN} component={MobileNumberScreen} />
    <Stack.Screen name={ROUTES.OTP_VERIFY} component={OTPVerify} />
  </Stack.Navigator>
);

export default AuthNavigator;
