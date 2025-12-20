import Loader from '@components/Common/ui/Loader';
import Truck from '@components/Map/markers/Truck';
import { RootState } from '@store/index';
import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Header from '../FirstScreen/Header';
import { INDIA_REGION, MAP_STYLE } from './helper';
import LoadingStatusModal from './LoadingStatusModal';
import NearbyCustomerLoadsModal from './NearbyCustomerLoadsModal';
import OTPModal from './OTPModal';
import TripConfirmationModal from './TripConfirmationModal';

const SecondScreen: FC = () => {
  const mapRef = useRef<MapView>(null);
  const { driverLocation } = useSelector((s: RootState) => s.map);
  const [showLoadsModal, setShowLoadsModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showLoadingStatus, setShowLoadingStatus] = useState(false);
  // AUTO FIT MAP TO DRIVER LOCATION
  useEffect(() => {
    if (driverLocation && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
          },
          zoom: 15,
          heading: 0,
          pitch: 0,
        },
        { duration: 800 },
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
              rotation={Number(driverLocation.rotation)}
            >
              <Truck height={50} width={50} />
            </Marker>
          )}
        </MapView>
      </View>

      <Button
        mode="contained"
        onPress={() => setShowLoadsModal(true)}
        style={styles.nearbyButton}
        labelStyle={styles.nearbyButtonLabel}
      >
        Nearby Loads
      </Button>

      {/* <View style={{ flexDirection: 'row' }}>
        <Button
          mode="contained"
          onPress={() => setShowOtpModal(true)}
          style={{ margin: 10, flex: 1 }}
        >
          Confirm Otp
        </Button>
        <Button
          mode="contained"
          onPress={() => setShowLoadsModal(true)}
          style={{ margin: 10, flex: 1 }}
        >
          Trip Details
        </Button>
      </View> */}

      {/* Near Customer Load Modal */}
      <NearbyCustomerLoadsModal
        setShowLoadsModal={setShowLoadsModal}
        showLoadsModal={showLoadsModal}
      />

      {/* Customer Otp Modal */}
      <OTPModal visible={showOtpModal} setVisible={setShowOtpModal} />

      {/* Trip Confirmation Modal */}
      <TripConfirmationModal
        visible={showConfirmationModal}
        setVisible={setShowConfirmationModal}
      />

      {/* loading status photos */}
      <LoadingStatusModal
        visible={showLoadingStatus}
        setVisible={setShowLoadingStatus}
      />
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
    bottom: 40,
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
  nearbyButton: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
  nearbyButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 6,
  },
});
