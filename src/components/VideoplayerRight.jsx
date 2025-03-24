import { useEffect, useState } from "react";
import VideoplayerRightCard from "./VideoplayerRightCard";
import axios from "axios";
import { API_BASE_URL } from "../contants";

const VideoplayerRight = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const reqObj = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    axios
      .get(`${API_BASE_URL}/api/videos`, reqObj)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => console.log("Error fetching videos", err.message));
  }, []);
  return (
    <div className="md:w-[30%] w-[100%] h-auto flex flex-col gap-2 mt-2 md:mt-0">
      {videos &&
        videos.map((video) => (
          <VideoplayerRightCard
            key={video._id}
            title={video?.title}
            views={video?.views}
            uploader={video?.uploader}
            uploadDate={video?.uploadDate}
            thumbnailUrl={video?.thumbnailUrl}
            profileUrl={video?.profileUrl}
            id={video?._id}
          />
        ))}
    </div>
  );
};

export default VideoplayerRight;
