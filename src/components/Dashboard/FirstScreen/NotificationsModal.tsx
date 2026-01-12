import Icon from '@react-native-vector-icons/material-design-icons';
import React, { FC } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card, IconButton, Portal } from 'react-native-paper';
import { Notification } from './types';

interface NotificationsModalProps {
  showNotificationsModal: boolean;
  setShowNotificationsModal: any;
  notifications: Notification[];
  setNotifications: any;
}

const NotificationsModal: FC<NotificationsModalProps> = ({
  showNotificationsModal,
  setShowNotificationsModal,
  notifications,
  setNotifications,
}) => {
  const markAllNotificationsAsRead = () => {
    const allRead = notifications.map(n => ({
      ...n,
      read: true,
    }));
    setNotifications(allRead);
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  return (
    <Portal>
      <Modal
        visible={showNotificationsModal}
        onDismiss={() => setShowNotificationsModal(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Card style={styles.modalCard}>
            <Card.Content>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <View style={styles.modalHeaderActions}>
                  {unreadCount > 0 && (
                    <Button
                      mode="text"
                      onPress={markAllNotificationsAsRead}
                      labelStyle={{ fontSize: 12 }}
                    >
                      Mark all read
                    </Button>
                  )}
                  <IconButton
                    icon="close"
                    size={24}
                    onPress={() => setShowNotificationsModal(false)}
                  />
                </View>
              </View>

              {notifications.length === 0 ? (
                <View style={styles.emptyNotifications}>
                  <Icon name="bell-off" size={48} color="#ccc" />
                  <Text style={styles.emptyNotificationsText}>
                    No notifications
                  </Text>
                </View>
              ) : (
                <ScrollView style={styles.modalNotificationsScroll}>
                  {notifications?.map(notification => (
                    <TouchableOpacity key={notification.id}>
                      <View
                        style={[
                          styles.modalNotificationItem,
                          !notification.read && styles.modalUnreadNotification,
                        ]}
                      >
                        <View style={styles.modalNotificationIcon}>
                          <Icon
                            name={
                              notification.type === 'warning'
                                ? 'alert-circle'
                                : notification.type === 'alert'
                                ? 'alert'
                                : notification.type === 'success'
                                ? 'check-circle'
                                : 'information'
                            }
                            size={20}
                            color={
                              notification.type === 'warning'
                                ? '#ff9800'
                                : notification.type === 'alert'
                                ? '#f44336'
                                : notification.type === 'success'
                                ? '#4caf50'
                                : '#2196f3'
                            }
                          />
                        </View>
                        <View style={styles.modalNotificationContent}>
                          <Text style={styles.modalNotificationTitle}>
                            {notification.title}
                          </Text>
                          <Text style={styles.modalNotificationMessage}>
                            {notification.message}
                          </Text>
                          <Text style={styles.modalNotificationTime}>
                            {notification.time}
                          </Text>
                        </View>
                        {!notification.read && (
                          <View style={styles.modalUnreadDot} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </Card.Content>
          </Card>
        </View>
      </Modal>
    </Portal>
  );
};

export default NotificationsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  modalNotificationsScroll: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  modalNotificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalUnreadNotification: {
    backgroundColor: '#f8fbff',
  },
  modalNotificationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  modalNotificationContent: {
    flex: 1,
  },
  modalNotificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  modalNotificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  modalNotificationTime: {
    fontSize: 12,
    color: '#999',
  },
  modalUnreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196f3',
    marginLeft: 8,
    marginTop: 8,
  },
  emptyNotifications: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyNotificationsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});
