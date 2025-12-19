// index.ts
import api from '@api/rtk/location.api';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import persistConfig from './persistConfig';
import rootReducer from './rootReducer';

const persistedReducer = persistReducer<any>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
