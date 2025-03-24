import { configureStore } from "@reduxjs/toolkit";
import navbartoggle from "../components/HeaderSlice";
import loginStatus from "../components/HeaderSlice";
import errorMessage from "../components/HeaderSlice";
import errorStatus from "../components/HeaderSlice";
import userData from "../components/HeaderSlice";

export const store = configureStore({
  reducer: {
    navbar: navbartoggle,
    login: loginStatus,
    errorMsg: errorMessage,
    errorStatus: errorStatus,
    userData: userData,
  },
});
