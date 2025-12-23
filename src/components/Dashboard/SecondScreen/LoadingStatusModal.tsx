import { postLoadingStatusPhotos } from '@api/index';
import { RootState } from '@store/index';
import { setTripStatus, TRIP_STATUS } from '@store/slices/authSlice';
import {
  resetLoadingPhotos,
  setLoadingPhoto,
} from '@store/slices/loadingPhotosSlice';
import { compressImageToMax30KB } from '@utils/img/image.compress';
import React, { FC } from 'react';
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
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

const PHOTO_GROUPS = [
  { key: 'truckFrontView', title: 'Truck Front View Photo' },
  { key: 'emptyDhala', title: 'Empty Dhala Photo' },
  { key: 'goodsLoadingStart', title: 'Goods Loading (Start)' },
  { key: 'goodsLoadingHalf', title: 'Goods Loading (Half)' },
  { key: 'goodsLoadingComplete', title: 'Goods Loading (Complete)' },
  { key: 'loadedCovered', title: 'Loaded & Covered Vehicle' },
] as const;

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const LoadingStatusModal: FC<Props> = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((s: RootState) => s.driverLp);
  const groupPhotos = useSelector((s: RootState) => s.loadingPhotos);
  console.log({ active });
  const takenCount = Object.values(groupPhotos).filter(Boolean).length;
  const allTaken = takenCount === PHOTO_GROUPS.length;

  const openCamera = (key: keyof typeof groupPhotos) => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        includeBase64: false,
        quality: 1,
        saveToPhotos: false,
      },
      async res => {
        if (!res.didCancel && !res.errorCode && res.assets?.[0]) {
          const compressedResult = await compressImageToMax30KB(res.assets[0]);
          console.log({ compressedResult });
          if (compressedResult.base64) {
            dispatch(
              setLoadingPhoto({
                key: key as any,
                value: compressedResult.base64!,
              }),
            );
          }
        }
      },
    );
  };

  const handleSubmit = async () => {
    if (!allTaken) {
      Alert.alert('Incomplete', 'Please capture all photos');
      return;
    }

    try {
      const res = await postLoadingStatusPhotos({
        CustomerPostID: active?.CustomerPostID || '',
        DriverID: active?.DriverID || '',
        CustomerID: active?.CustomerID || '',
        truckFrontView: groupPhotos.truckFrontView || '',
        emptyDhala: groupPhotos.emptyDhala || '',
        goodsLoadingStart: groupPhotos.goodsLoadingStart || '',
        goodsLoadingHalf: groupPhotos.goodsLoadingHalf || '',
        goodsLoadingComplete: groupPhotos.goodsLoadingComplete || '',
        loadedCovered: groupPhotos.loadedCovered || '',
      });

      if (res?.status === '00') {
        dispatch(setTripStatus(TRIP_STATUS.Loaded));
        dispatch(resetLoadingPhotos());
        setVisible(false);
      } else {
        Toast.show({ type: 'error', text1: res?.message });
      }
    } catch {
      Toast.show({ type: 'error', text1: 'Upload failed' });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Loading Status Photos</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon source="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* PROGRESS */}
          <Text style={styles.progress}>
            {takenCount}/{PHOTO_GROUPS.length} Photos Captured
          </Text>

          {/* LIST */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {PHOTO_GROUPS.map(item => (
              <TouchableOpacity
                key={item.key}
                style={styles.card}
                onPress={() => openCamera(item.key as keyof typeof groupPhotos)}
              >
                {groupPhotos[item.key] ? (
                  <Image
                    source={{ uri: groupPhotos[item.key]! }}
                    style={styles.thumbnail}
                  />
                ) : (
                  <View style={styles.placeholder}>
                    <Icon source="camera" size={28} color="#9CA3AF" />
                  </View>
                )}

                <Text style={styles.cardText}>{item.title}</Text>

                <Icon source="chevron-right" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* SUBMIT */}
          <TouchableOpacity
            disabled={!allTaken}
            style={[styles.submitBtn, !allTaken && styles.submitDisabled]}
            onPress={handleSubmit}
          >
            <Icon source="check-circle" size={22} color="#FFF" />
            <Text style={styles.submitText}>Confirm & Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingStatusModal;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  progress: {
    textAlign: 'center',
    marginVertical: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 14,
  },
  cardText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#2563EB',
  },
  submitDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
