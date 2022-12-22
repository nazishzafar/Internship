import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../redux/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});
