import { DriverDetails } from '@api/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  driverDetails: null | DriverDetails;
  isOnline: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  driverDetails: null,
  isOnline: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<DriverDetails>) {
      state.isLoggedIn = true;
      state.driverDetails = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.driverDetails = null;
      state.isOnline = false;
    },
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
  },
});

export const { loginSuccess, logout, setOnlineStatus } = authSlice.actions;
export default authSlice.reducer;
