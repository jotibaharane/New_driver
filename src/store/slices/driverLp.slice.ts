import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AcceptedLoadPostDetails, DriverLoadPost } from './driverLp.types';

interface DriverLpState {
  list: DriverLoadPost[];
  active: AcceptedLoadPostDetails | null;
  loading: boolean;
}

const initialState: DriverLpState = {
  list: [],
  active: null,
  loading: false,
};

const driverLpSlice = createSlice({
  name: 'driverLp',
  initialState,
  reducers: {
    setDriverLpList(state, action: PayloadAction<DriverLoadPost[]>) {
      state.list = action.payload;
    },

    setActiveDriverLp(
      state,
      action: PayloadAction<AcceptedLoadPostDetails | null>,
    ) {
      state.active = action.payload;
    },

    updateDriverLocation(
      state,
      action: PayloadAction<{ lat: number; lng: number; lastUpdate?: string }>,
    ) {
      if (state.active) {
        state.active.DriverLat = action.payload.lat;
        state.active.DriverLng = action.payload.lng;
        // if (action.payload.lastUpdate) {
        //   state.active.DriverLastUpdate = action.payload.lastUpdate;
        // }
      }
    },

    updateDriverStatus(
      state,
      action: PayloadAction<{
        DriverStatus?: string;
        DriverAvailabilityStatus?: string;
        DriverVehicleStatus?: string;
      }>,
    ) {
      if (state.active) {
        Object.assign(state.active, action.payload);
      }
    },

    clearDriverLp(state) {
      state.list = [];
      state.active = null;
    },
  },
});

export const {
  setDriverLpList,
  setActiveDriverLp,
  updateDriverLocation,
  updateDriverStatus,
  clearDriverLp,
} = driverLpSlice.actions;

export default driverLpSlice.reducer;
