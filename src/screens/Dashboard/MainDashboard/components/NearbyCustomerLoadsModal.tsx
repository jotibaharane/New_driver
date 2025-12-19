import { useNearbyCustomersPostQuery } from '@api/index';
import { RootState } from '@store/index';
import React, { FC } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { formatDistance } from '../SecondScreen/helper';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MOCK_LOADS = [
  {
    id: '1',
    from: 'Mumbai',
    to: 'Delhi',
    weight: '10 tons',
    material: 'Steel',
    price: '₹25,000',
    distance: '1400 km',
  },
  {
    id: '2',
    from: 'Bangalore',
    to: 'Chennai',
    weight: '5 tons',
    material: 'Electronics',
    price: '₹15,000',
    distance: '350 km',
  },
  {
    id: '3',
    from: 'Kolkata',
    to: 'Hyderabad',
    weight: '8 tons',
    material: 'Textiles',
    price: '₹20,000',
    distance: '1200 km',
  },
  {
    id: '4',
    from: 'Pune',
    to: 'Ahmedabad',
    weight: '12 tons',
    material: 'Machinery',
    price: '₹30,000',
    distance: '650 km',
  },
  {
    id: '5',
    from: 'Jaipur',
    to: 'Lucknow',
    weight: '7 tons',
    material: 'Marble',
    price: '₹18,000',
    distance: '550 km',
  },
];

interface NearbyCustomerLoadsModalProps {
  showLoadsModal: any;
  setShowLoadsModal: any;
}

