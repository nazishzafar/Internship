import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../pages/product/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
