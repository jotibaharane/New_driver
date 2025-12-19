import { DriverDetails } from '@api/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  driverDetails: null | DriverDetails;
  isOnline: boolean;
  isLoggedIn: boolean;
  tripStatus: 'Inactive' | 'Process' | 'Pending';
}

const initialState: AuthState = {
  isLoggedIn: false,
  driverDetails: null,
  isOnline: false,
  tripStatus: 'Inactive',
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
    },
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    setTripStatus(
      state,
      action: PayloadAction<'Inactive' | 'Process' | 'Pending'>,
    ) {
      state.tripStatus = action.payload;
    },
  },
});

export const { loginSuccess, logout, setOnlineStatus, setTripStatus } =
  authSlice.actions;
export default authSlice.reducer;
