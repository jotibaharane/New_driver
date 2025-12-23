import Loader from '@components/Common/ui/Loader';
import DropMarker from '@components/Map/markers/DropMarker';
import OriginMarker from '@components/Map/markers/OriginMarker';
import Truck from '@components/Map/markers/Truck';
import Parcel from '@components/Map/markers/parcel';
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
import { INDIA_REGION, MAP_STYLE } from './helper';
const SecondScreen: FC = () => {
  const { tripStatus } = useSelector((state: RootState) => state.auth);
  const { list, active } = useSelector((s: RootState) => s.driverLp);
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
    if (list?.length) {
      list.forEach(item => {
        if (item?.Origin_Lat && item?.Origin_Lng) {
          coordinates.push({
            latitude: item.Origin_Lat,
            longitude: item.Origin_Lng,
          });
        }
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
  }, [driverLocation, list, tripStatus]);
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
          {tripStatus === TRIP_STATUS.Pending &&
            list?.map(item => (
              <Marker
                coordinate={{
                  latitude: item?.Origin_Lat,
                  longitude: item?.Origin_Lng,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                flat
                tracksViewChanges={false}
                key={item?.Customer_LoadPostID}
              >
                <Parcel height={50} width={50} />
              </Marker>
            ))}
          {tripStatus === TRIP_STATUS.Progress && (
            <>
              <Marker
                coordinate={{
                  latitude: active?.Origin_Lat!,
                  longitude: active?.Origin_Lng!,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                flat
                tracksViewChanges={false}
              >
                <OriginMarker size={30} />
              </Marker>
              <MapViewDirections
                origin={{
                  latitude: driverLocation?.latitude!,
                  longitude: driverLocation?.longitude!,
                }}
                destination={{
                  latitude: active?.Origin_Lat!,
                  longitude: active?.Origin_Lng!,
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
                    latitude: active?.Origin_Lat!,
                    longitude: active?.Origin_Lng!,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  flat
                  tracksViewChanges={false}
                >
                  <OriginMarker size={30} />
                </Marker>
                <Marker
                  coordinate={{
                    latitude: active?.Destination_Lat!,
                    longitude: active?.Destination_Lng!,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  flat
                  tracksViewChanges={false}
                >
                  <DropMarker size={20} />
                </Marker>
                <MapViewDirections
                  origin={{
                    latitude: active?.Origin_Lat!,
                    longitude: active?.Origin_Lng!,
                  }}
                  destination={{
                    latitude: active?.Destination_Lat!,
                    longitude: active?.Destination_Lng!,
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
