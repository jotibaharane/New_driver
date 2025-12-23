import React, { ReactNode, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { notificationsData } from '../FirstScreen/helper';
import NotificationsModal from '../FirstScreen/NotificationsModal';
import { Notification } from '../FirstScreen/types';
import CustomDrawer from './CustomDrawer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <Header
        setShowNotificationsModal={setShowNotificationsModal}
        unreadCount={unreadCount}
        setDrawerVisible={setDrawerVisible}
      />
      {children}
      {/* Notifications Modal */}
      <NotificationsModal
        notifications={notifications}
        setNotifications={setNotifications}
        setShowNotificationsModal={setShowNotificationsModal}
        showNotificationsModal={showNotificationsModal}
      />
      <CustomDrawer visible={drawerVisible} onSelect={setDrawerVisible} />
    </SafeAreaView>
  );
};

export default Layout;
