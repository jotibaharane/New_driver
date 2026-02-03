import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Loader from '@components/common/ui/Loader';
import DropMarker from '@components/map/markers/DropMarker';
import OriginMarker from '@components/map/markers/OriginMarker';
import Truck from '@components/map/markers/Truck';
import Parcel from '@components/map/markers/parcel';

import { ENV } from '@config/env';
import { RootState } from '@store/index';
import { TRIP_STATUS } from '@store/slices/authSlice';
import { INDIA_REGION, MAP_STYLE } from './helper';

import VDLTSheetModal from './CreateTripeSheet';
import GenerateEBillPartBModal from './GenerateEBillPartB';
import LoadReceiptScreen from './LoadReciptScreen';
import LoadingStatusModal from './LoadingStatusModal';
import NearbyCustomerLoadsModal from './NearbyCustomerLoadsModal';
import OTPModal from './OTPModal';
import TripConfirmationModal from './TripConfirmationModal';
import TripDetailsModal from './TripDetailsModal';
import WaitingCard from './WaitingCard';

/* ------------------ HELPERS ------------------ */
const isValid = (lat?: number, lng?: number) =>
  typeof lat === 'number' && typeof lng === 'number';

const isNavigationTrip = (status: TRIP_STATUS) =>
  status !== TRIP_STATUS.Pending;

