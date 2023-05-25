import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";

const combinedReducer = combineReducers({
  products: productsReducer,
});

const rootReducer = (state, action) => combinedReducer(state, action);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
