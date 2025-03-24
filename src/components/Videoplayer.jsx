import { useSelector } from "react-redux";
import VideoplayerLeft from "./VideoplayerLeft";
import VideoplayerRight from "./VideoplayerRight";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../contants";

const Videoplayer = () => {
  const [videoData, setVideoData] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const userData = useSelector((state) => state.userData.userData);
  const { pid } = useParams();

  const handleAddComment = async (e) => {
    e.preventDefault();
    const obj = {
      text: userComment,
      userId: userData.length > 0 ? userData[0]._id : "",
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/api/${pid}/comment`, obj);
      const token = localStorage.getItem("token");
      if (!token) return;
      const reqObj = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };

      if (res.data) {
        const updatedCommentData = await axios.get(
          `${API_BASE_URL}/api/video/${pid}`,
          reqObj
        );
        const updatedDate = updatedCommentData.data.uploadDate.split("T")[0];
        setVideoData({ ...updatedCommentData.data, uploadDate: updatedDate });
        setUserComment("");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          console.log("Video not found");
        } else if (err.response.status === 400) {
          console.log("User ID and comment text are required!");
        } else {
          console.log("Something went wrong. Please try again later.");
        }
      } else {
        console.log("Network error. Check your connection.");
      }
    }
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    const obj = {
      text: userComment,
    };
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/${pid}/comment/${editCommentId}`,
        obj
      );
      const token = localStorage.getItem("token");
      if (!token) return;
      const reqObj = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };

      if (res.data) {
        const updatedCommentData = await axios.get(
          `${API_BASE_URL}/api/video/${pid}`,
          reqObj
        );
        const updatedDate = updatedCommentData.data.uploadDate.split("T")[0];
        setVideoData({ ...updatedCommentData.data, uploadDate: updatedDate });
        setUserComment("");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          console.log("Video not found");
        } else if (err.response.status === 400) {
          console.log("comment text required!");
        } else {
          console.log("Something went wrong. Please try again later.");
        }
      } else {
        console.log("Network error. Check your connection.");
      }
    }
    setIsEdit(false);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/api/${pid}/comment/${commentId}`
      );
      console.log("Delete");
      const token = localStorage.getItem("token");
      if (!token) return;
      const reqObj = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };

      if (res.data) {
        const updatedCommentData = await axios.get(
          `${API_BASE_URL}/api/video/${pid}`,
          reqObj
        );
        const updatedDate = updatedCommentData.data.uploadDate.split("T")[0];
        setVideoData({ ...updatedCommentData.data, uploadDate: updatedDate });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          console.log("Video not found");
        } else {
          console.log("Something went wrong. Please try again later.");
        }
      } else {
        console.log("Network error. Check your connection.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const reqObj = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    axios
      .get(`${API_BASE_URL}/api/video/${pid}`, reqObj)
      .then((res) => {
        const updatedDate = res.data.uploadDate.split("T")[0];
        setVideoData({ ...res.data, uploadDate: updatedDate });
      })
      .catch((err) => console.log("Error fetching videos", err.message));
  }, [pid]);

  return (
    <div
      className={`${
        sidebar ? `w-[80%] sm:left-64 left-32` : `w-[90%] sm:left-24 left-14`
      } absolute top-[60px] md:flex md:flex-row flex-col gap-2`}
    >
      <VideoplayerLeft
        title={videoData.title}
        description={videoData.description}
        thumbnailUrl={videoData.thumbnailUrl}
        uploader={videoData.uploader}
        views={videoData.views}
        likes={videoData.likes}
        dislikes={videoData.dislikes}
        uploadDate={videoData.uploadDate}
        comments={videoData.comments}
        profileUrl={videoData.profileUrl}
        setUserComment={setUserComment}
        userComment={userComment}
        handleAddComment={handleAddComment}
        handleEditComment={handleEditComment}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        setEditCommentId={setEditCommentId}
        handleDeleteComment={handleDeleteComment}
      />
      <VideoplayerRight />
    </div>
  );
};

export default Videoplayer;
