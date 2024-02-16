import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigure = {
  key: "wpheadless",
  storage,
};

const persistAuthReducer = persistReducer(persistConfigure, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
  },
});

export const peristedStore = persistStore(store);
