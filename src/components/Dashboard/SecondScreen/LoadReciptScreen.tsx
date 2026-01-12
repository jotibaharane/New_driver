import React, { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  BarcodeCreatorView,
  BarcodeFormat,
} from 'react-native-barcode-creator';
import { Button, Card, Divider, Modal, Text } from 'react-native-paper';

const { width } = Dimensions.get('window');

/* ================= TYPES ================= */

interface AddressInfo {
  name: string;
  address1: string;
  address2: string;
  city: string;
  pin: string;
  state: string;
  mobile: string;
  email: string;
  gst?: string;
}

interface LRData {
  bookingDate: string;
  awbNumber: string;
  pieceCount: number;
  customerOrderNo: string;
  shipTo: AddressInfo;
  pickupFrom: AddressInfo;
}

interface LoadReceiptScreenProps {
  visible: boolean;
  onDismiss: () => void;
  data?: Partial<LRData>;
  onPrint?: () => void;
}

/* ================= DEFAULT DATA ================= */

const defaultData: LRData = {
  bookingDate: '23/12/2025',
  awbNumber: '303',
  pieceCount: 1,
  customerOrderNo: '9835',
  shipTo: {
    name: 'TEST2',
    address1: 'THANE',
    address2: 'AROLI',
    city: 'TEST',
    pin: '400078',
    state: 'MAHARASHTRA',
    mobile: '9696919070',
    email: 'ali123@gmail.com',
  },
  pickupFrom: {
    name: 'TEST1',
    address1: 'VASI',
    address2: 'VIRAR',
    city: 'BOMBAY',
    pin: '400078',
    state: 'MAHARASHTRA',
    mobile: '—',
    email: 'vishal@gmail.com',
    gst: '1',
  },
};

/* ================= COMPONENT ================= */

const LoadReceiptScreen: FC<LoadReceiptScreenProps> = ({
  visible,
  onDismiss,
  data = {},
  onPrint,
}) => {
  const mergedData = { ...defaultData, ...data };

  /* ============ ADDRESS COLUMN ================= */

  const AddressColumn: FC<{
    title: string;
    data: AddressInfo;
    isPickup?: boolean;
  }> = ({ title, data, isPickup }) => {
    const showMobile = data.mobile !== '—' && data.mobile.trim() !== '';

    return (
      <View style={styles.addressCardWrapper}>
        {/* Header Strip */}
        <View style={styles.addressHeader}>
          <Text style={styles.addressHeaderText}>{title}</Text>
        </View>

        {/* Card Body */}
        <View style={styles.addressCardBody}>
          <Row label="Name" value={data.name} />
          <Row label="Address" value={data.address1} />
          <Row label="" value={data.address2} />
          <Row
            label="City"
            value={`${data.city}, ${data.state} - ${data.pin}`}
          />
          <Row label="📱" value={showMobile ? data.mobile : '—'} />
          <Row label="✉️" value={data.email} />
          {isPickup ? <Row label="GST" value={data.gst ?? '—'} /> : null}
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}
    >
      <Card style={styles.card}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>3PL</Text>
            <Text style={styles.companyName}>MANAGEMENT INDIA PVT. LTD.</Text>
            <Text style={styles.companyTag}>Logistics Partner</Text>
          </View>

          <View style={styles.awbSection}>
            <Info label="AWB No" value={mergedData.awbNumber} />
            <Info label="Date" value={mergedData.bookingDate} />
            <Info label="Pcs" value={mergedData.pieceCount.toString()} />
          </View>
        </View>

        <Divider />

        {/* BARCODE */}
        <View style={styles.barcodeSection}>
          <BarcodeCreatorView
            format={BarcodeFormat.CODE128}
            value={mergedData.awbNumber}
            background="#FFFFFF"
            foregroundColor="#1e3a8a"
            style={styles.barcode}
          />
          <Text style={styles.barcodeText}>AWB: {mergedData.awbNumber}</Text>
        </View>

        <Divider />

        {/* ADDRESSES VERTICALLY */}
        <View style={styles.addressesContainer}>
          <AddressColumn title="Ship To" data={mergedData.shipTo} />
          <AddressColumn
            title="Pickup From"
            data={mergedData.pickupFrom}
            isPickup
          />
        </View>

        <Divider />

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <Text style={styles.orderNumber}>
            Customer Order: {mergedData.customerOrderNo}
          </Text>

          <BarcodeCreatorView
            format={BarcodeFormat.CODE128}
            value={mergedData.customerOrderNo}
            background="#FFFFFF"
            foregroundColor="#059669"
            style={styles.smallBarcode}
          />
        </View>
      </Card>

      {/* ACTIONS */}
      <View style={styles.actionBar}>
        <Button mode="outlined" onPress={onDismiss} style={styles.actionButton}>
          Close
        </Button>
        <Button mode="contained" onPress={onPrint} style={styles.printButton}>
          Print LR
        </Button>
        <Button
          mode="contained-tonal"
          onPress={onDismiss}
          style={styles.actionButton}
        >
          Save PDF
        </Button>
      </View>
    </Modal>
  );
};

/* ================= REUSABLE ================= */

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.addressRow}>
    <Text style={styles.addressLabel}>{label}</Text>
    <Text style={styles.addressValue}>{value}</Text>
  </View>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.awbRow}>
    <Text style={styles.awbLabel}>{label}:</Text>
    <Text style={styles.awbValue}>{value}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#f8fafc',
    margin: 10,
    borderRadius: 12,
  },
  card: {
    padding: 14,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  companyName: {
    fontSize: 10,
    color: '#b91c1c',
    fontWeight: '600',
  },
  companyTag: {
    fontSize: 9,
    color: '#6b7280',
  },
  awbSection: {
    alignItems: 'flex-end',
  },
  awbRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  awbLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginRight: 4,
  },
  awbValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  barcodeSection: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  barcode: {
    width: width * 0.6,
    height: 48,
  },
  barcodeText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  addressesContainer: {
    flexDirection: 'column',
    marginTop: 10,
    gap: 14,
  },
  addressCardWrapper: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addressHeader: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 6,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  addressHeaderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  addressCardBody: {
    padding: 10,
  },
  addressRow: {
    flexDirection: 'row',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  addressLabel: {
    width: 60,
    fontSize: 10,
    color: '#6b7280',
  },
  addressValue: {
    flex: 1,
    fontSize: 10,
    color: '#111827',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 12,
  },
  orderNumber: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  smallBarcode: {
    width: width * 0.45,
    height: 36,
  },
  actionBar: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButton: {
    flex: 1,
  },
  printButton: {
    flex: 1,
    backgroundColor: '#1e3a8a',
  },
});

export default LoadReceiptScreen;
