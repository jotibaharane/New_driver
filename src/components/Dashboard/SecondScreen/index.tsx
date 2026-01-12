import Loader from '@components/common/ui/Loader';
import DropMarker from '@components/map/markers/DropMarker';
import OriginMarker from '@components/map/markers/OriginMarker';
import Truck from '@components/map/markers/Truck';
import Parcel from '@components/map/markers/parcel';
import { ENV } from '@config/env';
import { RootState } from '@store/index';
import { TRIP_STATUS } from '@store/slices/authSlice';
import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import LoadingStatusModal from './LoadingStatusModal';
import NearbyCustomerLoadsModal from './NearbyCustomerLoadsModal';
import OTPModal from './OTPModal';
import TripConfirmationModal from './TripConfirmationModal';
import TripDetailsModal from './TripDetailsModal';
import WaitingCard from './WaitingCard';
import { INDIA_REGION, MAP_STYLE } from './helper';
const SecondScreen: FC = () => {
  const { tripStatus } = useSelector((state: RootState) => state.auth);
  const { active } = useSelector((s: RootState) => s.driverLp);
  const { customerLocations } = useSelector((s: RootState) => s.map);
  const mapRef = useRef<MapView>(null);
  const { driverLocation } = useSelector((s: RootState) => s.map);
  const [showLoadsModal, setShowLoadsModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showLoadingStatus, setShowLoadingStatus] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(false);
  // AUTO FIT MAP TO DRIVER LOCATION
  useEffect(() => {
    if (!mapRef.current) return;

    const coordinates: { latitude: number; longitude: number }[] = [];

    // Driver location
    if (driverLocation?.latitude && driverLocation?.longitude) {
      coordinates.push({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
      });
    }

    // Load origins
    if (customerLocations?.length) {
      customerLocations.forEach(item => {
        if (item?.latitude && item?.longitude) {
          coordinates.push({
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
          });
        }
      });
    }

    if (
      tripStatus !== TRIP_STATUS.Pending &&
      tripStatus !== TRIP_STATUS.Progress &&
      active?.PickupLat &&
      active?.PickupLng &&
      active?.DeliveryLat &&
      active?.DeliveryLng
    ) {
      coordinates.push({
        latitude: active.PickupLat,
        longitude: active.PickupLng,
      });
      coordinates.push({
        latitude: active.DeliveryLat,
        longitude: active.DeliveryLng,
      });
    }

    // Fit map only if we have at least one coordinate
    if (coordinates.length === 1) {
      // Single marker → normal zoom
      mapRef.current.animateCamera(
        {
          center: coordinates[0],
          zoom: 15,
        },
        { duration: 800 },
      );
    } else if (coordinates.length > 1) {
      // Multiple markers → fit all
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 80,
          right: 80,
          bottom: 200,
          left: 80,
        },
        animated: true,
      });
    }
  }, [driverLocation, customerLocations, tripStatus]);



  return (
    <>
      <Loader visible={false} />

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
          {driverLocation?.latitude && (
            <Marker
              coordinate={driverLocation || { latitude: 0, longitude: 0 }}
              anchor={{ x: 0.5, y: 0.5 }}
              flat
              tracksViewChanges={false}
              rotation={Number(driverLocation.rotation)}
            >
              <Truck height={50} width={50} />
            </Marker>
          )}
          {tripStatus === TRIP_STATUS.Pending &&
            customerLocations?.map((item, index) => (
              <Marker
                coordinate={{
                  latitude: Number(item?.latitude) || 0,
                  longitude: Number(item?.longitude) || 0,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                flat
                tracksViewChanges={false}
                key={index}
              >
                <Parcel height={50} width={50} />
              </Marker>
            ))}
          {tripStatus === TRIP_STATUS.Progress && (
            <>
              <Marker
                coordinate={{
                  latitude: active?.PickupLat! || 0,
                  longitude: active?.PickupLng! || 0,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                flat
                tracksViewChanges={false}
              >
                <OriginMarker size={30} />
              </Marker>
              <MapViewDirections
                origin={{
                  latitude: driverLocation?.latitude! || 0,
                  longitude: driverLocation?.longitude! || 0,
                }}
                destination={{
                  latitude: active?.PickupLat!,
                  longitude: active?.PickupLng!,
                }}
                apikey={ENV.MAP_API_KEY}
                strokeWidth={5}
                strokeColor="hotpink"
              />
            </>
          )}

          {tripStatus !== TRIP_STATUS.Pending &&
            tripStatus !== TRIP_STATUS.Progress && (
              <>
                <Marker
                  coordinate={{
                    latitude: active?.PickupLat! || 0,
                    longitude: active?.PickupLng! || 0,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  flat
                  tracksViewChanges={false}
                >
                  <OriginMarker size={30} />
                </Marker>
                <Marker
                  coordinate={{
                    latitude: active?.DeliveryLat! || 0,
                    longitude: active?.DeliveryLng! || 0,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  flat
                  tracksViewChanges={false}
                >
                  <DropMarker size={20} />
                </Marker>
                <MapViewDirections
                  origin={{
                    latitude: active?.PickupLat! || 0,
                    longitude: active?.PickupLng! || 0,
                  }}
                  destination={{
                    latitude: active?.DeliveryLat! || 0,
                    longitude: active?.DeliveryLng! || 0,
                  }}
                  apikey={ENV.MAP_API_KEY}
                  strokeWidth={5}
                  strokeColor="hotpink"
                />
              </>
            )}
        </MapView>
      </View>

      {tripStatus === TRIP_STATUS.Pending && (
        <Button
          mode="contained"
          onPress={() => setShowLoadsModal(true)}
          style={styles.nearbyButton}
          labelStyle={styles.nearbyButtonLabel}
        >
          Nearby Loads
        </Button>
      )}

      {tripStatus === TRIP_STATUS.Progress && (
        <View style={{ flexDirection: 'row' }}>
          <Button
            mode="contained"
            onPress={() => setShowOtpModal(true)}
            style={{ margin: 10, flex: 1 }}
          >
            Confirm Otp
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowTripDetails(true)}
            style={{ margin: 10, flex: 1 }}
          >
            Trip Details
          </Button>
        </View>
      )}
      {tripStatus === TRIP_STATUS.Reached && (
        <View style={{ flexDirection: 'row' }}>
          <Button
            mode="contained"
            onPress={() => setShowConfirmationModal(true)}
            style={{ margin: 10, flex: 1 }}
          >
            Trip Confirmation
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowTripDetails(true)}
            style={{ margin: 10, flex: 1 }}
          >
            Trip Details
          </Button>
        </View>
      )}
      {tripStatus === TRIP_STATUS.Loading && (
        <View style={{ flexDirection: 'row' }}>
          <Button
            mode="contained"
            onPress={() => setShowLoadingStatus(true)}
            style={{ margin: 10, flex: 1 }}
          >
            Loading Status
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowTripDetails(true)}
            style={{ margin: 10, flex: 1 }}
          >
            Trip Details
          </Button>
        </View>
      )}

      {tripStatus !== TRIP_STATUS.Loading &&
        tripStatus !== TRIP_STATUS.Pending &&
        tripStatus !== TRIP_STATUS.Progress &&
        tripStatus !== TRIP_STATUS.Reached && <WaitingCard />}

      {/* <View style={{ flexDirection: 'row' }}>
        <Button
          mode="contained"
          onPress={() => setShowLoadingStatus(true)}
          style={{ margin: 10, flex: 1 }}
        >
          LR
        </Button>
        <Button
          mode="contained"
          onPress={() => setShowTripDetails(true)}
          style={{ margin: 10, flex: 1 }}
        >
          Trip Sheet
        </Button>
      </View> */}
      {/* Near Customer Load Modal */}
      <NearbyCustomerLoadsModal
        setShowLoadsModal={setShowLoadsModal}
        showLoadsModal={showLoadsModal}
      />
      {/* <TripSheetModal visible={true} onDismiss={() => {}} /> */}
      {/* <LoadReceiptScreen visible={true} onDismiss={() => {}} /> */}

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

      {/* trip details Modal */}
      <TripDetailsModal
        setVisible={setShowTripDetails}
        visible={showTripDetails}
      />
    </>
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
