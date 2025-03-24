/* eslint-disable react/prop-types */
import tickIcon from "../assets/Images/checked2.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { useState } from "react";
const VideoCard = ({
  title,
  views,
  uploader,
  uploadDate,
  thumbnailUrl,
  profileUrl,
  id,
}) => {
  const [autoplay, setAutoPlay] = useState(false);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const navigate = useNavigate();

  const handleNavigateToVideoplayer = () => {
    navigate(`/video/${id}`);
  };

  const updatedDate = uploadDate ? uploadDate.split("T")[0] : "";

  return (
    <div
      className={`${
        sidebar
          ? `sm:w-[348px] sm:h-[300px] w-[250px]`
          : `sm:w-[394px] sm:h-[350px] w-[285px]`
      } rounded-lg overflow-hidden cursor-pointer`}
      onClick={handleNavigateToVideoplayer}
      onMouseEnter={() => setAutoPlay(true)}
      onMouseLeave={() => setAutoPlay(false)}
    >
      <div className="w-[100%] h-[65%]">
        <ReactPlayer
          url={thumbnailUrl}
          width="100%"
          height="100%"
          playing={autoplay}
          muted
        />
      </div>
      <div className="w-[100%] h-[35%] flex">
        <div className="w-[15%] h-[100%]">
          <img
            src={profileUrl}
            alt="channel-icon"
            className="w-[40px] h-[40px] mt-3 rounded-full"
          />
        </div>
        <div className="w-[85%] h-[100%]">
          <div className="w-[100%] h-[45%] mt-3 overflow-hidden font-semibold">
            {title}
          </div>
          <div className="w-[100%] h-[20%] text-gray-600 flex gap-2 items-center">
            <div>{uploader}</div>
            <div>
              <img
                src={tickIcon}
                alt="Righttick-icon"
                className="w-[15px] h-[15px]"
              />
            </div>
          </div>
          <div className="w-[100%] h-[20%] text-gray-600">
            {views} views&apos; {updatedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
