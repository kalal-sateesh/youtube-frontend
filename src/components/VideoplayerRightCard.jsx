/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
const VideoplayerRightCard = ({
  title,
  views,
  uploader,
  uploadDate,
  thumbnailUrl,
  id,
}) => {
  const updatedDate = uploadDate ? uploadDate.split("T")[0] : "";
  const navigate = useNavigate();
  const handleNavigateToVideoplayer = () => {
    navigate(`/video/${id}`);
  };
  return (
    <div
      className="flex gap-1 cursor-pointer"
      onClick={handleNavigateToVideoplayer}
    >
      <div className="w-[45%] h-[90px] rounded-lg overflow-hidden">
        <ReactPlayer url={thumbnailUrl} width="100%" height="100%" muted />
      </div>
      <div className="w-[55%] h-[90px] flex flex-col gap-1">
        <div className="w-[100%] h-[50%] overflow-hidden text-sm font-semibold">
          {title}
        </div>
        <div className="w-[100%] h-[25%] overflow-hidden text-sm text-gray-600">
          {uploader}
        </div>
        <div className="w-[100%] h-[25%] overflow-hidden text-sm text-gray-600">
          {views} views &#8226; {updatedDate}
        </div>
      </div>
    </div>
  );
};

export default VideoplayerRightCard;
