import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicer/userSlicer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
