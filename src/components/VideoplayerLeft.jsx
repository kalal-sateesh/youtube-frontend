/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import shareIcon from "../assets/Images/share.png";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const VideoplayerLeft = ({
  title,
  description,
  thumbnailUrl,
  uploader,
  views,
  likes,
  uploadDate,
  comments,
  profileUrl,
  setUserComment,
  userComment,
  handleAddComment,
  handleEditComment,
  setIsEdit,
  isEdit,
  setEditCommentId,
  handleDeleteComment,
}) => {
  const [users, setUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const userData = useSelector((state) => state.userData.userData);

  const handleCancel = () => {
    setUserComment("");
    setIsEdit(isEdit && false);
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
      .get(`http://localhost:5000/api/users`, reqObj)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log("Error fetching user", err.message));
  }, []);

  return (
    <div className="md:w-[70%] w-[100%] flex flex-col gap-3">
      <div className="w-[100%] rounded-lg overflow-hidden">
        <ReactPlayer
          url={thumbnailUrl}
          width="100%"
          className="h-auto"
          controls
        />
      </div>
      <div className="font-bold text-xs sm:text-sm md:text-base lg:text-xl">
        {title}
      </div>
      <div className="flex lg:flex-row flex-col justify-between text-xs lg:gap-0 gap-1">
        <div className="flex lg:w-[50%] w-[100%] gap-2 justify-between lg:justify-start">
          <div>
            <img
              src={profileUrl}
              alt="Profile-Icon"
              className="w-[35px] h-[30px] rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-bold ">{uploader}</div>
            <div className="text-gray-500">5.4M Subscribers</div>
          </div>
          <div className="flex items-center">
            <button className="bg-black text-white rounded-full px-5 py-2">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex lg:w-[50%] w-[100%] justify-between items-center">
          <div className="flex ga-2 items-center rounded-full overflow-hidden">
            <div className="sm:p-2 p-1 flex items-center cursor-pointer bg-[#F2F2F2] hover:bg-[#E5E5E5]">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-hand-thumbs-up lg:w-[20px] h-auto sm:[15px] w-[10px]"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                </svg>
              </span>
              <span className="font-bold ml-2">{likes}</span>
            </div>
            <div className="flex items-center px-2 sm:py-[8px] py-[7px] border-l-[1px] border-gray-400 bg-[#F2F2F2] cursor-pointer hover:bg-[#E5E5E5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-hand-thumbs-down lg:w-[20px] h-auto sm:[15px] w-[10px]"
                viewBox="0 0 16 16"
              >
                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
              </svg>
            </div>
          </div>
          <div className="sm:px-3 sm:py-2 px-2 py-1 flex items-center cursor-pointer bg-[#F2F2F2] hover:bg-[#E5E5E5] rounded-full">
            <span>
              <img
                src={shareIcon}
                alt="shareIcon"
                className="lg:w-[20px] h-auto sm:[15px] w-[10px]"
              />
            </span>
            <span className="font-bold ml-2">Share</span>
          </div>
          <div className="sm:px-3 sm:py-2 px-2 py-1 flex items-center cursor-pointer bg-[#F2F2F2] hover:bg-[#E5E5E5] rounded-full">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-download lg:w-[20px] h-auto sm:[15px] w-[10px]"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
            </span>
            <span className="font-bold ml-2">Download</span>
          </div>
        </div>
      </div>
      <div className="bg-[#F2F2F2] p-2 rounded-lg">
        <div className="font-bold">
          {views} views, uploaded on {uploadDate}
        </div>
        <div>{description}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-xl">
          {comments ? comments.length : 0} Comments
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-[40px]">
              <img
                src={userData.length > 0 ? userData[0].avatar : ""}
                alt=""
                className="w-[40px] h-[35px] rounded-full"
              />
            </div>
            <form
              action=""
              className="w-[95%] flex flex-col gap-1 justify-end"
              onSubmit={isEdit ? handleEditComment : handleAddComment}
            >
              <input
                type="text"
                className="border-b-[1px] border-gray-400 outline-none focus:border-black focus:border-b-[2px] text-sm w-[100%] h-[30px]"
                placeholder="Add a comment..."
                onChange={(e) => setUserComment(e.target.value)}
                required
                value={userComment}
              />
              <div className="flex gap-3 justify-end">
                <button
                  className="hover:bg-[#F2F2F2] rounded-full px-3 py-1"
                  type="reset"
                  disabled={userComment.length > 0 ? false : true}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className={`${
                    userComment.length > 0
                      ? `bg-black text-white`
                      : `bg-[#F2F2F2] text-gray-500`
                  } rounded-full px-3 py-1`}
                  type="submit"
                  disabled={userComment.length > 0 ? false : true}
                >
                  {isEdit ? "Save" : "Comment"}
                </button>
              </div>
            </form>
          </div>
          {comments &&
            comments.map((comment, index) => {
              const user = users.find((u) => u._id === comment.userId);
              return (
                <Comment
                  key={comment._id}
                  userId={user._id}
                  text={comment.text}
                  timestamp={comment.timestamp}
                  userProfile={user.avatar}
                  username={user.username}
                  email={user.email}
                  index={index}
                  setSelectedIndex={setSelectedIndex}
                  selectedIndex={selectedIndex}
                  handleEditComment={handleEditComment}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                  commentId={comment.commentId}
                  setEditCommentId={setEditCommentId}
                  setUserComment={setUserComment}
                  handleDeleteComment={handleDeleteComment}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default VideoplayerLeft;
