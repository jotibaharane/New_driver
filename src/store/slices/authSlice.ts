import { DriverDetails } from '@api/rest/auth/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TRIP_STATUS {
  Inactive = 'Inactive',
  Progress = 'Progress',
  Pending = 'Pending',
  Accept = 'Accepted',
  Reached = 'Reached',
  Loading = 'Loading',
  Loaded = 'Loaded',
}

interface AuthState {
  driverDetails: null | DriverDetails;
  isOnline: boolean;
  isLoggedIn: boolean;
  tripStatus: TRIP_STATUS;
}

const initialState: AuthState = {
  isLoggedIn: false,
  driverDetails: null,
  isOnline: false,
  tripStatus: TRIP_STATUS.Inactive,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<DriverDetails>) {
      state.isLoggedIn = true;
      state.driverDetails = action.payload;
      state.tripStatus = action.payload.Driver_LPStatus as any;
      state.isOnline = action.payload.Status === 'Online';
    },
    logout(state) {
      state.isLoggedIn = false;
      state.driverDetails = null;
      state.isOnline = false;
      state.tripStatus = TRIP_STATUS.Inactive;
    },
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    setTripStatus(state, action: PayloadAction<TRIP_STATUS>) {
      state.tripStatus = action.payload;
    },
  },
});

export const { loginSuccess, logout, setOnlineStatus, setTripStatus } =
  authSlice.actions;
export default authSlice.reducer;
