import { RootState } from '@store/index';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) return <AuthNavigator />;

  return <MainNavigator />;
};

export default RootNavigator;
