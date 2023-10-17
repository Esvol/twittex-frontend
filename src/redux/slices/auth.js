import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk("/user/fetchUserStatus", async (params) => {
    const { data } = await axios.post("/login", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("/me/fetchAuthMeStatus", async () => {
    const { data } = await axios.get("/me");
    return data;
  }
);

export const fetchRegister = createAsyncThunk('/register/fetchRegisterStatus', async (params) => {
    const { data } = await axios.post('/register', params)
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [fetchUserData.rejected]: (state) => {
      state.data = null;
      state.status = "failed";
    },

    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "failed";
    },

    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "failed";
  },
}
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
