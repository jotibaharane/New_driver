import React, { FC, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Chip,
  Divider,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const GenerateEBillPartBModal: FC<Props> = ({ visible, setVisible }) => {
  const [vehicleSegment, setVehicleSegment] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [placeOfChange, setPlaceOfChange] = useState('');
  const [lrNo, setLrNo] = useState('');
  const [lrDate, setLrDate] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      vehicleSegment,
      vehicleNo,
      placeOfChange,
      lrNo,
      lrDate,
    });
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text variant="titleLarge" style={styles.title}>
                  Generate e-Bill Part B
                </Text>
              </View>
              <Divider />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {/* Fixed Info Section */}
                <View style={styles.fixedInfoSection}>
                  <View style={styles.chipRow}>
                    <Chip icon="truck" style={styles.chip}>
                      Mumbai, Maharashtra
                    </Chip>
                    <Text variant="bodyMedium" style={styles.chipLabel}>
                      Pickup
                    </Text>
                  </View>

                  <View style={styles.chipRow}>
                    <Chip icon="map-marker" style={styles.chip}>
                      Jaipur, Rajasthan
                    </Chip>
                    <Text variant="bodyMedium" style={styles.chipLabel}>
                      Delivery
                    </Text>
                  </View>

                  <View style={styles.chipRow}>
                    <Chip icon="road" style={styles.chip}>
                      Road Transport
                    </Chip>
                    <Text variant="bodyMedium" style={styles.chipLabel}>
                      Mode
                    </Text>
                  </View>
                </View>

                <Divider style={styles.divider} />

                {/* Editable Fields */}
                <View style={styles.formSection}>
                  <TextInput
                    label="Vehicle Segment *"
                    value={vehicleSegment}
                    onChangeText={setVehicleSegment}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Enter vehicle segment"
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#6200ee"
                  />

                  <TextInput
                    label="Vehicle No *"
                    value={vehicleNo}
                    onChangeText={setVehicleNo}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Enter vehicle number"
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#6200ee"
                  />

                  <TextInput
                    label="Place of Change"
                    value={placeOfChange}
                    onChangeText={setPlaceOfChange}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Enter place of change"
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#6200ee"
                  />

                  <View style={styles.rowInputs}>
                    <TextInput
                      label="LR No *"
                      value={lrNo}
                      onChangeText={setLrNo}
                      mode="outlined"
                      style={[styles.input, styles.halfInput]}
                      placeholder="LR Number"
                      keyboardType="numeric"
                      outlineColor="#e0e0e0"
                      activeOutlineColor="#6200ee"
                    />

                    <TextInput
                      label="LR Date *"
                      value={lrDate}
                      onChangeText={setLrDate}
                      mode="outlined"
                      style={[styles.input, styles.halfInput]}
                      placeholder="DD/MM/YYYY"
                      outlineColor="#e0e0e0"
                      activeOutlineColor="#6200ee"
                    />
                  </View>
                </View>
              </ScrollView>

              {/* Footer Actions */}
              <View style={styles.footer}>
                <Button
                  mode="outlined"
                  onPress={() => setVisible(false)}
                  style={[styles.button, styles.cancelButton]}
                  labelStyle={styles.cancelButtonLabel}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={[styles.button, styles.submitButton]}
                  labelStyle={styles.submitButtonLabel}
                >
                  Generate
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85%',
    minHeight: '60%',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 10,
  },
  fixedInfoSection: {
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  chip: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },
  chipLabel: {
    marginLeft: 8,
    minWidth: 60,
    color: '#666',
  },
  divider: {
    marginVertical: 8,
  },
  formSection: {
    marginTop: 8,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 16,
    fontSize: 14,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  cancelButton: {
    borderColor: '#ddd',
  },
  cancelButtonLabel: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6200ee',
  },
  submitButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GenerateEBillPartBModal;
