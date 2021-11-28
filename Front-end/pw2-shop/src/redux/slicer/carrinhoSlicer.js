import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  produtos: [],
  quantidade: 0,
  logado: false,
};

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      return {
        ...state,
        produtos: [...state.produtos, action.payload],
        quantidade: state.quantidade + 1,
      };
    },
    deleteItem: (state, action) => {
      const carrinhoF = state.produtos.filter((i) => i.id !== action.payload);
      return {
        ...state,
        produtos: carrinhoF,
      };
    },
    clearCarrinho: (state) => initialState,
  },
});

export const { addItem, deleteItem, clearCarrinho } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
