import { configureStore } from "@reduxjs/toolkit";
import allApi from "./rtk/all-requests";
import authReducer from "../redux/authSlice.js";

export const store = configureStore({
  reducer: {
    [allApi.reducerPath]: allApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allApi.middleware),
});

export default store;
