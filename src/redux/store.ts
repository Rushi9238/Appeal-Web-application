import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/authSlice';
import appealTableReducer from './slices/appealTableSlice';
import tableReducer from './slices/tableSlice';
import calendarReducer from "./slices/calenderSlice";

// Resolve redux-persist failed to create sync storage. falling back to noop storage.
const createNoopStorage = () => {
    return {
      getItem(_key: string) {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: string) {
        return Promise.resolve();
      },
    };
  };

  const storageSystem = typeof window !== 'undefined' 
  ? storage
  : createNoopStorage();

const persistConfig = {
    key: 'root',
    version: 1,
    storage:storageSystem,
    whitelist: ['auth'], // Only persist auth state
  };

  const rootReducer = combineReducers({
    auth: authReducer,
    table: appealTableReducer,
    tableData: tableReducer,
    calendar: calendarReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;