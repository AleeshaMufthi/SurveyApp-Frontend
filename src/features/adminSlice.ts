import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    admin: { email: string } | null;
  }
  
  const initialState: AdminState = { admin: null };
  
  const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      setAdmin: (state, action: PayloadAction<{ email: string }>) => {
        state.admin = action.payload;
      },
      logoutAdmin: (state) => {
        state.admin = null;
      },
    },
  });
  
  export const { setAdmin, logoutAdmin } = adminSlice.actions;
  export default adminSlice.reducer;