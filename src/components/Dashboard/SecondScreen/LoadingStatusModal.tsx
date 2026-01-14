import React, { FC, useState } from 'react';
import {
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

import { postLoadingStatusPhotos } from '@api/index';
import { RootState } from '@store/index';
import { setTripStatus, TRIP_STATUS } from '@store/slices/authSlice';
import {
  LoadingPhotoKey,
  resetLoadingPhotos,
  setLoadingPhoto,
  togglePhotoLock,
} from '@store/slices/loadingPhotosSlice';
import { compressImageTo5KB } from '@utils/img/image.compress';

/* ---------------- CONFIG ---------------- */

const PHOTO_GROUPS: { key: LoadingPhotoKey; title: string }[] = [
  { key: 'truckFrontView', title: 'Truck Front View Photo' },
  { key: 'emptyDhala', title: 'Empty Dhala Photo' },
  { key: 'goodsLoadingStart', title: 'Goods Loading (Start)' },
  { key: 'goodsLoadingHalf', title: 'Goods Loading (Half)' },
  { key: 'goodsLoadingComplete', title: 'Goods Loading (Complete)' },
  { key: 'loadedCovered', title: 'Loaded & Covered Vehicle' },
];

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

/* ---------------- COMPONENT ---------------- */

const LoadingStatusModal: FC<Props> = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((s: RootState) => s.driverLp);
  const photos = useSelector((s: RootState) => s.loadingPhotos);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const takenCount = PHOTO_GROUPS.filter(p => !!photos[p.key]).length;
  const allTaken = takenCount === PHOTO_GROUPS.length;

  /* 📸 Open camera */
  const openCamera = (key: LoadingPhotoKey) => {
    if (photos?.locks?.[key]) {
      Toast.show({ type: 'info', text1: 'Photo is already saved' });
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 1,
        saveToPhotos: false,
      },
      async res => {
        if (!res.didCancel && res.assets?.[0]) {
          const compressed = await compressImageTo5KB(res.assets[0]);
          if (compressed.base64) {
            dispatch(setLoadingPhoto({ key, value: compressed.base64 }));
          }
        }
      },
    );
  };

  /* 🚀 Submit */
  const handleSubmit = async () => {
    try {
      const res = await postLoadingStatusPhotos({
        CustomerPostID: active?.CustomerPostID || '',
        DriverID: active?.DriverID || '',
        CustomerID: active?.CustomerID || '',
        DriverStatus: 'Loaded',
        truckFrontView: photos.truckFrontView || '',
        emptyDhala: photos.emptyDhala || '',
        goodsLoadingStart: photos.goodsLoadingStart || '',
        goodsLoadingHalf: photos.goodsLoadingHalf || '',
        goodsLoadingComplete: photos.goodsLoadingComplete || '',
        loadedCovered: photos.loadedCovered || '',
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

  /* ---------------- UI ---------------- */

  return (
    <>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Loading Status Photos</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Icon source="close" size={24} />
              </TouchableOpacity>
            </View>

            {/* PROGRESS */}
            <Text style={styles.progress}>
              {takenCount}/{PHOTO_GROUPS.length} Photos Captured
            </Text>

            {/* LIST */}
            <ScrollView>
              {PHOTO_GROUPS.map(item => {
                const locked = Boolean(photos?.locks?.[item.key]);

                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[styles.card, locked && styles.cardLocked]}
                    onPress={() => openCamera(item.key)}
                  >
                    {photos[item.key] ? (
                      <TouchableOpacity
                        onPress={() =>
                          setPreviewImage(photos[item.key] as string)
                        }
                      >
                        <Image
                          source={{ uri: photos[item.key] as string }}
                          style={styles.thumbnail}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.placeholder}>
                        <Icon source="camera" size={26} />
                      </View>
                    )}

                    <Text style={styles.cardText}>{item.title}</Text>

                    {photos[item.key] && (
                      <TouchableOpacity
                        onPress={() => dispatch(togglePhotoLock(item.key))}
                        style={[
                          styles.saveBtn,
                          !locked && styles.saveBtnActive,
                          locked && styles.saveBtnLocked,
                        ]}
                      >
                        <Icon
                          source={locked ? 'check-circle' : 'content-save'}
                          size={22}
                          color={locked ? '#16A34A' : '#FFFFFF'}
                        />
                        {!locked && <Text style={styles.saveText}>SAVE</Text>}
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              })}
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

      {/* 🔍 IMAGE PREVIEW */}
      <Modal visible={!!previewImage} transparent animationType="fade">
        <View style={styles.previewOverlay}>
          <TouchableOpacity
            style={styles.previewClose}
            onPress={() => setPreviewImage(null)}
          >
            <Icon source="close-circle" size={36} color="#FFF" />
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.previewContainer}
            maximumZoomScale={3}
            minimumZoomScale={1}
          >
            {previewImage && (
              <Image
                source={{ uri: previewImage }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default LoadingStatusModal;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  progress: {
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: '600',
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
  cardLocked: { opacity: 0.6 },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
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
  },

  /* SAVE BUTTON */
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  saveBtnActive: {
    backgroundColor: '#2563EB',
    elevation: 4,
  },
  saveBtnLocked: {
    backgroundColor: '#DCFCE7',
  },
  saveText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },

  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#2563EB',
  },
  submitDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  /* PREVIEW */
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  previewClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
