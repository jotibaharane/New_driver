import Loader from '@components/common/Loader';
import Icon from '@react-native-vector-icons/material-design-icons';
import { RootState } from '@store/index';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ActionButton } from '../components/ActionButton';
import Header from '../components/Header';
import NotificationsModal from '../components/NotificationsModal';
import VehicleAvailableModal from '../components/VehicleAvailableModal';
import { notificationsData, quickActions } from './helper';
import { styles } from './style';
import { Notification } from './types';

// ==================== MAIN DASHBOARD ====================
export default function FirstScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);
  const { isOnline } = useSelector((state: RootState) => state.auth);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showVehicleMakeModal, setShowVehicleMakeModal] = useState(true);
  const [isSubmittingVehicle, setIsSubmittingVehicle] = useState(false);

  const closeVehicleMakeModal = () => {
    setShowVehicleMakeModal(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isSubmittingVehicle} />

      {/* Header */}
      <Header
        setShowNotificationsModal={setShowNotificationsModal}
        unreadCount={unreadCount}
      />

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
                      { color: isOnline ? '#4CAF50' : '#9E9E9E' },
                    ]}
                  >
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isOnline}
                onValueChange={() => {
                  if (!isOnline) {
                    setShowVehicleMakeModal(true);
                  }
                }}
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
                <ActionButton key={action.id} action={action} />
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

      {/* Notifications Modal */}
      <NotificationsModal
        notifications={notifications}
        setNotifications={setNotifications}
        setShowNotificationsModal={setShowNotificationsModal}
        showNotificationsModal={showNotificationsModal}
      />
      {/* Vehicle Make Modal */}
      <VehicleAvailableModal
        closeVehicleMakeModal={closeVehicleMakeModal}
        showVehicleMakeModal={showVehicleMakeModal}
      />
    </SafeAreaView>
  );
}
