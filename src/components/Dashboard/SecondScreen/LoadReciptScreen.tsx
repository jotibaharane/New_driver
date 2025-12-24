import React, { FC } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  BarcodeCreatorView,
  BarcodeFormat,
} from 'react-native-barcode-creator';
import { Button, Card, Divider, Modal, Text } from 'react-native-paper';
// import Barcode from 'react-native-barcode-builder';
interface LoadReciptScreenProps {
  visible: boolean;
  setVisible: any;
}
const LoadReciptScreen: FC<LoadReciptScreenProps> = ({
  visible,
  setVisible,
}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <ScrollView>
        <Card style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.logoText}>3PL</Text>
              <Text style={styles.subLogo}>MANAGEMENT INDIA PVT. LTD.</Text>
            </View>
            <Image
              source={{ uri: 'https://via.placeholder.com/80' }}
              style={styles.image}
            />
          </View>

          <Divider />

          {/* Booking Info */}
          <View style={styles.section}>
            <Text>Booking Date# : 23/12/2025</Text>
            <Text>3PL AWB NO # : 303</Text>
            <Text>NO of Pcs # : 1</Text>
          </View>

          {/* Barcode */}
          <View style={styles.barcodeBox}>
            <BarcodeCreatorView
              format={BarcodeFormat.CODE128}
              value="303"
              background={'#FFFFFF'}
              foregroundColor={'#000000'}
              style={{}}
            />
            <Text style={styles.barcodeText}>303</Text>
          </View>

          <Divider />

          {/* Ship To */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ship To :</Text>
            <Text>Name : TEST2</Text>
            <Text>Address-1 : THANE</Text>
            <Text>Address-2 : AROLI</Text>
            <Text>City : TEST</Text>
            <Text>Pin : 400078</Text>
            <Text>State : MAHARASHTRA</Text>
            <Text>Mobile No : 9696919070</Text>
            <Text>Email : ali123@gmail.com</Text>
          </View>

          <Divider />

          {/* Pickup Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup Address :</Text>
            <Text>Name : TEST1</Text>
            <Text>Address-1 : VASI</Text>
            <Text>Address-2 : VIRAR</Text>
            <Text>City : BOMBAY</Text>
            <Text>Pin : 400078</Text>
            <Text>State : MAHARASHTRA</Text>
            <Text>Mobile No : —</Text>
            <Text>Email : vishal@gmail.com</Text>
            <Text>GST : 1</Text>
          </View>

          <Divider />

          {/* Order Barcode */}
          <View style={styles.barcodeBox}>
            <Text>Customer Order NO # : 9835</Text>
            <BarcodeCreatorView
              format={BarcodeFormat.CODE128}
              value="9835"
              background={'#FFFFFF'}
              foregroundColor={'#000000'}
              style={{}}
            />
          </View>
        </Card>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.actionRow}>
        <Button mode="outlined" onPress={() => setVisible(false)}>
          Close
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            // integrate react-native-print
          }}
        >
          Print
        </Button>
      </View>
    </Modal>
  );
};

export default LoadReciptScreen;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#f4f4f4',
    marginTop: '20%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 10,
    maxHeight: '90%',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  subLogo: {
    fontSize: 12,
    color: '#b91c1c',
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  barcodeBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  barcodeText: {
    marginTop: 4,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    gap: 10,
  },
});
