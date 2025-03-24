import { createSlice } from "@reduxjs/toolkit";
const storedData =
  localStorage.getItem("userData") != null
    ? [JSON.parse(localStorage.getItem("userData"))]
    : [];
const initialState = {
  sidebar: true,
  isLoggedIn: localStorage.getItem("token") != null ? true : false,
  isError: false,
  errorMsg: "",
  userData: storedData,
};

export const HeaderSlice = createSlice({
  name: "navbartoggle",
  initialState,
  reducers: {
    togglenavbar: (state) => {
      state.sidebar = !state.sidebar;
    },
    setLoggedInStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMsg = action.payload;
    },
    setErrorStatus: (state, action) => {
      state.isError = action.payload;
    },
    getuserData: (state, action) => {
      state.userData = [action.payload];
    },
    removeuserData: (state) => {
      state.userData = [];
    },
  },
});

export const {
  togglenavbar,
  setLoggedInStatus,
  setErrorMessage,
  setErrorStatus,
  getuserData,
  removeuserData,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;
