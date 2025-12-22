import { DriverLoadPost } from '@store/slices/driverLp.types';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { formatDistance } from './helper';

interface CustomerLoadCardProps {
  item: DriverLoadPost;
  handleAccept: any;
  handleHold: any;
}

const CustomerLoadCard: FC<CustomerLoadCardProps> = ({
  item,
  handleAccept,
  handleHold,
}) => {
  return (
    <View style={styles.postCard}>
      {/* Header with Post ID */}
      <View style={styles.cardHeader}>
        <View style={styles.postIdContainer}>
          <Text style={styles.postIdText}>
            LOAD #{item.Customer_LoadPostID}
          </Text>
        </View>
        <View style={styles.distanceBadge}>
          <Icon source="map-marker-distance" size={12} color="#fff" />
          <Text style={styles.distanceBadgeText}>
            {formatDistance(item.PickupDistanceKm)}
          </Text>
        </View>
      </View>

      {/* Pickup Section */}
      <View style={styles.locationSection}>
        <View style={styles.locationHeader}>
          <View style={styles.locationIconContainer}>
            <Icon source="map-marker" size={16} color="#2ecc71" />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Pickup Location</Text>
            <Text style={styles.locationAddress} numberOfLines={2}>
              {item.PickupLocation || 'Unknown origin'}
            </Text>
          </View>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceValue}>
              {item.PickupDistanceKm || 0} km
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
            <Icon source="flag-checkered" size={16} color="#e74c3c" />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Delivery Location</Text>
            <Text style={styles.locationAddress} numberOfLines={2}>
              {item.DestinationLocation || 'Unknown destination'}
            </Text>
          </View>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceValue}>
              {item.DestinationDistanceKm || 0} km
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
            <Icon source="truck" size={14} color="#7f8c8d" />
            <Text style={styles.imageTitle}>Vehicle Type</Text>
          </View>
          <View style={styles.imageContainer}>
            {item.Vehicle_IMG ? (
              <Image
                source={{ uri: item.Vehicle_IMG }}
                style={styles.postImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon source="truck" size={32} color="#bdc3c7" />
              </View>
            )}
          </View>
          <View style={styles.imageDetails}>
            <Text style={styles.vehicleTypeText}>{item.VehicleType}</Text>
            <Text style={styles.vehicleDetailText}>
              {item.BodyType || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Cargo Image */}
        <View style={styles.imageCard}>
          <View style={styles.imageHeader}>
            <Icon source="package-variant" size={14} color="#7f8c8d" />
            <Text style={styles.imageTitle}>Cargo Details</Text>
          </View>
          <View style={styles.imageContainer}>
            {item.Cargopackag_IMG ? (
              <Image
                source={{ uri: item.Cargopackag_IMG }}
                style={styles.postImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon source="package-variant" size={32} color="#bdc3c7" />
              </View>
            )}
          </View>
          <View style={styles.imageDetails}>
            <Text style={styles.cargoContentText}>
              {item.CargoContent || 'N/A'}
            </Text>
            <Text style={styles.cargoDetailText}>
              {item.ApproxWeight || 'N/A'} • {item.CargoPackageType || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon source="weight" size={12} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>{item.ApproxWeight || 'N/A'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon source="ruler" size={12} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Length:</Text>
            <Text style={styles.infoValue}>{'N/A'}</Text>
            {/* item.DhalaLength ||  */}
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon source="clock-outline" size={12} color="#e74c3c" />
            <Text style={styles.infoLabel}>Time Left:</Text>
            <Text style={styles.timeValue}>
              {item.RemainingTimeFormatted || 'N/A'}
            </Text>
          </View>
          {/* {item.Amount && item.Amount !== '0' && (
            <View style={styles.infoItem}>
              <Icon source="cash" size={12} color="#27ae60" />
              <Text style={styles.infoLabel}>Amount:</Text>
              <Text style={styles.amountValue}>₹{item.Amount}</Text>
            </View>
          )} */}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.holdButton}
          onPress={() => handleHold(item)}
        >
          <Icon source="clock-outline" size={16} color="#f39c12" />
          <Text style={styles.holdButtonText}>Hold</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.acceptButtonEnhanced]}
          onPress={() => handleAccept(item)}
        >
          <Icon source="check-circle" size={16} color="#fff" />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerLoadCard;

const styles = StyleSheet.create({
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
