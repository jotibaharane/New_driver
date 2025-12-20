import { RootState } from '@store/index';
import React, { FC, useRef, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

interface OTPModalProps {
  visible: boolean;
  setVisible: any;
}

const OTPModal: FC<OTPModalProps> = ({ visible = false, setVisible }) => {
  const { driverDetails } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);
  const handleOtpChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp?.join('');
    if (otpValue.length !== 4) {
      Alert.alert('Enter valid 4-digit OTP');
      return;
    }
    try {
      // const response = await postCustomerOtpVerify({
      //   CustomerPostID: currentTrip?.LoadPostID,
      //   VerificationCode: otpValue,
      //   CustomerID: currentTrip?.CustomerID,
      //   DriverID: driverDetails?.DriverID || '',
      // });
      // if (response?.data?.status === '00') {
      //   setOtpModalVisible(false);
      //   setOtp(['', '', '', '']);
      // } else {
      //   Alert.alert(response?.data?.message || 'OTP verification failed');
      // }
    } catch (error) {
      console.error('OTP API Error:', error);
      Alert.alert('Something went wrong while verifying OTP');
    }
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.otpModalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>OTP Verification</Text>
          </View>
          {/* {currentTrip && (
            <View style={styles.otpTripCard}>
              <Text style={styles.otpTripTitle}>
                Trip to {currentTrip?.Destination}
              </Text>
              <View style={styles.otpTripDetails}>
                <View style={styles.otpTripRow}>
                  <Icon source="account" size={16} color="#6B7280" />
                  <Text style={styles.otpTripText}>
                    {currentTrip?.CustomerName}
                  </Text>
                </View>
                <View style={styles.otpTripRow}>
                  <Icon source="map-marker" size={16} color="#6B7280" />
                  <Text style={styles.otpTripText} numberOfLines={1}>
                    {currentTrip?.Origin}
                  </Text>
                </View>
              </View>
            </View>
          )} */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  if (ref) inputs.current[index] = ref;
                }}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpInput}
                textAlign="center"
              />
            ))}
          </View>
          <View style={styles.otpButtonContainer}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.primaryButtonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OTPModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
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
  otpModalContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  otpTripCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  otpTripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  otpTripDetails: {
    marginTop: 4,
  },
  otpTripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  otpTripText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  otpButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
});
