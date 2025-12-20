import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';

const TripDetailsModal = ({
  tripDetailsModalVisible,
  closeModal,
  currentTrip,
}: any) => {
  return (
    <Modal
      visible={tripDetailsModalVisible}
      transparent
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.tripDetailsModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Trip Details</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
              <Icon source="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.tripDetailsContent}>
            {currentTrip && (
              <>
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Route Information</Text>
                  <View style={styles.detailCard}>
                    <Text style={styles.detailText}>
                      Origin: {currentTrip.Origin}
                    </Text>
                    <Text style={styles.detailText}>
                      Destination: {currentTrip.Destination}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Customer Information</Text>
                  <View style={styles.detailCard}>
                    <Text style={styles.detailText}>
                      Name: {currentTrip.CustomerName}
                    </Text>
                    <Text style={styles.detailText}>
                      Phone: {currentTrip.CustomerMobile}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TripDetailsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  tripDetailsModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  tripDetailsContent: {
    padding: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  detailCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  closeIcon: {
    padding: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 8,
  },
});
