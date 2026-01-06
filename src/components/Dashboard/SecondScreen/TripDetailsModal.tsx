import { RootState } from '@store/index';
import React, { FC } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { useSelector } from 'react-redux';

interface TripDetailsModalProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const TripDetailsModal: FC<TripDetailsModalProps> = ({
  visible,
  setVisible,
}) => {
  const { active } = useSelector((s: RootState) => s.driverLp);

  if (!active) return null;

  const onCallCustomer = () => {
    if (active.PickupContactNumber) {
      Linking.openURL(`tel:${active.PickupContactNumber}`);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Trip Details</Text>
              <Text style={styles.subTitle}>Load ID: {active.LoadPostID}</Text>
            </View>

            <View style={styles.headerRight}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{active.LP_Status}</Text>
              </View>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Icon source="close" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Route */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Route</Text>

              <View style={styles.routeRow}>
                <Icon source="map-marker" size={18} color="#2563EB" />
                <Text style={styles.routeText}>{active.PickupAddress}</Text>
              </View>

              <View style={styles.routeDivider} />

              <View style={styles.routeRow}>
                <Icon source="map-marker-check" size={18} color="#16A34A" />
                <Text style={styles.routeText}>{active.DeliveryAddress}</Text>
              </View>
            </View>

            {/* Customer */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Customer</Text>

              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.label}>Contact Person</Text>
                  <Text style={styles.value}>{active.PickupContactPerson}</Text>
                </View>

                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={onCallCustomer}
                >
                  <Icon source="phone" size={18} color="#FFFFFF" />
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.metaText}>
                📞 {active.PickupContactNumber}
              </Text>
            </View>

            {/* Load Details */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Load Details</Text>

              <View style={styles.kvRow}>
                <Text style={styles.label}>Vehicle Type</Text>
                <Text style={styles.value}>{active.VehicleType}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.label}>Body Type</Text>
                <Text style={styles.value}>{active.BodyType}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.label}>Cargo</Text>
                <Text style={styles.value}>{active.CargoContent}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.label}>Package Type</Text>
                <Text style={styles.value}>{active.CargoPackageType}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.label}>Weight</Text>
                <Text style={styles.value}>{active.Weight}</Text>
              </View>
            </View>

            <View style={{ height: 24 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TripDetailsModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '90%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },

  card: {
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },

  routeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  routeText: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
  },
  routeDivider: {
    height: 12,
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#D1D5DB',
    marginVertical: 8,
  },

  kvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  callText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  metaText: {
    marginTop: 6,
    fontSize: 13,
    color: '#374151',
  },
});
