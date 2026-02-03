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
  Card,
  Chip,
  Divider,
  HelperText,
  IconButton,
  Portal,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

type TransportType = 'ftl' | 'ltl';
type VehicleType = 'open' | 'closed' | 'container' | 'trailer';

const VDLTSheetModal: FC<Props> = ({ visible, setVisible }) => {
  const [formData, setFormData] = useState({
    vehicleSegment: '',
    vehicleNo: '',
    vehicleType: '' as VehicleType,
    transportType: 'ftl' as TransportType,
    placeOfChange: '',
    lrNo: '',
    lrDate: '',
    driverName: '',
    driverContact: '',
    transporterName: '',
    goodsType: '',
    weight: '',
    invoiceValue: '',
    remarks: '',
  });

  const [errors, setErrors] = useState({
    vehicleSegment: false,
    vehicleNo: false,
    vehicleType: false,
    lrNo: false,
    lrDate: false,
    driverName: false,
    driverContact: false,
    weight: false,
  });

  const vehicleTypes = [
    { label: 'Open Truck', value: 'open' },
    { label: 'Closed Truck', value: 'closed' },
    { label: 'Container', value: 'container' },
    { label: 'Trailer', value: 'trailer' },
  ];

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      vehicleSegment: !formData.vehicleSegment.trim(),
      vehicleNo: !formData.vehicleNo.trim(),
      vehicleType: !formData.vehicleType,
      lrNo: !formData.lrNo.trim(),
      lrDate: !formData.lrDate.trim(),
      driverName: !formData.driverName.trim(),
      driverContact: !formData.driverContact.trim(),
      weight: !formData.weight.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('VDLT Sheet Data:', formData);
      // Handle API call or data processing
      setVisible(false);
    }
  };

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
                <View style={styles.headerContent}>
                  <Text variant="titleLarge" style={styles.title}>
                    VDLT Sheet
                  </Text>
                  <Text variant="bodySmall" style={styles.subtitle}>
                    Vehicle Detail & Loading Transport
                  </Text>
                </View>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={() => setVisible(false)}
                  style={styles.closeButton}
                />
              </View>
              <Divider />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {/* Route Information Card */}
                <Card style={styles.card}>
                  <Card.Content>
                    <View style={styles.routeInfo}>
                      <View style={styles.routeSegment}>
                        <Chip icon="truck-loading" style={styles.routeChip}>
                          <Text style={styles.routeText}>Pickup</Text>
                        </Chip>
                        <Text style={styles.location}>Mumbai, Maharashtra</Text>
                        <Text style={styles.locationCode}>BOM</Text>
                      </View>

                      <View style={styles.routeArrow}>
                        <Text style={styles.arrow}>→</Text>
                        <Text style={styles.distance}>1,200 km</Text>
                      </View>

                      <View style={styles.routeSegment}>
                        <Chip icon="map-marker-check" style={styles.routeChip}>
                          <Text style={styles.routeText}>Delivery</Text>
                        </Chip>
                        <Text style={styles.location}>Jaipur, Rajasthan</Text>
                        <Text style={styles.locationCode}>JAI</Text>
                      </View>
                    </View>

                    <View style={styles.routeTags}>
                      <Chip compact mode="outlined" style={styles.tag}>
                        🛣️ Road Transport
                      </Chip>
                      <Chip compact mode="outlined" style={styles.tag}>
                        📅 {formatDate()}
                      </Chip>
                    </View>
                  </Card.Content>
                </Card>

                {/* Transport Type Selection */}
                <View style={styles.section}>
                  <Text variant="labelLarge" style={styles.sectionTitle}>
                    Transport Type
                  </Text>
                  <RadioButton.Group
                    onValueChange={value =>
                      handleChange('transportType', value)
                    }
                    value={formData.transportType}
                  >
                    <View style={styles.radioGroup}>
                      <View style={styles.radioItem}>
                        <RadioButton value="ftl" />
                        <Text>FTL (Full Truck Load)</Text>
                      </View>
                      <View style={styles.radioItem}>
                        <RadioButton value="ltl" />
                        <Text>LTL (Less Than Truck Load)</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>

                {/* Vehicle Details Section */}
                <View style={styles.section}>
                  <Text variant="labelLarge" style={styles.sectionTitle}>
                    Vehicle Details
                  </Text>

                  <TextInput
                    label="Vehicle Segment *"
                    value={formData.vehicleSegment}
                    onChangeText={value =>
                      handleChange('vehicleSegment', value)
                    }
                    mode="outlined"
                    style={styles.input}
                    placeholder="e.g., 20FT, 40FT, TATA 407"
                    dense
                    error={errors.vehicleSegment}
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />
                  {errors.vehicleSegment && (
                    <HelperText type="error" visible={errors.vehicleSegment}>
                      Vehicle segment is required
                    </HelperText>
                  )}

                  <TextInput
                    label="Vehicle Number *"
                    value={formData.vehicleNo}
                    onChangeText={value => handleChange('vehicleNo', value)}
                    mode="outlined"
                    style={styles.input}
                    placeholder="e.g., MH01AB1234"
                    dense
                    error={errors.vehicleNo}
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />
                  {errors.vehicleNo && (
                    <HelperText type="error" visible={errors.vehicleNo}>
                      Vehicle number is required
                    </HelperText>
                  )}

                  <Text variant="labelMedium" style={styles.inputLabel}>
                    Vehicle Type *
                  </Text>
                  <View style={styles.chipContainer}>
                    {vehicleTypes.map(type => (
                      <Chip
                        key={type.value}
                        selected={formData.vehicleType === type.value}
                        onPress={() => handleChange('vehicleType', type.value)}
                        style={[
                          styles.typeChip,
                          formData.vehicleType === type.value &&
                            styles.typeChipSelected,
                        ]}
                        textStyle={[
                          styles.typeChipText,
                          formData.vehicleType === type.value &&
                            styles.typeChipTextSelected,
                        ]}
                      >
                        {type.label}
                      </Chip>
                    ))}
                  </View>
                  {errors.vehicleType && (
                    <HelperText type="error" visible={errors.vehicleType}>
                      Please select vehicle type
                    </HelperText>
                  )}

                  <TextInput
                    label="Place of Change"
                    value={formData.placeOfChange}
                    onChangeText={value => handleChange('placeOfChange', value)}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Enter place of vehicle change"
                    dense
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />
                </View>

                {/* LR Details */}
                <View style={styles.section}>
                  <Text variant="labelLarge" style={styles.sectionTitle}>
                    LR Details
                  </Text>
                  <View style={styles.rowInputs}>
                    <View style={styles.halfInput}>
                      <TextInput
                        label="LR Number *"
                        value={formData.lrNo}
                        onChangeText={value => handleChange('lrNo', value)}
                        mode="outlined"
                        style={styles.input}
                        placeholder="LR No"
                        dense
                        keyboardType="numeric"
                        error={errors.lrNo}
                        outlineColor="#e0e0e0"
                        activeOutlineColor="#007AFF"
                      />
                      {errors.lrNo && (
                        <HelperText type="error" visible={errors.lrNo}>
                          LR number is required
                        </HelperText>
                      )}
                    </View>

                    <View style={styles.halfInput}>
                      <TextInput
                        label="LR Date *"
                        value={formData.lrDate}
                        onChangeText={value => handleChange('lrDate', value)}
                        mode="outlined"
                        style={styles.input}
                        placeholder="DD/MM/YYYY"
                        dense
                        error={errors.lrDate}
                        outlineColor="#e0e0e0"
                        activeOutlineColor="#007AFF"
                      />
                      {errors.lrDate && (
                        <HelperText type="error" visible={errors.lrDate}>
                          LR date is required
                        </HelperText>
                      )}
                    </View>
                  </View>
                </View>

                {/* Driver & Transporter Details */}
                <View style={styles.section}>
                  <Text variant="labelLarge" style={styles.sectionTitle}>
                    Driver & Transporter
                  </Text>

                  <TextInput
                    label="Driver Name *"
                    value={formData.driverName}
                    onChangeText={value => handleChange('driverName', value)}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Enter driver's name"
                    dense
                    error={errors.driverName}
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />
                  {errors.driverName && (
                    <HelperText type="error" visible={errors.driverName}>
                      Driver name is required
                    </HelperText>
                  )}

                  <TextInput
                    label="Driver Contact *"
                    value={formData.driverContact}
                    onChangeText={value => handleChange('driverContact', value)}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Enter contact number"
                    dense
                    keyboardType="phone-pad"
                    error={errors.driverContact}
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />
                  {errors.driverContact && (
                    <HelperText type="error" visible={errors.driverContact}>
                      Driver contact is required
                    </HelperText>
                  )}

                  <TextInput
                    label="Transporter Name"
                    value={formData.transporterName}
                    onChangeText={value =>
                      handleChange('transporterName', value)
                    }
                    mode="outlined"
                    style={styles.input}
                    placeholder="Enter transporter name"
                    dense
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />
                </View>

                {/* Goods Information */}
                <View style={styles.section}>
                  <Text variant="labelLarge" style={styles.sectionTitle}>
                    Goods Information
                  </Text>

                  <TextInput
                    label="Type of Goods"
                    value={formData.goodsType}
                    onChangeText={value => handleChange('goodsType', value)}
                    mode="outlined"
                    style={styles.input}
                    placeholder="e.g., Electronics, Textiles, etc."
                    dense
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />

                  <View style={styles.rowInputs}>
                    <View style={styles.halfInput}>
                      <TextInput
                        label="Weight (kg) *"
                        value={formData.weight}
                        onChangeText={value => handleChange('weight', value)}
                        mode="outlined"
                        style={styles.input}
                        placeholder="Weight in kg"
                        dense
                        keyboardType="numeric"
                        error={errors.weight}
                        outlineColor="#e0e0e0"
                        activeOutlineColor="#007AFF"
                      />
                      {errors.weight && (
                        <HelperText type="error" visible={errors.weight}>
                          Weight is required
                        </HelperText>
                      )}
                    </View>

                    <View style={styles.halfInput}>
                      <TextInput
                        label="Invoice Value"
                        value={formData.invoiceValue}
                        onChangeText={value =>
                          handleChange('invoiceValue', value)
                        }
                        mode="outlined"
                        style={styles.input}
                        placeholder="Value in ₹"
                        dense
                        keyboardType="numeric"
                        outlineColor="#e0e0e0"
                        activeOutlineColor="#007AFF"
                        left={<TextInput.Affix text="₹" />}
                      />
                    </View>
                  </View>

                  <TextInput
                    label="Remarks"
                    value={formData.remarks}
                    onChangeText={value => handleChange('remarks', value)}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Any additional remarks"
                    dense
                    multiline
                    numberOfLines={2}
                    outlineColor="#e0e0e0"
                    activeOutlineColor="#007AFF"
                  />
                </View>
              </ScrollView>

              {/* Footer Actions */}
              <View style={styles.footer}>
                <Button
                  mode="outlined"
                  onPress={() => setVisible(false)}
                  style={styles.footerButton}
                  labelStyle={styles.cancelButtonLabel}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={[styles.footerButton, styles.submitButton]}
                  labelStyle={styles.submitButtonLabel}
                  icon="truck-check"
                >
                  Generate VDLT Sheet
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    minHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    color: '#1a1a1a',
    fontSize: 20,
  },
  subtitle: {
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    margin: -8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routeSegment: {
    flex: 1,
    alignItems: 'center',
  },
  routeChip: {
    backgroundColor: '#f0f7ff',
    marginBottom: 6,
  },
  routeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  locationCode: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginTop: 2,
  },
  routeArrow: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  arrow: {
    fontSize: 24,
    color: '#007AFF',
    marginBottom: 4,
  },
  distance: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  routeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#1a1a1a',
    marginBottom: 12,
    fontWeight: '600',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
  inputLabel: {
    marginBottom: 8,
    color: '#666',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  typeChip: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  typeChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeChipText: {
    color: '#666',
    fontSize: 13,
  },
  typeChipTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    borderRadius: 8,
  },
  cancelButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VDLTSheetModal;
