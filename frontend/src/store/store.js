import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js";
import favouriteReducer from "./slices/favouriteSlice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer,
  },
});

export default store;