/* ------------------ COMPONENT ------------------ */
const SecondScreen: FC = () => {
  const mapRef = useRef<MapView>(null);

  const { tripStatus } = useSelector((s: RootState) => s.auth);
  const { active } = useSelector((s: RootState) => s.driverLp);
  const {
    driverLocation,
    customerLocations,
    liveDriverLocation,
    pickupLocation,
    destinationLocation,
  } = useSelector((s: RootState) => s.map);
  console.log({
    driverLocation,
    customerLocations,
    liveDriverLocation,
    pickupLocation,
    destinationLocation,
    active,
    tripStatus,
  });
  const [showLoadsModal, setShowLoadsModal] = useState(false);
  const [showLR, setLRModal] = useState(false);
  const [showVDLT, setVDLTModal] = useState(false);
  const [
    showGenerateEBillPartBModalModal,
    setShowGenerateEBillPartBModalModal,
  ] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showLoadingStatus, setShowLoadingStatus] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(false);

  /* ------------------ CAMERA CONTROL (OLA STYLE) ------------------ */
  useEffect(() => {
    if (!mapRef.current || !driverLocation) return;

    /** 🚚 NAVIGATION MODE → FOLLOW DRIVER */
    if (isNavigationTrip(tripStatus)) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
          },
          zoom: 17,
          pitch: 45,
          heading: Number(driverLocation.rotation) || 0,
        },
        { duration: 700 },
      );
      return;
    }

    /** 🗺️ PENDING → FIT DRIVER + NEARBY LOADS */
    const coords: { latitude: number; longitude: number }[] = [];

    if (isValid(driverLocation.latitude, driverLocation.longitude)) {
      coords.push(driverLocation);
    }

    customerLocations?.forEach(c => {
      if (isValid(Number(c.latitude), Number(c.longitude))) {
        coords.push({
          latitude: Number(c.latitude),
          longitude: Number(c.longitude),
        });
      }
    });

    if (coords.length === 1) {
      mapRef.current.animateCamera(
        { center: coords[0], zoom: 14 },
        { duration: 700 },
      );
    } else if (coords.length > 1) {
      mapRef.current.fitToCoordinates(coords, {
        edgePadding: { top: 80, right: 80, bottom: 220, left: 80 },
        animated: true,
      });
    }
  }, [
    tripStatus,
    driverLocation?.latitude,
    driverLocation?.longitude,
    driverLocation?.rotation,
    customerLocations,
  ]);

  /* ------------------ ROUTE RENDERER ------------------ */
  const renderRoute = () => {
    if (!driverLocation) return null;

    /** 🚚 DRIVER → PICKUP */
    if (tripStatus === TRIP_STATUS.Progress && active?.PickupLat) {
      return (
        <MapViewDirections
          origin={driverLocation}
          destination={{
            latitude: active.PickupLat,
            longitude: active.PickupLng,
          }}
          apikey={ENV.MAP_API_KEY}
          strokeWidth={5}
          strokeColor="#FF9500"
          mode="DRIVING"
        />
      );
    }

    /** 🚚 DRIVER → DESTINATION */
    if (
      tripStatus !== TRIP_STATUS.Pending &&
      tripStatus !== TRIP_STATUS.Progress &&
      active?.DeliveryLat
    ) {
      return (
        <MapViewDirections
          origin={driverLocation}
          destination={{
            latitude: active.DeliveryLat,
            longitude: active.DeliveryLng,
          }}
          apikey={ENV.MAP_API_KEY}
          strokeWidth={6}
          strokeColor="#007AFF"
          mode="DRIVING"
        />
      );
    }

    return null;
  };

  /* ------------------ UI ------------------ */
  return (
    <>
      <Loader visible={false} />

      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={INDIA_REGION}
          customMapStyle={MAP_STYLE}
          rotateEnabled
          pitchEnabled
          zoomControlEnabled
          maxZoomLevel={18}
        >
          {/* 🚚 DRIVER (ALWAYS) */}
          {driverLocation && (
            <Marker
              coordinate={driverLocation}
              rotation={Number(driverLocation.rotation) || 0}
              flat
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Truck width={50} height={50} />
            </Marker>
          )}

          {/* 📦 NEARBY LOADS (PENDING) */}
          {tripStatus === TRIP_STATUS.Pending &&
            customerLocations?.map((c, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: Number(c.latitude),
                  longitude: Number(c.longitude),
                }}
              >
                <Parcel width={36} height={36} />
              </Marker>
            ))}

          {/* 📍 PICKUP & DROP */}
          {tripStatus !== TRIP_STATUS.Pending && active?.PickupLat && (
            <Marker
              coordinate={{
                latitude: active.PickupLat,
                longitude: active.PickupLng,
              }}
            >
              <OriginMarker size={30} />
            </Marker>
          )}

          {tripStatus !== TRIP_STATUS.Pending &&
            tripStatus !== TRIP_STATUS.Progress &&
            active?.DeliveryLat && (
              <Marker
                coordinate={{
                  latitude: active.DeliveryLat,
                  longitude: active.DeliveryLng,
                }}
              >
                <DropMarker size={28} />
              </Marker>
            )}

          {/* 🧭 ROUTE */}
          {renderRoute()}
        </MapView>
      </View>

      {/* ------------------ ACTION BUTTONS ------------------ */}

      {tripStatus === TRIP_STATUS.Pending && (
        <Button
          mode="contained"
          onPress={() => setShowLoadsModal(true)}
          style={styles.nearbyButton}
        >
          Nearby Loads
        </Button>
      )}

      {tripStatus === TRIP_STATUS.Progress && (
        <View style={styles.row}>
          <Button
            mode="contained"
            onPress={() => setShowOtpModal(true)}
            style={styles.flexBtn}
          >
            Confirm OTP
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowTripDetails(true)}
            style={styles.flexBtn}
          >
            Trip Details
          </Button>
        </View>
      )}

      {tripStatus === TRIP_STATUS.Reached && (
        <View style={styles.row}>
          <Button
            mode="contained"
            onPress={() => setShowConfirmationModal(true)}
            style={styles.flexBtn}
          >
            Trip Confirmation
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowTripDetails(true)}
            style={styles.flexBtn}
          >
            Trip Details
          </Button>
        </View>
      )}

      {tripStatus === TRIP_STATUS.Loading && (
        <View style={styles.row}>
          <Button
            mode="contained"
            onPress={() => setShowLoadingStatus(true)}
            style={styles.flexBtn}
          >
            Loading Status
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowTripDetails(true)}
            style={styles.flexBtn}
          >
            Trip Details
          </Button>
        </View>
      )}

      {![
        TRIP_STATUS.Pending,
        TRIP_STATUS.Progress,
        TRIP_STATUS.Reached,
        TRIP_STATUS.Loading,
      ].includes(tripStatus) && (
        <>
          <WaitingCard />
          <View style={styles.row}>
            <Button
              mode="contained"
              onPress={() => setLRModal(true)}
              style={styles.flexBtn}
            >
              Create LR
            </Button>
            <Button
              mode="contained"
              onPress={() => setVDLTModal(true)}
              style={styles.flexBtn}
            >
              Create Tripe Sheet
            </Button>
          </View>
          <View style={{}}>
            <Button
              mode="contained"
              style={{ marginBottom: 5, marginHorizontal: 15 }}
              onPress={() => setShowGenerateEBillPartBModalModal(true)}
            >
              Generate E Bill Part B
            </Button>
          </View>
        </>
      )}

      {/* ------------------ MODALS ------------------ */}
      <VDLTSheetModal visible={showVDLT} setVisible={setVDLTModal} />
      <LoadReceiptScreen visible={showLR} setVisible={setLRModal} />
      <GenerateEBillPartBModal
        visible={showGenerateEBillPartBModalModal}
        setVisible={setShowGenerateEBillPartBModalModal}
      />
      <NearbyCustomerLoadsModal
        showLoadsModal={showLoadsModal}
        setShowLoadsModal={setShowLoadsModal}
      />
      <OTPModal visible={showOtpModal} setVisible={setShowOtpModal} />
      <TripConfirmationModal
        visible={showConfirmationModal}
        setVisible={setShowConfirmationModal}
      />
      <LoadingStatusModal
        visible={showLoadingStatus}
        setVisible={setShowLoadingStatus}
      />
      <TripDetailsModal
        visible={showTripDetails}
        setVisible={setShowTripDetails}
      />
    </>
  );
};

export default SecondScreen;

/* ------------------ STYLES ------------------ */
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 10,
  },
  flexBtn: {
    flex: 1,
    marginHorizontal: 6,
  },
  nearbyButton: {
    margin: 16,
    borderRadius: 8,
  },
});
