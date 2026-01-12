// store/slices/loadingPhotosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoadingPhotoKey =
  | 'truckFrontView'
  | 'emptyDhala'
  | 'goodsLoadingStart'
  | 'goodsLoadingHalf'
  | 'goodsLoadingComplete'
  | 'loadedCovered';

export interface LoadingPhotosState {
  truckFrontView: string | null;
  emptyDhala: string | null;
  goodsLoadingStart: string | null;
  goodsLoadingHalf: string | null;
  goodsLoadingComplete: string | null;
  loadedCovered: string | null;
  locks?: Record<LoadingPhotoKey, boolean>; // 👈 optional on purpose
}

const defaultLocks: Record<LoadingPhotoKey, boolean> = {
  truckFrontView: false,
  emptyDhala: false,
  goodsLoadingStart: false,
  goodsLoadingHalf: false,
  goodsLoadingComplete: false,
  loadedCovered: false,
};

const initialState: LoadingPhotosState = {
  truckFrontView: null,
  emptyDhala: null,
  goodsLoadingStart: null,
  goodsLoadingHalf: null,
  goodsLoadingComplete: null,
  loadedCovered: null,
  locks: defaultLocks,
};

const loadingPhotosSlice = createSlice({
  name: 'loadingPhotos',
  initialState,
  reducers: {
    setLoadingPhoto(
      state,
      action: PayloadAction<{ key: LoadingPhotoKey; value: string }>,
    ) {
      state[action.payload.key] = action.payload.value;
    },

    togglePhotoLock(state, action: PayloadAction<LoadingPhotoKey>) {
      // 🛡️ Self-healing reducer
      if (!state.locks) {
        state.locks = { ...defaultLocks };
      }

      state.locks[action.payload] = !state.locks[action.payload];
    },

    resetLoadingPhotos() {
      return initialState; // ✅ includes locks
    },
  },
});

export const { setLoadingPhoto, togglePhotoLock, resetLoadingPhotos } =
  loadingPhotosSlice.actions;

export default loadingPhotosSlice.reducer;
