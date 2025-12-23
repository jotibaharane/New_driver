// store/slices/loadingPhotosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingPhotosState {
  [key: string]: string | null;
}

const initialState: LoadingPhotosState = {
  truckFrontView: null,
  emptyDhala: null,
  goodsLoadingStart: null,
  goodsLoadingHalf: null,
  goodsLoadingComplete: null,
  loadedCovered: null,
};

const loadingPhotosSlice = createSlice({
  name: 'loadingPhotos',
  initialState,
  reducers: {
    setLoadingPhoto(
      state,
      action: PayloadAction<{ key: string; value: string }>,
    ) {
      state[action.payload.key] = action.payload.value;
    },
    resetLoadingPhotos() {
      return initialState;
    },
  },
});

export const { setLoadingPhoto, resetLoadingPhotos } =
  loadingPhotosSlice.actions;

export default loadingPhotosSlice.reducer;
