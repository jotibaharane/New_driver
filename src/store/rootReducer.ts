// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import api from '../api/hooks_api';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import mapReducer from './slices/mapSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  map: mapReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
