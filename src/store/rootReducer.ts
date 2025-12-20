// rootReducer.ts
import api from '@api/rtk/location.api';
import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import driverLpReducer from './slices/driverLp.slice';
import mapReducer from './slices/mapSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  map: mapReducer,
  driverLp: driverLpReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
