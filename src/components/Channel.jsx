import { useSelector } from "react-redux";
import grayRightTick from "../assets/Images/grayRightTick.png";
import ChannelVideoCard from "./ChannelVideoCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const [channelVideos, setChannelVideos] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const userData = useSelector((state) => state.userData.userData);

  const navigate = useNavigate();

  const handleNavigatetoAddvido = () => {
    navigate(`/${userData ? userData[0]._id : ""}/addvideo`);
  };

  useEffect(() => {
    setChannelVideos(userData.length > 0 ? userData[0].channel[0].videos : []);
  }, [userData]);

  return (
    <div
      className={`${
        sidebar ? `w-[80%] sm:left-64 left-32` : `w-[90%] sm:left-24 left-14`
      } absolute top-[60px] flex flex-col gap-4 pb-3`}
    >
      <div className="">
        <img
          src={userData.length > 0 ? userData[0].channel[0].channelBanner : ""}
          alt="cover-image"
          className="w-full rounded-lg h-[200px] object-cover"
        />
      </div>

      <div className="flex md:flex-row flex-col gap-2">
        <div className="">
          <img
            src={userData.length > 0 ? userData[0].avatar : ""}
            alt="profile-icon"
            className="lg:w-[150px] lg:h-[150px] md:w-[80px] md:h-[80px] w-[60px] h-[60px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold flex gap-1 items-center">
            <div>
              {userData.length > 0 ? userData[0].channel[0].channelName : ""}{" "}
            </div>
            <img
              src={grayRightTick}
              alt="gray-right-tick icon"
              className="w-[15px] h-[15px] rounded-full"
            />
          </div>
          <div className="text-sm">
            <span className="">
              {userData.length > 0 ? userData[0].channel[0].owner : ""}
            </span>
            <span className="text-gray-600">
              {" "}
              • {userData.length > 0
                ? userData[0].channel[0].subscribers
                : ""}{" "}
              subscribers •{" "}
              {userData.length > 0 && userData[0].channel[0].videos.length}{" "}
              videos
            </span>
          </div>

          <div className="text-gray-600 text-xs lg:text-sm">
            {userData.length > 0 && userData[0].channel[0].description}
          </div>
          <div className="">
            <button className="bg-black text-white rounded-full px-5 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 pb-2 pl-1 border-b-[1px] border-gray-300 text-gray-500 font-semibold">
        <div className="hover:cursor-pointer">Home</div>
        <div className="hover:cursor-pointer text-black">Videos</div>
        <div className="hover:cursor-pointer">Shorts</div>
        <div className="hover:cursor-pointer">Live</div>
        <div className="hover:cursor-pointer">Podcast</div>
        <div className="hover:cursor-pointer">Playlist</div>
        <div
          className="hover:cursor-pointer text-black hover:text-blue-600"
          onClick={handleNavigatetoAddvido}
        >
          Add Video
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {channelVideos && channelVideos.length > 0 ? (
          channelVideos.map((video, index) => (
            <ChannelVideoCard
              key={video.videoId}
              thumbnailUrl={video.thumbnailUrl}
              title={video.title}
              views={video.views}
              uploadedDate={
                video?.uploadDate
                  ? video?.uploadDate.split("T")[0]
                  : video?.uploadDate
              }
              videoId={video.videoId}
              index={index}
              clickedIndex={clickedIndex}
              setClickedIndex={setClickedIndex}
            />
          ))
        ) : (
          <div className="text-lg font-semibold flex justify-center mt-5">
            No videos
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
