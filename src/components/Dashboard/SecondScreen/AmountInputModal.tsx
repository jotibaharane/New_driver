import { postCustomerLoadAccept } from '@api/index';
import React, { FC, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

interface AmountInputModalProps {
  visible: boolean;
  setVisible: any;
  LoadPostID: string;
  submitAmountModal: any;
  DriverID: string;
  CustomerID: string;
}

const AmountInputModal: FC<AmountInputModalProps> = ({
  visible = false,
  setVisible,
  LoadPostID,
  submitAmountModal,
  CustomerID,
  DriverID,
}) => {
  const [proposedAmount, setProposedAmount] = useState('');
  const submitAmount = async () => {
    if (!LoadPostID || !proposedAmount) return;

    try {
      const response = await postCustomerLoadAccept({
        CustomerPostID: LoadPostID,
        DriverID: DriverID,
        CustomerID: CustomerID,
        DriverStatus: 'Accepted',
        ProposedAmount: proposedAmount,
      });
      console.log({ response });
      if (response && response?.status === '02') {
        const tripData = response?.data[0];
        console.log({ tripData });
        setProposedAmount('');
        submitAmountModal();
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
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.amountModalContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.amountModalContent}>
            <Text style={styles.amountModalTitle}> Amount</Text>
            <Text style={styles.amountModalSubtitle}>
              For Load #{LoadPostID}
            </Text>

            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={proposedAmount}
                onChangeText={setProposedAmount}
                autoFocus={true}
              />
            </View>

            <View style={styles.amountModalButtons}>
              <TouchableOpacity
                style={[styles.amountButton, styles.cancelButton]}
                onPress={() => {
                  setVisible(false);
                  setProposedAmount('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.amountButton,
                  styles.submitButton,
                  !proposedAmount && styles.disabledButton,
                ]}
                onPress={submitAmount}
                disabled={!proposedAmount}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AmountInputModal;

const styles = StyleSheet.create({
  amountModalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  amountModalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  amountModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  amountModalSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
  },
  amountModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#3498db',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  cancelButtonText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
