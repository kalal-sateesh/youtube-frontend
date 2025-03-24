import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getuserData,
  setErrorMessage,
  setErrorStatus,
  setLoggedInStatus,
} from "./HeaderSlice";
import { API_BASE_URL } from "../contants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const sidebar = useSelector((state) => state.navbar.sidebar);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateToSignup = () => {
    navigate("/register");
  };
  const handleNavigateToHome = () => {
    navigate("/");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrMsg("");
    setIsError(false);
    const reqObj = {
      email: email,
      password: password,
    };
    axios
      .post(`${API_BASE_URL}/api/login`, reqObj)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("username", res.data.data.username);
          localStorage.setItem("userId", res.data.data._id);
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          dispatch(getuserData(res.data.data));
          if (res.data.accessToken) {
            dispatch(setLoggedInStatus(true));
            dispatch(setErrorStatus(false));
            handleNavigateToHome();
          }
        } else {
          dispatch(setErrorMessage("Login failed. Please try again."));
          dispatch(setErrorStatus(true));
        }
      })
      .catch((err) => {
        dispatch(setLoggedInStatus(false));
        setIsError(true);
        if (err.response) {
          if (err.response.status === 404) {
            setErrMsg("User not found");
          } else if (err.response.status === 403) {
            setErrMsg("Invalid credentials. Please try again.");
          } else {
            setErrMsg("Something went wrong. Please try again later.");
          }
        } else {
          setErrMsg("Network error. Check your connection.");
        }
      });
    setTimeout(() => {
      setIsError(false);
      setErrMsg("");
    }, 2000);
  };

  return (
    <div
      className={`absolute top-[100px] ${
        sidebar
          ? `sm:w-[400px] w-[210px] left-[37%]`
          : `sm:w-[400px] w-[250px] sm:left-[33%] left-[22%]`
      } h-auto bg-[#FFFFFF] rounded-md p-6 flex flex-col gap-6 shadow-xl`}
    >
      <div className="sm:text-2xl text-sm font-bold">
        Signin to your account
      </div>

      {isError && (
        <div className="sm:text-lg text-sm text-red-500">{errMsg}</div>
      )}

      <form action="" className="flex flex-col gap-6" onSubmit={handleSignIn}>
        <div className="flex gap-2 flex-col">
          <label
            htmlFor="email"
            className="text-gray-700 font-semibold text-sm"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@company.com"
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label
            htmlFor="password"
            className="text-gray-700 font-semibold text-sm"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="bg-[#2563EB] text-white w-[100%] h-[50px] rounded-lg hover:bg-[#1A56DB]"
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="text-gray-400 sm:text-sm text-xs">
        Don’t have an account yet?{" "}
        <span
          className="text-blue-600 hover:cursor-pointer hover:underline"
          onClick={handleNavigateToSignup}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};

export default Login;
