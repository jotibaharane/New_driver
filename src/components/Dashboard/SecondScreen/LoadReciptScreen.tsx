import DateTimePicker from '@react-native-community/datetimepicker';
import React, { FC, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  HelperText,
  IconButton,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

type VehicleType =
  | 'open_truck'
  | 'closed_truck'
  | 'trailer'
  | 'container'
  | 'temp_control';
type PaymentType = 'to_pay' | 'paid';

const TruckLRModal: FC<Props> = ({ visible, setVisible }) => {
  const [formData, setFormData] = useState({
    lrNo: '',
    lrDate: new Date(),
    vehicleType: 'closed_truck' as VehicleType,
    fromLocation: 'Mumbai, Maharashtra',
    toLocation: 'Jaipur, Rajasthan',
    consignorName: '',
    consignorGST: '',
    consigneeName: '',
    consigneeGST: '',
    vehicleNo: '',
    driverName: '',
    driverContact: '',
    driverLicense: '',
    transporterName: '',
    transporterGST: '',
    goodsDescription: '',
    packages: '',
    actualWeight: '',
    chargedWeight: '',
    ratePerKg: '',
    ratePerTruck: '',
    freightAmount: '',
    loadingCharges: '',
    unloadingCharges: '',
    detentionCharges: '',
    tollCharges: '',
    totalAmount: '',
    paymentType: 'to_pay' as PaymentType,
    eWayBillNo: '',
    permitNo: '',
    fitnessCertNo: '',
    insuranceNo: '',
    deliveryTime: '',
    specialInstructions: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);
  const [usePerKgRate, setUsePerKgRate] = useState(true);
  const [errors, setErrors] = useState({
    lrNo: false,
    consignorName: false,
    consigneeName: false,
    vehicleNo: false,
    driverName: false,
    goodsDescription: false,
    actualWeight: false,
  });

  const vehicleTypes = [
    { label: 'Open Truck', value: 'open_truck', icon: 'truck' },
    { label: 'Closed Truck', value: 'closed_truck', icon: 'truck-trailer' },
    { label: 'Trailer', value: 'trailer', icon: 'truck-cargo-container' },
    { label: 'Container', value: 'container', icon: 'container' },
    { label: 'Temp Control', value: 'temp_control', icon: 'snowflake' },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field as keyof typeof errors] && value) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }

    // Recalculate charges if weight or rate changes
    if (
      field === 'actualWeight' ||
      field === 'ratePerKg' ||
      field === 'ratePerTruck'
    ) {
      calculateCharges();
    }
  };

  const calculateCharges = () => {
    let freight = 0;

    if (usePerKgRate) {
      const weight = parseFloat(formData.actualWeight) || 0;
      const rate = parseFloat(formData.ratePerKg) || 0;
      freight = weight * rate;
    } else {
      freight = parseFloat(formData.ratePerTruck) || 0;
    }

    const loading = parseFloat(formData.loadingCharges) || 0;
    const unloading = parseFloat(formData.unloadingCharges) || 0;
    const detention = parseFloat(formData.detentionCharges) || 0;
    const toll = parseFloat(formData.tollCharges) || 0;

    const total = freight + loading + unloading + detention + toll;

    handleChange('freightAmount', freight.toFixed(2));
    handleChange('totalAmount', total.toFixed(2));
  };

  const validateForm = () => {
    const newErrors = {
      lrNo: !formData.lrNo.trim(),
      consignorName: !formData.consignorName.trim(),
      consigneeName: !formData.consigneeName.trim(),
      vehicleNo: !formData.vehicleNo.trim(),
      driverName: !formData.driverName.trim(),
      goodsDescription: !formData.goodsDescription.trim(),
      actualWeight: !formData.actualWeight.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Truck LR Data:', formData);
      // Generate truck LR
      setVisible(false);
    }
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.overlay}>
              <View style={styles.modalContent}>
                {/* Header with Truck Theme */}
                <View style={styles.header}>
                  <View style={styles.headerContent}>
                    <Avatar.Icon
                      size={44}
                      icon="truck-fast"
                      style={styles.headerIcon}
                    />
                    <View>
                      <Text variant="titleLarge" style={styles.title}>
                        Truck LR (Lorry Receipt)
                      </Text>
                      <Text variant="bodySmall" style={styles.subtitle}>
                        Road Transport Consignment Note
                      </Text>
                    </View>
                  </View>
                  <IconButton
                    icon="close"
                    size={24}
                    onPress={() => setVisible(false)}
                  />
                </View>
                <Divider />

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
                >
                  {/* LR & Vehicle Info Section */}
                  <Card style={styles.card}>
                    <Card.Content>
                      <View style={styles.rowInputs}>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="LR Number *"
                            value={formData.lrNo}
                            onChangeText={value => handleChange('lrNo', value)}
                            mode="outlined"
                            style={styles.input}
                            placeholder="Enter LR No"
                            dense
                            error={errors.lrNo}
                            outlineColor="#e0e0e0"
                            activeOutlineColor="#FF6B00"
                          />
                          {errors.lrNo && (
                            <HelperText type="error" visible={errors.lrNo}>
                              Required
                            </HelperText>
                          )}
                        </View>

                        <TouchableWithoutFeedback
                          onPress={() => setShowDatePicker(true)}
                          style={styles.halfInput}
                        >
                          <View style={styles.dateInputContainer}>
                            <Text style={styles.inputLabel}>LR Date *</Text>
                            <View style={styles.dateInput}>
                              <Text style={styles.dateText}>
                                {formatDate(formData.lrDate)}
                              </Text>
                              <IconButton
                                icon="calendar"
                                size={20}
                                style={styles.dateIcon}
                              />
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>

                      {showDatePicker && (
                        <DateTimePicker
                          value={formData.lrDate}
                          mode="date"
                          display="default"
                          onChange={(event, date) => {
                            setShowDatePicker(false);
                            if (date) handleChange('lrDate', date);
                          }}
                        />
                      )}

                      <Text style={styles.sectionLabel}>Truck Type</Text>
                      <View style={styles.chipContainer}>
                        {vehicleTypes.map(type => (
                          <Chip
                            key={type.value}
                            selected={formData.vehicleType === type.value}
                            onPress={() =>
                              handleChange('vehicleType', type.value)
                            }
                            style={[
                              styles.typeChip,
                              formData.vehicleType === type.value &&
                                styles.typeChipSelected,
                            ]}
                            icon={type.icon}
                            showSelectedCheck
                          >
                            {type.label}
                          </Chip>
                        ))}
                      </View>
                    </Card.Content>
                  </Card>

                  {/* Route Card with Truck Icons */}
                  <Card style={[styles.card, styles.routeCard]}>
                    <Card.Content>
                      <View style={styles.routeInfo}>
                        <View style={styles.locationSection}>
                          <Chip
                            icon="truck-loading"
                            style={styles.locationChip}
                          >
                            From
                          </Chip>
                          <Text
                            variant="titleMedium"
                            style={styles.locationText}
                          >
                            {formData.fromLocation}
                          </Text>
                          <Text
                            variant="bodySmall"
                            style={styles.locationSubtext}
                          >
                            Loading Point
                          </Text>
                        </View>

                        <View style={styles.routeMiddle}>
                          <IconButton icon="arrow-right-bold" size={24} />
                          <Chip mode="outlined" style={styles.distanceChip}>
                            1,200 km
                          </Chip>
                          <Text
                            variant="labelSmall"
                            style={styles.timeEstimate}
                          >
                            24-36 hrs
                          </Text>
                        </View>

                        <View style={styles.locationSection}>
                          <Chip
                            icon="map-marker-check"
                            style={styles.locationChip}
                          >
                            To
                          </Chip>
                          <Text
                            variant="titleMedium"
                            style={styles.locationText}
                          >
                            {formData.toLocation}
                          </Text>
                          <Text
                            variant="bodySmall"
                            style={styles.locationSubtext}
                          >
                            Unloading Point
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>

                  {/* Consignor & Consignee */}
                  <View style={styles.twoColumnSection}>
                    <Card style={styles.columnCard}>
                      <Card.Content>
                        <View style={styles.sectionHeader}>
                          <IconButton icon="factory" size={20} />
                          <Text
                            variant="titleMedium"
                            style={styles.columnTitle}
                          >
                            Consignor (Shipper)
                          </Text>
                        </View>
                        <TextInput
                          label="Name *"
                          value={formData.consignorName}
                          onChangeText={value =>
                            handleChange('consignorName', value)
                          }
                          mode="outlined"
                          style={styles.input}
                          dense
                          error={errors.consignorName}
                        />
                        <TextInput
                          label="GST No"
                          value={formData.consignorGST}
                          onChangeText={value =>
                            handleChange('consignorGST', value)
                          }
                          mode="outlined"
                          style={styles.input}
                          dense
                        />
                      </Card.Content>
                    </Card>

                    <Card style={styles.columnCard}>
                      <Card.Content>
                        <View style={styles.sectionHeader}>
                          <IconButton icon="warehouse" size={20} />
                          <Text
                            variant="titleMedium"
                            style={styles.columnTitle}
                          >
                            Consignee (Receiver)
                          </Text>
                        </View>
                        <TextInput
                          label="Name *"
                          value={formData.consigneeName}
                          onChangeText={value =>
                            handleChange('consigneeName', value)
                          }
                          mode="outlined"
                          style={styles.input}
                          dense
                          error={errors.consigneeName}
                        />
                        <TextInput
                          label="GST No"
                          value={formData.consigneeGST}
                          onChangeText={value =>
                            handleChange('consigneeGST', value)
                          }
                          mode="outlined"
                          style={styles.input}
                          dense
                        />
                      </Card.Content>
                    </Card>
                  </View>

                  {/* Truck & Driver Details */}
                  <Card style={styles.card}>
                    <Card.Content>
                      <View style={styles.sectionHeader}>
                        <IconButton icon="truck" size={20} />
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                          Truck & Driver Details
                        </Text>
                      </View>

                      <View style={styles.rowInputs}>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Truck No *"
                            value={formData.vehicleNo}
                            onChangeText={value =>
                              handleChange('vehicleNo', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            placeholder="MH01AB1234"
                            dense
                            error={errors.vehicleNo}
                            left={<TextInput.Affix text="🚛" />}
                          />
                        </View>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Driver Name *"
                            value={formData.driverName}
                            onChangeText={value =>
                              handleChange('driverName', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                            error={errors.driverName}
                          />
                        </View>
                      </View>

                      <View style={styles.rowInputs}>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Driver Contact"
                            value={formData.driverContact}
                            onChangeText={value =>
                              handleChange('driverContact', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            keyboardType="phone-pad"
                            dense
                          />
                        </View>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="License No"
                            value={formData.driverLicense}
                            onChangeText={value =>
                              handleChange('driverLicense', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                          />
                        </View>
                      </View>

                      <View style={styles.rowInputs}>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Transporter"
                            value={formData.transporterName}
                            onChangeText={value =>
                              handleChange('transporterName', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                          />
                        </View>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Transporter GST"
                            value={formData.transporterGST}
                            onChangeText={value =>
                              handleChange('transporterGST', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                          />
                        </View>
                      </View>
                    </Card.Content>
                  </Card>

                  {/* Goods Details */}
                  <Card style={styles.card}>
                    <Card.Content>
                      <View style={styles.sectionHeader}>
                        <IconButton icon="package-variant" size={20} />
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                          Goods Details
                        </Text>
                      </View>

                      <TextInput
                        label="Goods Description *"
                        value={formData.goodsDescription}
                        onChangeText={value =>
                          handleChange('goodsDescription', value)
                        }
                        mode="outlined"
                        style={styles.input}
                        multiline
                        numberOfLines={2}
                        dense
                        error={errors.goodsDescription}
                      />

                      <View style={styles.rowInputs}>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="No. of Packages"
                            value={formData.packages}
                            onChangeText={value =>
                              handleChange('packages', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            dense
                          />
                        </View>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Weight (kg) *"
                            value={formData.actualWeight}
                            onChangeText={value =>
                              handleChange('actualWeight', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            keyboardType="decimal-pad"
                            dense
                            error={errors.actualWeight}
                            right={<TextInput.Affix text="kg" />}
                          />
                        </View>
                      </View>

                      {/* Rate Type Selection */}
                      <View style={styles.rateTypeSection}>
                        <Text style={styles.sectionLabel}>Rate Type</Text>
                        <View style={styles.rateTypeButtons}>
                          <Chip
                            selected={usePerKgRate}
                            onPress={() => setUsePerKgRate(true)}
                            style={[
                              styles.rateChip,
                              usePerKgRate && styles.rateChipSelected,
                            ]}
                          >
                            Per Kg Rate
                          </Chip>
                          <Chip
                            selected={!usePerKgRate}
                            onPress={() => setUsePerKgRate(false)}
                            style={[
                              styles.rateChip,
                              !usePerKgRate && styles.rateChipSelected,
                            ]}
                          >
                            Per Truck Rate
                          </Chip>
                        </View>
                      </View>

                      <View style={styles.rowInputs}>
                        {usePerKgRate ? (
                          <View style={styles.halfInput}>
                            <TextInput
                              label="Rate per kg"
                              value={formData.ratePerKg}
                              onChangeText={value =>
                                handleChange('ratePerKg', value)
                              }
                              mode="outlined"
                              style={styles.input}
                              keyboardType="decimal-pad"
                              dense
                              left={<TextInput.Affix text="₹" />}
                            />
                          </View>
                        ) : (
                          <View style={styles.fullInput}>
                            <TextInput
                              label="Rate per truck"
                              value={formData.ratePerTruck}
                              onChangeText={value =>
                                handleChange('ratePerTruck', value)
                              }
                              mode="outlined"
                              style={styles.input}
                              keyboardType="decimal-pad"
                              dense
                              left={<TextInput.Affix text="₹" />}
                            />
                          </View>
                        )}
                      </View>
                    </Card.Content>
                  </Card>

                  {/* Charges Breakdown */}
                  <Card style={styles.card}>
                    <Card.Content>
                      <View style={styles.sectionHeader}>
                        <IconButton icon="calculator" size={20} />
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                          Charges Breakdown
                        </Text>
                      </View>

                      <View style={styles.chargesGrid}>
                        <View style={styles.chargeItem}>
                          <Text style={styles.chargeLabel}>Freight Amount</Text>
                          <Text style={styles.chargeValue}>
                            ₹
                            {parseFloat(formData.freightAmount || '0').toFixed(
                              2,
                            )}
                          </Text>
                        </View>

                        <View style={styles.chargeRow}>
                          <TextInput
                            label="Loading Charges"
                            value={formData.loadingCharges}
                            onChangeText={value => {
                              handleChange('loadingCharges', value);
                              calculateCharges();
                            }}
                            mode="outlined"
                            style={styles.chargeInput}
                            keyboardType="decimal-pad"
                            dense
                            left={<TextInput.Affix text="₹" />}
                          />
                          <TextInput
                            label="Unloading Charges"
                            value={formData.unloadingCharges}
                            onChangeText={value => {
                              handleChange('unloadingCharges', value);
                              calculateCharges();
                            }}
                            mode="outlined"
                            style={styles.chargeInput}
                            keyboardType="decimal-pad"
                            dense
                            left={<TextInput.Affix text="₹" />}
                          />
                        </View>

                        <View style={styles.chargeRow}>
                          <TextInput
                            label="Detention Charges"
                            value={formData.detentionCharges}
                            onChangeText={value => {
                              handleChange('detentionCharges', value);
                              calculateCharges();
                            }}
                            mode="outlined"
                            style={styles.chargeInput}
                            keyboardType="decimal-pad"
                            dense
                            left={<TextInput.Affix text="₹" />}
                          />
                          <TextInput
                            label="Toll Charges"
                            value={formData.tollCharges}
                            onChangeText={value => {
                              handleChange('tollCharges', value);
                              calculateCharges();
                            }}
                            mode="outlined"
                            style={styles.chargeInput}
                            keyboardType="decimal-pad"
                            dense
                            left={<TextInput.Affix text="₹" />}
                          />
                        </View>
                      </View>

                      <Divider style={styles.totalDivider} />

                      <View style={styles.totalSection}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalAmount}>
                          ₹
                          {parseFloat(
                            formData.totalAmount || '0',
                          ).toLocaleString('en-IN')}
                        </Text>
                      </View>

                      <View style={styles.paymentType}>
                        <Text style={styles.sectionLabel}>Payment Type</Text>
                        <View style={styles.paymentChips}>
                          <Chip
                            selected={formData.paymentType === 'to_pay'}
                            onPress={() =>
                              handleChange('paymentType', 'to_pay')
                            }
                            style={[
                              styles.paymentChip,
                              formData.paymentType === 'to_pay' &&
                                styles.paymentChipSelected,
                            ]}
                            icon="cash-clock"
                          >
                            To Pay
                          </Chip>
                          <Chip
                            selected={formData.paymentType === 'paid'}
                            onPress={() => handleChange('paymentType', 'paid')}
                            style={[
                              styles.paymentChip,
                              formData.paymentType === 'paid' &&
                                styles.paymentChipSelected,
                            ]}
                            icon="cash-check"
                          >
                            Paid
                          </Chip>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>

                  {/* Documents & Additional Info */}
                  <Card style={styles.card}>
                    <Card.Content>
                      <View style={styles.sectionHeader}>
                        <IconButton icon="file-document" size={20} />
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                          Documents & Instructions
                        </Text>
                      </View>

                      <View style={styles.rowInputs}>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="E-Way Bill No"
                            value={formData.eWayBillNo}
                            onChangeText={value =>
                              handleChange('eWayBillNo', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                          />
                        </View>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Permit No"
                            value={formData.permitNo}
                            onChangeText={value =>
                              handleChange('permitNo', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                          />
                        </View>
                      </View>

                      <View style={styles.rowInputs}>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Fitness Cert No"
                            value={formData.fitnessCertNo}
                            onChangeText={value =>
                              handleChange('fitnessCertNo', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                          />
                        </View>
                        <View style={styles.halfInput}>
                          <TextInput
                            label="Insurance No"
                            value={formData.insuranceNo}
                            onChangeText={value =>
                              handleChange('insuranceNo', value)
                            }
                            mode="outlined"
                            style={styles.input}
                            dense
                          />
                        </View>
                      </View>

                      <TextInput
                        label="Special Instructions"
                        value={formData.specialInstructions}
                        onChangeText={value =>
                          handleChange('specialInstructions', value)
                        }
                        mode="outlined"
                        style={styles.input}
                        multiline
                        numberOfLines={2}
                        dense
                      />
                    </Card.Content>
                  </Card>
                </ScrollView>

                {/* Action Buttons */}
                <View style={styles.footer}>
                  <Button
                    mode="outlined"
                    onPress={() => setVisible(false)}
                    style={styles.cancelButton}
                    labelStyle={styles.cancelButtonLabel}
                    icon="cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.submitButton}
                    labelStyle={styles.submitButtonLabel}
                    icon="truck-check"
                  >
                    Generate Truck LR
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '95%',
    minHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#FFF8F0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    backgroundColor: '#FF6B00',
    marginRight: 12,
  },
  title: {
    fontWeight: '700',
    color: '#333333',
    fontSize: 20,
  },
  subtitle: {
    color: '#666666',
    marginTop: 2,
    fontSize: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  routeCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  halfInput: {
    flex: 1,
  },
  fullInput: {
    flex: 1,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  inputLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '500',
  },
  dateInputContainer: {
    flex: 1,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 50,
  },
  dateText: {
    fontSize: 16,
    color: '#333333',
  },
  dateIcon: {
    margin: 0,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  typeChipSelected: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationSection: {
    flex: 1,
    alignItems: 'center',
  },
  locationChip: {
    backgroundColor: '#FFF3E0',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 2,
  },
  locationSubtext: {
    fontSize: 11,
    color: '#666666',
  },
  routeMiddle: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  distanceChip: {
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
  },
  timeEstimate: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  twoColumnSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  columnCard: {
    flex: 1,
    elevation: 2,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 16,
  },
  columnTitle: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 14,
  },
  rateTypeSection: {
    marginTop: 12,
    marginBottom: 12,
  },
  rateTypeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rateChip: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  rateChipSelected: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  chargesGrid: {
    marginBottom: 12,
  },
  chargeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  chargeLabel: {
    fontSize: 14,
    color: '#666666',
  },
  chargeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  chargeRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  chargeInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  totalDivider: {
    marginVertical: 12,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B00',
  },
  paymentType: {
    marginTop: 8,
  },
  paymentChips: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentChip: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paymentChipSelected: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#DDDDDD',
  },
  cancelButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  submitButton: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#FF6B00',
  },
  submitButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TruckLRModal;
