import { Formik } from 'formik';
import React, { FC, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Card,
  IconButton,
  Portal,
  SegmentedButtons,
  Text,
} from 'react-native-paper';

import {
  availableVehicle,
  getCoordinateDetails,
  useGetDistrictQuery,
  useGetStateQuery,
  useGetTalukaQuery,
} from '@api/index';
import Dropdown from '@components/common/ui/Dropdown';
import Input from '@components/common/ui/Input';
import Loader from '@components/common/ui/Loader';
import { RootState } from '@store/index';
import { setTripStatus, TRIP_STATUS } from '@store/slices/authSlice';
import { transformLocationToOrigin } from '@utils/geo/location.transformer';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePickerModal } from './DateTimePickerModal';

interface VehicleAvailableModalProps {
  showVehicleMakeModal: boolean;
  closeVehicleMakeModal: () => void;
}

const VehicleAvailableModal: FC<VehicleAvailableModalProps> = ({
  showVehicleMakeModal,
  closeVehicleMakeModal,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [region, setRegion] = useState([]);

  const { data: stateData } = useGetStateQuery();
  const { data: districtData } = useGetDistrictQuery({ state });
  const { data: regionData } = useGetTalukaQuery({ state, district });

  const { driverDetails } = useSelector((s: RootState) => s.auth);
  const { driverLocation } = useSelector((s: RootState) => s.map);

  const handleVehicleMakeSubmit = async (values: any) => {
    try {
      setLoading(true);
      const apiResponse = await getCoordinateDetails({
        LATITUDE: driverLocation?.latitude || 0,
        LONGITUDE: driverLocation?.longitude || 0,
      });
      const origin = await transformLocationToOrigin({
        apiResponse,
        latitude: driverLocation?.latitude!,
        longitude: driverLocation?.longitude!,
      });
      const transRoute = values?.routes?.map((i: any) => {
        return {
          state: i?.state,
          region: i?.district,
          districts: i?.divisions,
        };
      });

      const response = await availableVehicle({
        ...values,
        origin,
        routes: transRoute,
      });
      if (response?.status === '00') {
        dispatch(setTripStatus(TRIP_STATUS.Pending));
        closeVehicleMakeModal();
      } else {
        Toast.show({ type: 'error', text1: response?.data?.message });
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  console.log({ driverDetails });
  return (
    <Portal>
      <Loader visible={loading} />
      <Modal
        visible={showVehicleMakeModal}
        onDismiss={closeVehicleMakeModal}
        animationType="slide"
        transparent
      >
        <View style={styles.modalContainer}>
          <Card style={styles.modalCard}>
            {/* HEADER */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Make Vehicle Available</Text>
              <IconButton icon="close" onPress={closeVehicleMakeModal} />
            </View>

            {/* FORM */}
            <Formik<any>
              initialValues={{
                driverID: driverDetails?.DriverID,
                vendorid: driverDetails?.VehicleID,
                origin: {},
                routes: [],
                vehicleType: driverDetails?.DriverVehicleType,
                vehicleNumber: driverDetails?.registration_no,
                reportingTime: '',
                vehicleStatus: 'Empty',
                driverMobile: driverDetails?.MobileNo,
              }}
              onSubmit={handleVehicleMakeSubmit}
              enableReinitialize
            >
              {({ handleSubmit, setFieldValue, values, handleChange }) => (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
                >
                  {/* STATUS */}
                  <SegmentedButtons
                    value={values.vehicleStatus}
                    onValueChange={handleChange('vehicleStatus')}
                    style={{ marginBottom: 16 }}
                    buttons={[
                      { label: 'EMPTY', value: 'Empty', icon: 'truck' },
                      {
                        label: 'UNLOADING',
                        value: 'Unloading',
                        icon: 'archive-arrow-down-outline',
                      },
                      {
                        label: 'WAITING',
                        value: 'Waiting',
                        icon: 'timer-sand',
                      },
                    ]}
                  />

                  {/* LOCATION FORM */}
                  <Card style={styles.locationCard}>
                    <Dropdown
                      data={stateData?.data || []}
                      value={state}
                      label="State"
                      placeholder="Select State"
                      onChange={(v: any) => {
                        setState(v);
                        setDistrict('');
                        setRegion([]);
                      }}
                    />
                    <View style={{ height: 10 }} />
                    <Dropdown
                      data={districtData?.data || []}
                      value={district}
                      label="District"
                      placeholder="Select District"
                      onChange={(v: any) => {
                        setDistrict(v);
                        setRegion([]);
                      }}
                    />
                    <View style={{ height: 10 }} />
                    <Dropdown
                      data={regionData?.data || []}
                      value={region}
                      multi
                      label="Division"
                      placeholder="Select Division(s)"
                      onChange={(v: any) => setRegion(v)}
                    />
                    <View style={{ height: 10 }} />
                    <Button
                      mode="contained"
                      icon="plus"
                      onPress={() => {
                        if (!state || !district || region.length === 0) {
                          Alert.alert(
                            'Missing Values',
                            'Please select state, district & at least one division',
                          );
                          return;
                        }

                        setFieldValue('routes', [
                          ...values.routes,
                          { state, district, divisions: region },
                        ]);

                        setState('');
                        setDistrict('');
                        setRegion([]);
                      }}
                    >
                      Add Route
                    </Button>
                  </Card>

                  {/* ROUTES LIST */}
                  <Text style={styles.routeTitle}>
                    Added Routes ({values.routes.length})
                  </Text>

                  <FlatList
                    data={values.routes}
                    keyExtractor={(_, i) => i.toString()}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item, index }) => (
                      <Card style={styles.routeCard}>
                        <View style={styles.routeRow}>
                          <Text style={styles.routeIndex}>#{index + 1}</Text>

                          <View style={{ flex: 1 }}>
                            <Text style={styles.routeText}>
                              {item?.state} → {item?.district} →{' '}
                              {item?.divisions?.join(' → ')}
                            </Text>
                          </View>

                          <IconButton
                            icon="delete"
                            iconColor="red"
                            size={22}
                            onPress={() =>
                              setFieldValue(
                                'routes',
                                values.routes.filter(
                                  (_: any, i: any) => i !== index,
                                ),
                              )
                            }
                          />
                        </View>
                      </Card>
                    )}
                  />

                  {/* REPORTING TIME */}
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <View pointerEvents="none">
                      <Input
                        label="Reporting Time"
                        mode="outlined"
                        value={values.reportingTime}
                        style={{ marginTop: 16 }}
                      />
                    </View>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    open={open}
                    setOpen={setOpen}
                    onSelect={t => setFieldValue('reportingTime', t)}
                  />

                  {/* ACTION BUTTONS */}
                  <View style={styles.actionsRow}>
                    <Button mode="outlined" onPress={closeVehicleMakeModal}>
                      Cancel
                    </Button>

                    <Button mode="contained" onPress={() => handleSubmit()}>
                      Go Online
                    </Button>
                  </View>
                </ScrollView>
              )}
            </Formik>
          </Card>
        </View>
      </Modal>
    </Portal>
  );
};

export default VehicleAvailableModal;

/* ---------------------------- STYLES HERE ---------------------------- */

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCard: {
    height: '92%',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#fff',
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  scrollContent: {
    paddingBottom: 80,
    paddingHorizontal: 4,
  },
  locationCard: {
    marginTop: 10,
    padding: 16,
    gap: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  routeTitle: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  routeCard: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#4B5563',
  },
  routeText: {
    fontSize: 14,
    color: '#333',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 4,
  },
});
