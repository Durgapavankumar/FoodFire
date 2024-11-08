import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the reducer, not the entire slice

const appStore = configureStore({
  reducer: {
    // The key here is `reducer`, not `cart`
    cart: cartReducer, // Assign the cartReducer to the `cart` key in the state
  },
});

export default appStore;
