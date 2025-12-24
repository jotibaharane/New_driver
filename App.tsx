import { RootNavigator } from '@navigation/index';
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Appearance, StatusBar, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import ErrorBoundary from './src/components/ErrorBoundary';
import { store } from './src/store';

// Add this early in your app (App.js or similar)
Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
  skipPermissionRequests: false,
});
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // Initialize app
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Provider store={store}>
          <PaperProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <Toast />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
