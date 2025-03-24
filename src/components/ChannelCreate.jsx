import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import profileIcon from "../assets/Images/profile-icon.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { getuserData } from "./HeaderSlice";

const ChannelCreate = () => {
  const [channelName, setChannelName] = useState("");
  const [owner, setOwner] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [userId, setUserId] = useState(null);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const userData = useSelector((state) => state.userData.userData);
  const loginStatus = useSelector((state) => state.login.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const channelBannerUrlRegex =
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?$/i;

  const handleNavigateToHome = () => {
    navigate("/");
  };

  const navigateToChannel = () => {
    navigate(`/user/${userId}`);
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setIsError(false);
    setIsSuccess(false);

    if (!channelBannerUrlRegex.test(channelBanner)) {
      setIsError(true);
      setErrMsg(
        "Invalid channelBanner URL. Must be a valid image URL (jpg, png, gif, etc.)"
      );
      setTimeout(() => {
        setIsError(false);
        setErrMsg("");
      }, 2000);
      return;
    }

    const reqObj = {
      channelName,
      owner,
      channelBanner,
      description,
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/${id}/channel`,
        reqObj
      );

      if (res.data) {
        setIsSuccess(true);
        setSuccessMsg("Channel Created successfully");
        const updatedUserData = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        dispatch(getuserData(updatedUserData.data));
        localStorage.setItem("userData", JSON.stringify(updatedUserData.data));
        setTimeout(() => {
          navigateToChannel();
        }, 2000);
      }
    } catch (err) {
      setIsError(true);
      setIsSuccess(false);
      if (err.response) {
        if (err.response.status === 404) {
          setErrMsg("User not found");
        } else if (err.response.status === 400) {
          setErrMsg(
            "channelName,owner,description,channelBanner are required!"
          );
        } else {
          setErrMsg("Something went wrong. Please try again later.");
        }
      } else {
        setErrMsg("Network error. Check your connection.");
      }
    }
    setTimeout(() => {
      setIsError(false);
      setIsSuccess(false);
      setSuccessMsg("");
      setErrMsg("");
    }, 2000);
  };

  useEffect(() => {
    if (userData.length > 0) {
      setChannelName(userData[0].username);
      setOwner(userData[0].email);
    }
  }, [userData]);

  useEffect(() => {
    const getUserId = () => {
      if (loginStatus) {
        const userId = localStorage.getItem("userId");
        setUserId(userId);
      }
    };
    getUserId();
  }, [loginStatus]);

  return (
    <div
      className={`absolute top-[100px] ${
        sidebar
          ? `sm:w-[400px] w-[210px] left-[37%]`
          : `sm:w-[400px] w-[250px] sm:left-[33%] left-[22%]`
      } h-auto bg-[#FFFFFF] rounded-md p-6 flex flex-col gap-3 shadow-xl`}
    >
      <div className="sm:text-2xl text-sm font-bold">
        How you&apos;ll appear
      </div>
      <div className="py-2 flex items-center flex-col gap-1">
        <img
          src={profileIcon}
          alt="prifile-icon"
          className="w-[80px] h-[70px] rounded-full"
        />
        <div className="font-semibold cursor-pointer text-blue-500">
          Select picture
        </div>
      </div>

      {isError && (
        <div className="sm:text-lg text-xs text-red-500">{errMsg}</div>
      )}

      {isSuccess && (
        <div className="sm:text-lg text-xs text-green-600">{successMsg}</div>
      )}

      <form
        action=""
        className="flex flex-col gap-3"
        onSubmit={handleCreateChannel}
      >
        <div className="flex gap-2 flex-col">
          <label htmlFor="text" className="text-gray-700 font-semibold text-sm">
            channelName
          </label>
          <input
            type="text"
            id="text"
            placeholder=""
            value={channelName}
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label
            htmlFor="owner"
            className="text-gray-700 font-semibold text-sm"
          >
            Handle
          </label>
          <input
            type="email"
            id="owner"
            placeholder=""
            value={owner}
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-col">
          <label
            htmlFor="channelBanner"
            className="text-gray-700 font-semibold text-sm"
          >
            channelBannerUrl
          </label>
          <input
            type="url"
            id="channelBanner"
            placeholder=""
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setChannelBanner(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-col">
          <label
            htmlFor="description"
            className="text-gray-700 font-semibold text-sm"
          >
            description
          </label>
          <input
            type="text"
            id="description"
            placeholder=""
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="bg-[#2563EB] text-white w-[100%] h-[50px] rounded-lg hover:bg-[#1A56DB]"
          >
            Create channel
          </button>
        </div>
        <div className="">
          <button
            type="reset"
            className="bg-gray-100 text-gray-600 w-[100%] h-[50px] rounded-lg hover:bg-[#cbd5eb]"
            onClick={handleNavigateToHome}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChannelCreate;
