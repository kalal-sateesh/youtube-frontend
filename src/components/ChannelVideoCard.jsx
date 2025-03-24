/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { getuserData } from "./HeaderSlice";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../contants";

const ChannelVideoCard = ({
  thumbnailUrl,
  title,
  views,
  uploadedDate,
  videoId,
  index,
  clickedIndex,
  setClickedIndex,
}) => {
  const [userId, setUserId] = useState(null);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const userData = useSelector((state) => state.userData.userData);
  const loginStatus = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleEditVideo = () => {
    navigate(`/${userData ? userData[0]._id : ""}/editvideo`, {
      state: { videoId, index },
    });
  };

  const handleDeletevideo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/api/channel/${id}/video/${videoId}`
      );
      if (res.data) {
        setTimeout(() => {
          alert("Video Deleted successfully");
        }, 1000);
        setClickedIndex(null);
        const updatedUserData = await axios.get(
          `${API_BASE_URL}/api/user/${userId}`
        );
        dispatch(getuserData(updatedUserData.data));
        localStorage.setItem("userData", JSON.stringify(updatedUserData.data));
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          alert("User or Video not found");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      } else {
        alert("Network error. Check your connection.");
      }
    }
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

  return (
    <div
      className={`relative ${
        sidebar
          ? `sm:w-[250px] sm:h-[200px] w-[230px]`
          : `sm:w-[280px] sm:h-[250px] w-[250px]`
      } rounded-lg overflow-hidden cursor-pointer`}
    >
      <div className="w-[100%] h-[65%]">
        <ReactPlayer url={thumbnailUrl} width="100%" height="100%" muted />
      </div>
      <div className="w-[100%] h-[35%] text-sm flex flex-col gap-1">
        <div className="w-[100%] mt-1 h-[65%] overflow-hidden font-semibold">
          {title}
        </div>
        <div className="w-[100%] h-[35%] text-gray-600 flex justify-between">
          <span>
            {views} views • {uploadedDate}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
            onClick={() => {
              setClickedIndex(clickedIndex === index ? null : index);
            }}
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
        {clickedIndex === index && (
          <div className="w-[80px] h-auto bg-white rounded-lg border-[1px] overflow-hidden border-gray-500 absolute top-[70%] right-4">
            <div
              className="px-3 py-1 cursor-pointer hover:bg-slate-300 text-sm"
              onClick={handleEditVideo}
            >
              Edit
            </div>
            <div
              className="px-3 py-1 cursor-pointer hover:bg-slate-300 text-sm"
              onClick={handleDeletevideo}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelVideoCard;
