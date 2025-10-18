import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import candidateReducer from "./candidateSlice";
import uiReducer from "./uiSlice";
import chatReducer from "./chatSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["candidate","auth"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  candidate: candidateReducer,
  chat: chatReducer,
  ui: uiReducer, 
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
