import { driverOnlineOffline } from '@api/index';
import Loader from '@components/Common/ui/Loader';
import Icon from '@react-native-vector-icons/material-design-icons';
import { RootState } from '@store/index';
import { setOnlineStatus } from '@store/slices/authSlice';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ActionButton } from './ActionButton';
import VehicleAvailableModal from './VehicleAvailableModal';
import { quickActions } from './helper';
import { styles } from './style';

// ==================== MAIN DASHBOARD ====================
export default function FirstScreen() {
  const dispatch = useDispatch();

  const { isOnline, driverDetails } = useSelector(
    (state: RootState) => state.auth,
  );
  const [showVehicleMakeModal, setShowVehicleMakeModal] = useState(false);
  const [isSubmittingVehicle, setIsSubmittingVehicle] = useState(false);

  const closeVehicleMakeModal = () => {
    setShowVehicleMakeModal(false);
  };

  const handleDriverOnlineOffline = async () => {
    try {
      setIsSubmittingVehicle(true);
      const resp = await driverOnlineOffline({
        DriverID: driverDetails?.DriverID || '',
        Status: !isOnline ? 'Online' : 'Offline',
        VendorID: driverDetails?.VendorID || '',
      });

      if (resp?.status === '00') {
        dispatch(setOnlineStatus(!isOnline));
      }
    } catch (error) {
    } finally {
      setIsSubmittingVehicle(false);
    }
  };

  return (
    <>
      <Loader visible={isSubmittingVehicle} />

      {/* Main Content - Non-scrollable */}
      <View style={styles.content}>
        {/* Online Status Card */}
        <Card style={styles.statusCard}>
          <Card.Content>
            <View style={styles.statusHeader}>
              <View style={styles.statusInfo}>
                <Icon
                  name={isOnline ? 'check-circle' : 'power'}
                  size={32}
                  color={isOnline ? '#4CAF50' : '#9E9E9E'}
                />
                <View style={styles.statusDetails}>
                  <Text style={styles.statusLabel}>TRUCK STATUS</Text>
                  <Text
                    style={[
                      styles.statusValue,
                      {
                        color: isOnline ? '#4CAF50' : '#9E9E9E',
                      },
                    ]}
                  >
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isOnline}
                onValueChange={handleDriverOnlineOffline}
                color="#4CAF50"
                style={styles.statusSwitch}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>${20}</Text>
                <Text style={styles.statLabel}>Today's Earnings</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{20} mi</Text>
                <Text style={styles.statLabel}>Distance</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{1}h</Text>
                <Text style={styles.statLabel}>Hours</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map(action => (
                <ActionButton
                  key={action.id}
                  action={action}
                  onPress={(val: any) => {
                    if (val?.id === '1') {
                      setShowVehicleMakeModal(true);
                    }
                  }}
                />
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Last updated:{' '}
            {new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>

      {/* Vehicle Make Modal */}
      <VehicleAvailableModal
        closeVehicleMakeModal={closeVehicleMakeModal}
        showVehicleMakeModal={showVehicleMakeModal}
      />
    </>
  );
}
