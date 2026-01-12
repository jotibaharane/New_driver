// CustomDrawer.tsx
import { ROUTES } from '@navigation/constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootState } from '@store/index';
import { logout } from '@store/slices/authSlice';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Drawer, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  visible: boolean;
  onSelect: (value: boolean) => void;
}

const CustomDrawer: React.FC<Props> = ({ visible, onSelect }) => {
  const { driverDetails } = useSelector((state: RootState) => state.auth);
  if (!visible) return null;

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const navigateTo = (screen: string) => {
    onSelect(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        {/* Profile Section */}
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => navigateTo('ProfileNavigator')}
        >
          <Avatar.Image
            size={60}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg',
            }}
          />
          <Text style={styles.name}>{driverDetails?.full_name}</Text>
          <Text style={styles.email}>{driverDetails?.MobileNo}</Text>
        </TouchableOpacity>

        {/* Menu Section */}
        <Drawer.Section style={[styles.menuSection, { flex: 1 }]}>
          <Drawer.Item
            label="Dashboard"
            icon="view-dashboard"
            active={route?.name === ROUTES.DASHBOARD}
            onPress={() => navigateTo(ROUTES.DASHBOARD)}
          />
          {/* <Drawer.Item
            label="Vehicles"
            icon="truck"
            active={route?.name === 'ValidateVehicle'}
            onPress={() => navigateTo('ValidateVehicle')}
          />
          <Drawer.Item
            label="Drivers"
            icon="account-group"
            active={route?.name === 'DriverList'}
            onPress={() => navigateTo('DriverList')}
          />
          <Drawer.Item
            label="Bank Details"
            icon="shield-account"
            active={route?.name === 'BankVerification'}
            onPress={() => navigateTo('BankVerification')}
          /> */}
        </Drawer.Section>

        <Drawer.Section>
          <Drawer.Item
            label="Logout"
            icon="logout"
            onPress={() => dispatch(logout())}
          />
        </Drawer.Section>
      </View>

      {/* Background Overlay */}
      <TouchableOpacity
        style={styles.background}
        onPress={() => onSelect(false)}
      />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  drawer: {
    width: 280,
    backgroundColor: '#fff',
    elevation: 12,
    paddingTop: 40,
    height: '100%',
  },
  background: {
    flex: 1,
    backgroundColor: '#00000066',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: '#777',
    marginTop: 4,
  },
  menuSection: {
    marginTop: 20,
  },
});
