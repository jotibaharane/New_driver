import { postCustomerLoadAccept } from '@api/index';
import { RootState } from '@store/index';
import { setTripStatus, TRIP_STATUS } from '@store/slices/authSlice';
import React, { FC } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

interface TripConfirmationModalProps {
  visible: boolean;
  setVisible: any;
}

const TripConfirmationModal: FC<TripConfirmationModalProps> = ({
  visible = false,
  setVisible,
}) => {
  const dispatch = useDispatch();
  const { active } = useSelector((s: RootState) => s.driverLp);
  const handleAcceptTrip = async () => {
    setVisible(false);
    if (!active?.CustomerPostID) return;

    try {
      const response = await postCustomerLoadAccept({
        CustomerPostID: active?.CustomerPostID,
        DriverID: active?.DriverID,
        // CustomerID: active?.CustomerID,
        DriverStatus: 'Loading',
      });
      if (response && response?.status === '00') {
        // const tripData = response?.data[0];
        // console.log({ tripData });
        dispatch(setTripStatus(TRIP_STATUS.Loading));
      } else {
        Toast.show({ type: 'error', text1: response?.message });
      }
    } catch (error) {
      console.error('API Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to accept load',
        text2: 'Please try again',
      });
    }
  };

  const handleRejectTrip = async () => {
    setVisible(false);
    try {
      const response = await postCustomerLoadAccept({
        CustomerPostID: active?.CustomerPostID,
        DriverID: active?.DriverID,
        CustomerID: active?.CustomerID,
        DriverStatus: 'Reject',
      });
      if (response && response?.status === '02') {
      } else {
        Toast.show({ type: 'error', text1: response?.message });
      }
    } catch (error) {
      console.error('API Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to accept load',
        text2: 'Please try again',
      });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.confirmationModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Confirm Trip</Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeIcon}
            >
              <Icon source="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.confirmationContent}>
            <View style={styles.confirmationIconContainer}>
              <Icon source="truck-fast" size={60} color="#3B82F6" />
            </View>
            <Text style={styles.confirmationTitle}>
              Do you accept this trip?
            </Text>
            {/* <Text style={styles.confirmationSubtitle}>
              You are about to start the trip from {currentTrip?.Origin} to{' '}
              {currentTrip?.Destination}
            </Text> */}
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={[styles.confirmationButton, styles.rejectButton]}
                onPress={handleRejectTrip}
              >
                <Icon source="close" size={20} color="#FFF" />
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmationButton, styles.acceptButton]}
                onPress={handleAcceptTrip}
              >
                <Icon source="check" size={20} color="#FFF" />
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TripConfirmationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  confirmationModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeIcon: {
    padding: 4,
  },
  confirmationContent: {
    padding: 30,
    alignItems: 'center',
  },
  confirmationIconContainer: {
    backgroundColor: '#EFF6FF',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  confirmationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  acceptButton: {
    backgroundColor: '#10B981',
  },
  rejectButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
