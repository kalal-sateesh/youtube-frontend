import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const sidebar = useSelector((state) => state.navbar.sidebar);

  const profileUrlRegex =
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?$/i;

  const navigate = useNavigate();

  const handleNavigateToSignin = () => {
    navigate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrMsg("");
    setIsError(false);
    setIsSuccess(false);
    if (password !== cPassword) {
      setIsError(true);
      setErrMsg("password and conform password not match");
      setTimeout(() => {
        setIsError(false);
        setErrMsg("");
      }, 2000);
      return;
    }

    if (!profileUrlRegex.test(profileUrl)) {
      setIsError(true);
      setErrMsg(
        "Invalid profile URL. Must be a valid image URL (jpg, png, gif, etc.)"
      );
      setTimeout(() => {
        setIsError(false);
        setErrMsg("");
      }, 2000);
      return;
    }

    const reqObj = {
      email: email,
      password: password,
      username: name,
      avatar: profileUrl,
    };
    axios
      .post("http://localhost:5000/api/register", reqObj)
      .then((res) => {
        if (res.status === 201) {
          setIsError(false);
          setErrMsg("");
          setIsSuccess(true);
          setSuccessMsg("User Registered Successfully");
          setTimeout(() => {
            setIsSuccess(false);
            setSuccessMsg("");
            handleNavigateToSignin();
          }, 2000);
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsSuccess(false);
        setSuccessMsg("");
        if (err.response) {
          if (err.response.status === 400) {
            setErrMsg("User already exists. Please log in.");
          } else {
            setErrMsg("Something went wrong. Please try again later.");
          }
        } else {
          setErrMsg("Network error. Check your connection.");
        }
        setTimeout(() => {
          setIsError(false);
          setErrMsg("");
        }, 2000);
      });
  };

  return (
    <div
      className={`absolute top-[100px] ${
        sidebar
          ? `sm:w-[400px] w-[210px] left-[37%]`
          : `sm:w-[400px] w-[250px] sm:left-[33%] left-[22%]`
      } h-auto bg-[#FFFFFF] rounded-md p-6 flex flex-col gap-6 shadow-xl`}
    >
      <div className="sm:text-2xl text-sm font-bold">Create an account</div>
      <form action="" className="flex flex-col gap-6" onSubmit={handleRegister}>
        <div className="flex gap-2 flex-col">
          <label htmlFor="name" className="text-gray-700 font-semibold text-sm">
            Your name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name..."
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className="flex gap-2 flex-col">
          <label
            htmlFor="cPassword"
            className="text-gray-700 font-semibold text-sm"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="cPassword"
            placeholder="••••••••"
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-col">
          <label
            htmlFor="profile"
            className="text-gray-700 font-semibold text-sm"
          >
            Your profile URL
          </label>
          <input
            type="link"
            id="profile"
            placeholder="profile link..."
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setProfileUrl(e.target.value)}
          />
        </div>

        {isError && (
          <div className="sm:text-lg text-xs text-red-500">{errMsg}</div>
        )}

        {isSuccess && (
          <div className="sm:text-lg text-xs text-green-600">{successMsg}</div>
        )}

        <div className="mt-5">
          <button
            type="submit"
            className="bg-[#2563EB] text-white w-[100%] h-[50px] rounded-lg hover:bg-[#1A56DB]"
          >
            Create an account
          </button>
        </div>
      </form>
      <div className="text-gray-400 sm:text-sm text-xs">
        Already have an account?{" "}
        <span
          className="text-blue-600 hover:cursor-pointer hover:underline"
          onClick={handleNavigateToSignin}
        >
          Login here
        </span>
      </div>
    </div>
  );
};

export default Register;
