import React, { FC, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Icon } from 'react-native-paper';

const PHOTO_GROUPS = [
  {
    key: 'truckFrontView',
    title: 'Truck Front View Photo',
    subtitle: 'Take truck front view photo',
    required: true,
  },
  {
    key: 'emptyDhala',
    title: 'Empty Dhala Photo',
    subtitle: 'Take empty truck photo',
    required: true,
  },
  {
    key: 'goodsLoadingStart',
    title: 'Goods Loading Photo (Starting)',
    subtitle: 'Take starting loading photo',
    required: true,
  },
  {
    key: 'goodsLoadingHalf',
    title: 'Goods Loading Photo (Half Loading)',
    subtitle: 'Take half loading photo',
    required: true,
  },
  {
    key: 'goodsLoadingComplete',
    title: 'Goods Loading Photo (Complete Loading)',
    subtitle: 'Take complete loading photo',
    required: true,
  },
  {
    key: 'loadedCovered',
    title: 'Loaded & Covered Vehicle Photo',
    subtitle: 'Take loaded & covered truck photo',
    required: true,
  },
];

interface GroupPhoto {
  [key: string]: string | null;
}

interface LoadingStatusModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const LoadingStatusModal: FC<LoadingStatusModalProps> = ({
  visible,
  setVisible,
}) => {
  const [groupPhotos, setGroupPhotos] = useState<GroupPhoto>({
    truckFrontView: null,
    emptyDhala: null,
    goodsLoadingStart: null,
    goodsLoadingHalf: null,
    goodsLoadingComplete: null,
    loadedCovered: null,
  });

  const takenCount = Object.values(groupPhotos).filter(Boolean).length;
  const allRequiredTaken = takenCount === PHOTO_GROUPS.length;

  const openCameraForGroup = (groupKey: string) => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        quality: 0.8,
        maxWidth: 1200,
        maxHeight: 1200,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert('Camera Error', response.errorMessage || 'Unknown error');
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setGroupPhotos(prev => ({
            ...prev,
            [groupKey]: uri,
          }));
        }
      },
    );
  };

  const handleConfirmAllPhotos = () => {
    if (!allRequiredTaken) {
      Alert.alert(
        'Incomplete',
        'Please take all required photos before confirming.',
      );
      return;
    }

    console.log('📸 All Photos:', groupPhotos);

    setVisible(false);
    Alert.alert(
      'Success',
      'All loading photos submitted successfully. You can start the trip.',
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.statusModal}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Loading Status Photos</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon source="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.statusContent}>
            {/* Instruction */}
            <View style={styles.instructionContainer}>
              <Icon source="camera" size={24} color="#3B82F6" />
              <Text style={styles.statusInstruction}>
                Please capture all 6 photos of the loading process.
              </Text>
            </View>

            {/* Progress */}
            <Text style={styles.progressText}>
              Progress: {takenCount} / {PHOTO_GROUPS.length}
            </Text>

            {/* Photo Groups */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {PHOTO_GROUPS.map(group => (
                <TouchableOpacity
                  key={group.key}
                  style={styles.photoGroupItem}
                  onPress={() => openCameraForGroup(group.key)}
                >
                  <View style={styles.photoGroupLeft}>
                    {groupPhotos[group.key] ? (
                      <Image
                        source={{ uri: groupPhotos[group.key]! }}
                        style={styles.groupThumbnail}
                      />
                    ) : (
                      <View style={styles.placeholderThumbnail}>
                        <Icon source="camera" size={30} color="#9CA3AF" />
                      </View>
                    )}

                    <View style={styles.groupText}>
                      <Text style={styles.groupTitle}>{group.title}</Text>
                      <Text style={styles.groupSubtitle}>{group.subtitle}</Text>
                    </View>
                  </View>

                  <Icon source="chevron-right" size={24} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Confirm Button */}
            <TouchableOpacity
              style={[
                styles.confirmAllButton,
                allRequiredTaken
                  ? styles.confirmAllButtonActive
                  : styles.confirmAllButtonDisabled,
              ]}
              onPress={handleConfirmAllPhotos}
              disabled={!allRequiredTaken}
            >
              <Icon source="check-circle" size={24} color="#FFF" />
              <Text style={styles.confirmAllButtonText}>
                Confirm All Photos ({takenCount}/{PHOTO_GROUPS.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingStatusModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  statusModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
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
  statusContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  instructionIcon: {
    marginRight: 12,
  },
  instructionTextContainer: {
    flex: 1,
  },
  statusInstruction: {
    fontSize: 16,
    color: '#0C4A6E',
    fontWeight: '600',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginVertical: 16,
  },
  photoGroupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  photoGroupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  placeholderThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  groupText: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  groupSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  confirmAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  confirmAllButtonActive: {
    backgroundColor: '#3B82F6',
  },
  confirmAllButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  confirmAllButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
