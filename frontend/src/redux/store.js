import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage: localStorage

// Configuration for persisting the store
const persistConfig = {
    key: 'root',       // Key to be used in storage
    version: 1,        // Versioning for state migrations
    storage,           // The storage engine (localStorage in this case)
};

// Import your slices
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice"
import applicationsSlice from "./applicationsSlice"


// Combine your slices into one root reducer
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company:companySlice,
    application:applicationsSlice
});

// Persist the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export default store;
