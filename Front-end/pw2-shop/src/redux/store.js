import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicer/userSlicer";
import carrinhoReducer from "./slicer/carrinhoSlicer";

export default configureStore({
  reducer: {
    user: userReducer,
    carrinho: carrinhoReducer,
  },
});
