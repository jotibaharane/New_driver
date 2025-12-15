import OriginMarker from '@assets/map/OriginMarker';
import Loader from '@components/common/Loader';
import { RootState } from '@store/index';
import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { INDIA_REGION, MAP_STYLE } from './helper';

const SecondScreen: FC = () => {
  const mapRef = useRef<MapView>(null);
  const { driverLocation } = useSelector((s: RootState) => s.map);

  // ⭐ AUTO FIT MAP TO DRIVER LOCATION
  useEffect(() => {
    if (driverLocation && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
          },
          zoom: 15, // suggested zoom for driver
          heading: 0,
          pitch: 0,
        },
        { duration: 800 }, // smooth animation
      );
    }
  }, [driverLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={false} />

      <Header setShowNotificationsModal={() => {}} unreadCount={0} />

      <View style={{ flex: 1, position: 'relative' }}>
        <MapView
          ref={mapRef}
          initialRegion={INDIA_REGION}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          mapType="standard"
          customMapStyle={MAP_STYLE}
          showsUserLocation={false}
          toolbarEnabled={false}
          moveOnMarkerPress={false}
          zoomEnabled
          zoomControlEnabled
          maxZoomLevel={18}
          minZoomLevel={4}
        >
          {driverLocation && (
            <Marker
              coordinate={driverLocation}
              anchor={{ x: 0.5, y: 0.5 }}
              flat
              tracksViewChanges={false}
            >
              <OriginMarker size={34} />
            </Marker>
          )}
        </MapView>
      </View>

      {/* Floating Buttons */}
      <View style={styles.bottomContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Navigate Press')}
        >
          Navigate
        </Button>

        <Button
          mode="contained-tonal"
          style={styles.button}
          onPress={() => console.log('SOS Press')}
        >
          SOS
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  button: {
    width: 150,
    borderRadius: 50,
  },
});
