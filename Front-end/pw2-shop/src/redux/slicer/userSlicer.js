import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  nome: "",
  logado: false,
  tipo: "visitante",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      return {
        email: action.payload.email,
        nome: action.payload.nome,
        logado: true,
        tipo: action.payload.tipoUsuarioId === 2 ? "cliente" : "colaborador",
      };
    },
    logout: (state) => initialState,
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