const NearbyCustomerLoadsModal: FC<NearbyCustomerLoadsModalProps> = ({
  showLoadsModal,
  setShowLoadsModal,
}) => {
  const { driverLocation } = useSelector((s: RootState) => s.map);
  const { driverDetails } = useSelector((s: RootState) => s.auth);
  const {
    data: nearbyData,
    isLoading: isLoadingNearby,
    refetch,
  } = useNearbyCustomersPostQuery(
    {
      Lat: driverLocation?.latitude || 0,
      Lng: driverLocation?.longitude || 0,
      VehicleType: driverDetails?.vehicleType || '',
      DriverID: driverDetails?.DriverID || '',
    },
    {
      skip: !driverDetails?.DriverID,
    },
  );
  console.log({ nearbyData });
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
            data={nearbyData?.data || []}
            renderItem={({ item: post }) => (
              <View style={styles.postCard}>
                {/* Header with Post ID */}
                <View style={styles.cardHeader}>
                  <View style={styles.postIdContainer}>
                    <Text style={styles.postIdText}>
                      LOAD #{post.LoadPostID}
                    </Text>
                  </View>
                  <View style={styles.distanceBadge}>
                    <Icon source="navigate" size={12} color="#fff" />
                    <Text style={styles.distanceBadgeText}>
                      {formatDistance(post.DistanceInKm)}
                    </Text>
                  </View>
                </View>

                {/* Pickup Section */}
                <View style={styles.locationSection}>
                  <View style={styles.locationHeader}>
                    <View style={styles.locationIconContainer}>
                      <Icon source="location" size={16} color="#2ecc71" />
                    </View>
                    <View style={styles.locationTextContainer}>
                      <Text style={styles.locationLabel}>Pickup Location</Text>
                      <Text style={styles.locationAddress} numberOfLines={2}>
                        {post.Origin || 'Unknown origin'}
                      </Text>
                    </View>
                    <View style={styles.distanceContainer}>
                      <Text style={styles.distanceValue}>
                        {post.PickupDistanceKm || 0} km
                      </Text>
                      <Text style={styles.distanceLabel}>from you</Text>
                    </View>
                  </View>
                </View>

                {/* Arrow Divider */}
                <View style={styles.arrowDivider}>
                  <View style={styles.arrowLine} />
                  <View style={styles.arrowIconContainer}>
                    <Icon source="arrow-down" size={20} color="#3498db" />
                  </View>
                  <View style={styles.arrowLine} />
                </View>

                {/* Destination Section */}
                <View style={styles.locationSection}>
                  <View style={styles.locationHeader}>
                    <View style={styles.locationIconContainer}>
                      <Icon source="flag" size={16} color="#e74c3c" />
                    </View>
                    <View style={styles.locationTextContainer}>
                      <Text style={styles.locationLabel}>
                        Delivery Location
                      </Text>
                      <Text style={styles.locationAddress} numberOfLines={2}>
                        {post.Destination || 'Unknown destination'}
                      </Text>
                    </View>
                    <View style={styles.distanceContainer}>
                      <Text style={styles.distanceValue}>
                        {post.DestinationDistanceKm || 0} km
                      </Text>
                      <Text style={styles.distanceLabel}>total</Text>
                    </View>
                  </View>
                </View>

                {/* Images Section */}
                <View style={styles.imagesSection}>
                  {/* Vehicle Image */}
                  <View style={styles.imageCard}>
                    <View style={styles.imageHeader}>
                      <Icon source="bus" size={14} color="#7f8c8d" />
                      <Text style={styles.imageTitle}>Vehicle Type</Text>
                    </View>
                    <View style={styles.imageContainer}>
                      {post.Vehicle_IMG ? (
                        <Image
                          source={{ uri: post.Vehicle_IMG }}
                          style={styles.postImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <Icon source="bus" size={32} color="#bdc3c7" />
                        </View>
                      )}
                    </View>
                    <View style={styles.imageDetails}>
                      <Text style={styles.vehicleTypeText}>
                        {post.VehicleType}
                      </Text>
                      <Text style={styles.vehicleDetailText}>
                        {post.BodyType || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  {/* Cargo Image */}
                  <View style={styles.imageCard}>
                    <View style={styles.imageHeader}>
                      <Icon source="cube" size={14} color="#7f8c8d" />
                      <Text style={styles.imageTitle}>Cargo Details</Text>
                    </View>
                    <View style={styles.imageContainer}>
                      {post.Cargopackag_IMG ? (
                        <Image
                          source={{ uri: post.Cargopackag_IMG }}
                          style={styles.postImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <Icon source="cube" size={32} color="#bdc3c7" />
                        </View>
                      )}
                    </View>
                    <View style={styles.imageDetails}>
                      <Text style={styles.cargoContentText}>
                        {post.CargoContent || 'N/A'}
                      </Text>
                      <Text style={styles.cargoDetailText}>
                        {post.ApproxWeight || 'N/A'} •{' '}
                        {post.CargoPackageType || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Additional Information */}
                <View style={styles.additionalInfo}>
                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Icon source="weight-hanging" size={12} color="#7f8c8d" />
                      <Text style={styles.infoLabel}>Weight:</Text>
                      <Text style={styles.infoValue}>
                        {post.ApproxWeight || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Icon source="resize" size={12} color="#7f8c8d" />
                      <Text style={styles.infoLabel}>Length:</Text>
                      <Text style={styles.infoValue}>
                        {post.DhalaLength || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Icon source="time-outline" size={12} color="#e74c3c" />
                      <Text style={styles.infoLabel}>Time Left:</Text>
                      <Text style={styles.timeValue}>
                        {post.RemainingTimeFormatted || 'N/A'}
                      </Text>
                    </View>
                    {post.Amount && post.Amount !== '0' && (
                      <View style={styles.infoItem}>
                        <Icon
                          source="money-bill-wave"
                          size={12}
                          color="#27ae60"
                        />
                        <Text style={styles.infoLabel}>Amount:</Text>
                        <Text style={styles.amountValue}>₹{post.Amount}</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtonContainer}>
                  <TouchableOpacity
                    style={styles.holdButton}
                    // onPress={() => handleHold(post)}
                  >
                    <Icon source="time-outline" size={16} color="#f39c12" />
                    <Text style={styles.holdButtonText}>Hold</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.acceptButtonEnhanced,
                      //   acceptedPosts.includes(post.LoadPostID) &&
                      //     styles.acceptedButton,
                    ]}
                    // onPress={() => handleAccept(post)}
                    // disabled={acceptedPosts.includes(post.LoadPostID)}
                  >
                    {/* {acceptedPosts.includes(post.LoadPostID) ? (
                      <>
                        <Icon
                          source="checkmark-done"
                          size={16}
                          color="#fff"
                        />
                        <Text style={styles.acceptButtonText}>Accepted</Text>
                      </>
                    ) : (
                      <>
                        <Icon
                          source="checkmark-circle"
                          size={16}
                          color="#fff"
                        />
                        <Text style={styles.acceptButtonText}>Accept</Text>
                      </>
                    )} */}
                  </TouchableOpacity>
                  x``
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
  // Load Item Styles
  loadItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  loadDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  acceptButtonLabel: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  // card design
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postIdContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  postIdText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
  },

  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceBadgeText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
  },
  locationSection: {
    marginBottom: 12,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    lineHeight: 18,
  },
  distanceContainer: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  distanceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
  distanceLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginTop: 2,
  },
  arrowDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  arrowLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  arrowIconContainer: {
    paddingHorizontal: 12,
  },
  imagesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 12,
  },
  imageCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  imageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    marginLeft: 6,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderStyle: 'dashed',
  },
  imageDetails: {
    alignItems: 'center',
  },
  vehicleTypeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
  },
  vehicleDetailText: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 2,
  },
  cargoContentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  cargoDetailText: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 2,
  },
  additionalInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 6,
    marginRight: 4,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
  },
  timeValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e74c3c',
  },
  amountValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#27ae60',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  holdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff8e6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ffe9a8',
  },
  holdButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f39c12',
    marginLeft: 6,
  },
  acceptButtonEnhanced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  acceptedButton: {
    backgroundColor: '#27ae60',
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 6,
  },
});
