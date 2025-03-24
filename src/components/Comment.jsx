/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import profileIcon from "../assets/Images/profile-icon.png";
const Comment = ({
  userProfile,
  text,
  timestamp,
  userId,
  email,
  index,
  setSelectedIndex,
  selectedIndex,
  setIsEdit,
  commentId,
  setEditCommentId,
  setUserComment,
  handleDeleteComment,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setEditId(id);
  }, []);
  return (
    <div className="flex gap-2">
      <div className="w-[40px]">
        <img
          src={userProfile || profileIcon}
          alt=""
          className="w-[40px] h-[35px] rounded-full"
        />
      </div>
      <div className="w-[90%] flex justify-between">
        <div className="flex flex-col gap-2 justify-end">
          <div className="font-semibold text-sm">
            {email}{" "}
            {timestamp
              ? `on ${timestamp.split("T")[0]} at ${timestamp.split("T")[1]}`
              : ""}
          </div>
          <div className="text-sm">{text}</div>
        </div>

        <div className="mr-2 flex gap-1">
          {isShow && selectedIndex === index && (
            <div
              className={`w-[80px] ${
                userId === editId ? `h-[57px]` : `h-[30px]`
              } bg-white z-10 rounded-lg border-[1px] overflow-hidden border-gray-500 relative right-0`}
            >
              {userId === editId ? (
                <>
                  <div
                    className="px-3 py-1 cursor-pointer hover:bg-slate-300 text-sm"
                    onClick={() => {
                      setIsEdit(true);
                      setEditCommentId(commentId);
                      setUserComment(text);
                      setIsShow(!isShow);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="px-3 py-1 cursor-pointer hover:bg-slate-300 text-sm"
                    onClick={() => {
                      handleDeleteComment(commentId);
                      setIsShow(!isShow);
                    }}
                  >
                    Delete
                  </div>
                </>
              ) : (
                <div className="px-3 py-1 cursor-pointer hover:bg-slate-300 text-sm">
                  Report
                </div>
              )}
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical cursor-pointer relative"
            viewBox="0 0 16 16"
            onClick={() => {
              setIsShow(!isShow);
              setSelectedIndex(index);
            }}
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Comment;
