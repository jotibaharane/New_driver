// src/store/slices/mapSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Coordinate {
  latitude: number;
  longitude: number;
  rotation: number;
}

interface MapState {
  driverLocation: Coordinate | null;
  pickupLocation: Coordinate | null;
  destinationLocation: Coordinate | null;
  liveDriverLocation: Coordinate | null;
  routePath: Coordinate[];
  customerLocations: Coordinate[];
  map_state: 'nearby' | 'active';
}

const initialState: MapState = {
  driverLocation: null,
  pickupLocation: null,
  destinationLocation: null,
  liveDriverLocation: null,
  customerLocations: [],
  routePath: [],
  map_state: 'nearby',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setdriverLocation(state, action: PayloadAction<Coordinate>) {
      state.driverLocation = action.payload;
    },
    setCustomerLocations(state, action: PayloadAction<Coordinate[]>) {
      state.customerLocations = action.payload;
    },
    setPickupLocation(state, action: PayloadAction<Coordinate>) {
      state.pickupLocation = action.payload;
    },
    setDestinationLocation(state, action: PayloadAction<Coordinate>) {
      state.destinationLocation = action.payload;
    },
    setRoutePath(state, action: PayloadAction<Coordinate[]>) {
      state.routePath = action.payload;
    },
    clearMapData(state) {
      state = initialState;
    },
  },
});

export const {
  setdriverLocation,
  setCustomerLocations,
  setPickupLocation,
  setDestinationLocation,
  setRoutePath,
  clearMapData,
} = mapSlice.actions;

export default mapSlice.reducer;
