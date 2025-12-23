import Icon from '@react-native-vector-icons/material-design-icons';
import { RootState } from '@store/index';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { styles } from '../FirstScreen/style';

interface HeaderProps {
  unreadCount: any;
  setShowNotificationsModal: any;
  setDrawerVisible: any;
}

const Header: FC<HeaderProps> = ({
  unreadCount,
  setShowNotificationsModal,
  setDrawerVisible,
}) => {
  const { driverDetails } = useSelector((state: RootState) => state.auth);
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.leftHeaderSection}>
          <IconButton
            icon="menu"
            iconColor="white"
            size={28}
            style={styles.drawerButton}
            onPress={() => setDrawerVisible((prev: any) => !prev)}
          />
          <View style={styles.driverInfo}>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driverDetails?.full_name}</Text>
              <View style={styles.driverMeta}>
                <Icon name="truck" size={14} color="#ffffff99" />
                <Text style={styles.driverMetaText}>
                  {driverDetails?.registration_no}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.headerActions}>
          <View style={styles.notificationContainer}>
            <IconButton
              icon="bell"
              iconColor="white"
              size={24}
              onPress={() => setShowNotificationsModal(true)}
            />
            {unreadCount > 0 && (
              <Badge style={styles.notificationBadge}>{unreadCount}</Badge>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
