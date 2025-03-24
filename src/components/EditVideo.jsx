import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getuserData } from "./HeaderSlice";
import axios from "axios";

const EditVideo = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const loginStatus = useSelector((state) => state.login.isLoggedIn);
  const userData = useSelector((state) => state.userData.userData);

  const dispatch = useDispatch();
  const location = useLocation();
  const { videoId, index } = location.state || {};

  const { id } = useParams();
  const navigate = useNavigate();

  const navigateToChannel = () => {
    navigate(`/user/${userId}`);
  };

  const handleEditvideo = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setIsError(false);
    setIsSuccess(false);

    const reqObj = {
      title,
      description,
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/channel/${id}/video/${videoId}`,
        reqObj
      );

      if (res.data) {
        setIsSuccess(true);
        setSuccessMsg("Video Updated successfully");
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
          setErrMsg("title and description are required!");
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
    const getUserId = () => {
      if (loginStatus) {
        const userId = localStorage.getItem("userId");
        setUserId(userId);
      }
    };
    getUserId();
  }, [loginStatus]);

  useEffect(() => {
    if (userData.length > 0) {
      setTitle(userData[0].channel[0].videos[index].title);
      setDescription(userData[0].channel[0].videos[index].description);
    }
  }, [userData, index]);

  return (
    <div
      className={`absolute top-[100px] ${
        sidebar
          ? `sm:w-[400px] w-[210px] left-[37%]`
          : `sm:w-[400px] w-[250px] sm:left-[33%] left-[22%]`
      } h-auto bg-[#FFFFFF] rounded-md p-6 flex flex-col gap-6 shadow-xl`}
    >
      {isError && (
        <div className="sm:text-lg text-xs text-red-500">{errMsg}</div>
      )}

      {isSuccess && (
        <div className="sm:text-lg text-xs text-green-600">{successMsg}</div>
      )}

      <form
        action=""
        className="flex flex-col gap-6"
        onSubmit={handleEditvideo}
      >
        <div className="flex gap-2 flex-col">
          <label htmlFor="text" className="text-gray-700 font-semibold text-sm">
            Title
          </label>
          <input
            type="text"
            id="text"
            placeholder="Enter title here"
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label
            htmlFor="description"
            className="text-gray-700 font-semibold text-sm"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Enter description here"
            className="h-[50px] px-3 bg-[#F9FAFB] focus:outline-blue-400 outline-gray-300 rounded-md border-[1px] border-gray-300"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="bg-[#2563EB] text-white w-[100%] h-[50px] rounded-lg hover:bg-[#1A56DB]"
          >
            Save
          </button>
        </div>

        <div className="">
          <button
            type="reset"
            className="bg-gray-300 text-white w-[100%] h-[50px] rounded-lg hover:bg-gray-400"
            onClick={navigateToChannel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVideo;
