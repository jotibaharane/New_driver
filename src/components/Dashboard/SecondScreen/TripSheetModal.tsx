import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Modal, Text } from 'react-native-paper';

const { width } = Dimensions.get('window');

/* ================= TYPES ================= */

interface AddressInfo {
  name: string;
  address: string;
  city: string;
  mobile: string;
}

interface TripSheetData {
  tripId: string;
  date: string;
  vehicleNo: string;
  driverName: string;
  driverMobile: string;
  route: string;
  totalOrders: number;
  pickup: AddressInfo;
  drop: AddressInfo;
}

interface TripSheetModalProps {
  visible: boolean;
  onDismiss: () => void;
  data?: Partial<TripSheetData>;
}

/* ================= DEFAULT DATA ================= */

const defaultData: TripSheetData = {
  tripId: 'TRIP-10234',
  date: '26/12/2025',
  vehicleNo: 'MH12 AB 2345',
  driverName: 'Ramesh Patil',
  driverMobile: '9876543210',
  route: 'Mumbai → Pune',
  totalOrders: 8,
  pickup: {
    name: 'Main Warehouse',
    address: 'MIDC Phase 2',
    city: 'Mumbai',
    mobile: '9123456789',
  },
  drop: {
    name: 'Customer Hub',
    address: 'Hinjewadi IT Park',
    city: 'Pune',
    mobile: '9988776655',
  },
};

/* ================= COMPONENT ================= */

const TripSheetModal: FC<TripSheetModalProps> = ({
  visible,
  onDismiss,
  data = {},
}) => {
  const trip = { ...defaultData, ...data };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modal}
    >
      <Card style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Trip Sheet</Text>
            <Text style={styles.subTitle}>{trip.tripId}</Text>
          </View>

          {/* DRIVER + VEHICLE */}
          <View style={styles.summaryCard}>
            <InfoRow label="Vehicle No" value={trip.vehicleNo} />
            <InfoRow label="Driver" value={trip.driverName} />
            <InfoRow label="Mobile" value={trip.driverMobile} />
          </View>

          {/* TRIP INFO */}
          <View style={styles.tripInfo}>
            <InfoBox label="Date" value={trip.date} />
            <InfoBox label="Route" value={trip.route} />
            <InfoBox label="Orders" value={trip.totalOrders.toString()} />
          </View>

          <Divider style={{ marginVertical: 12 }} />

          {/* PICKUP */}
          <AddressCard
            title="Pickup Location"
            data={trip.pickup}
            color="#1e3a8a"
          />

          {/* DROP */}
          <AddressCard title="Drop Location" data={trip.drop} color="#047857" />
        </ScrollView>
      </Card>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <Button mode="outlined" onPress={onDismiss} style={styles.btn}>
          Close
        </Button>
        <Button mode="contained" style={styles.printBtn}>
          Print
        </Button>
      </View>
    </Modal>
  );
};

/* ================= SUB COMPONENTS ================= */

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoBox}>
    <Text style={styles.boxLabel}>{label}</Text>
    <Text style={styles.boxValue}>{value}</Text>
  </View>
);

const AddressCard = ({
  title,
  data,
  color,
}: {
  title: string;
  data: AddressInfo;
  color: string;
}) => (
  <View style={styles.addressWrapper}>
    <View style={[styles.addressHeader, { backgroundColor: color }]}>
      <Text style={styles.addressHeaderText}>{title}</Text>
    </View>
    <View style={styles.addressBody}>
      <Text style={styles.addressName}>{data.name}</Text>
      <Text style={styles.addressText}>{data.address}</Text>
      <Text style={styles.addressText}>{data.city}</Text>
      <Text style={styles.addressMobile}>📞 {data.mobile}</Text>
    </View>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#f8fafc',
    margin: 12,
    borderRadius: 12,
  },
  card: {
    padding: 14,
    borderRadius: 12,
    maxHeight: '85%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  subTitle: {
    fontSize: 11,
    color: '#6b7280',
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    width: width / 3.5,
    backgroundColor: '#eef2ff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  boxLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  boxValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  addressWrapper: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  addressHeader: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  addressHeaderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  addressBody: {
    padding: 10,
  },
  addressName: {
    fontWeight: '700',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 11,
    color: '#374151',
  },
  addressMobile: {
    fontSize: 11,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
  },
  btn: {
    flex: 1,
  },
  printBtn: {
    flex: 1,
    backgroundColor: '#1e3a8a',
  },
});

export default TripSheetModal;
