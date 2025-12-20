import EmptyState from '@components/Common/feedback/EmptyState';
import { RootState } from '@store/index';
import { DriverLoadPost } from '@store/slices/driverLp.types';
import React, { FC, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import AmountInputModal from './AmountInputModal';
import CustomerLoadCard from './CustomerLoadCard';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface NearbyCustomerLoadsModalProps {
  showLoadsModal: any;
  setShowLoadsModal: any;
}

const NearbyCustomerLoadsModal: FC<NearbyCustomerLoadsModalProps> = ({
  showLoadsModal,
  setShowLoadsModal,
}) => {
  const [amountModalVisible, setAmountModalVisible] = useState(false);
  const { list } = useSelector((s: RootState) => s.driverLp);
  const [selectedPost, setSelectedPost] = useState<DriverLoadPost | null>(null);
  console.log({ list });
  const handleAccept = (post: any) => {
    setSelectedPost(post);
    setAmountModalVisible(true);
  };

  return (
    <Modal
      visible={showLoadsModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowLoadsModal(false)}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowLoadsModal(false)}
        />
        <View style={styles.modalContainer}>
          {/* Draggable Handle */}
          <View style={styles.dragHandle} />

          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nearby Loads</Text>
            <TouchableOpacity onPress={() => setShowLoadsModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Loads List */}
          <FlatList
            data={list || []}
            renderItem={({ item }) => (
              <CustomerLoadCard item={item} handleAccept={handleAccept} />
            )}
            keyExtractor={item => item.Customer_LoadPostID}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyState title="Load Not Fount" />}
          />
        </View>
      </View>
      <AmountInputModal
        visible={amountModalVisible}
        setVisible={setAmountModalVisible}
        LoadPostID={selectedPost?.Customer_LoadPostID!}
        submitAmountModal={() => {
          setAmountModalVisible(false);
          setShowLoadsModal(false);
        }}
        CustomerID={selectedPost?.CustomerID!}
        DriverID={selectedPost?.DriverID!}
      />
    </Modal>
  );
};

export default NearbyCustomerLoadsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.8,
    minHeight: SCREEN_HEIGHT * 0.4,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    padding: 4,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
});
