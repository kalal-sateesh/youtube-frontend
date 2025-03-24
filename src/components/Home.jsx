import { useDispatch, useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { getuserData, removeuserData, setLoggedInStatus } from "./HeaderSlice";
import { useLocation, useNavigate } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import { API_BASE_URL } from "../contants";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const loginStatus = useSelector((state) => state.login.isLoggedIn);
  const errorMessage = useSelector((state) => state.errorMsg.errorMsg);
  const errorStatus = useSelector((state) => state.errorStatus.errorStatus);

  const allCategories = videos.flatMap((video) => video.category);
  const uniqueCategories = [...new Set(allCategories)];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(() => {
    if (location.state && location.state.searchText) {
      const searchText = location.state.searchText.toLowerCase();
      const updatedVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(searchText)
      );
      setFilteredVideos(updatedVideos);
    } else if (location.state && location.state.category) {
      const FilteredText = location.state.category.toLowerCase();
      const updatedVideos = videos.filter((video) =>
        video.category.toLowerCase().includes(FilteredText)
      );
      setFilteredVideos(updatedVideos);
    } else {
      setFilteredVideos(videos);
    }
  }, [location.state, videos]);

  useEffect(() => {
    setIsLoading(true);
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const data = JSON.parse(localStorage.getItem("userData"));
      if (token) {
        try {
          setIsLoading(true);
          const response = await axios.post(
            `${API_BASE_URL}/api/verifyToken`,
            {},
            { headers: { Authorization: `JWT ${token}` } }
          );
          if (response.data.valid && response.data.username) {
            dispatch(setLoggedInStatus(true));
            dispatch(getuserData(data));
            localStorage.setItem("username", response.data.username);
            setIsLoading(false);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userData");
            dispatch(removeuserData());
            dispatch(setLoggedInStatus(false));
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Error verifying token", err.message);
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userData");
          dispatch(removeuserData());
          dispatch(setLoggedInStatus(false));
          setIsLoading(false);
        }
      } else {
        console.log("No valid token found");
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    checkToken();
  }, [dispatch]);

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
  }, [loginStatus]);

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { state: null, replace: true });
      setClickedIndex(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
    <>
      {!errorStatus && loginStatus && (
        <>
          <div
            className={`${
              sidebar
                ? `w-[80%] sm:left-[250px] left-[120px]`
                : `w-[90%] sm:left-[100px] left-[70px]`
            } h-[80px] overflow-x-auto flex items-center mt-[60px] fixed p-3 z-10 bg-[#FFFFFF]`}
          >
            {!isLoading ? (
              uniqueCategories.map((category, index) => {
                return (
                  <FilterButtons
                    key={index}
                    category={category}
                    index={index}
                    clickedIndex={clickedIndex}
                    setClickedIndex={setClickedIndex}
                  />
                );
              })
            ) : (
              <div
                className={`${
                  sidebar
                    ? `w-[80%] sm:left-[250px] left-[120px]`
                    : `w-[90%] sm:left-[100px] left-[70px]`
                } flex gap-4 justify-center absolute flex-wrap top-36`}
              >
                Loading...
              </div>
            )}
          </div>
          <div
            className={`${
              sidebar
                ? `w-[80%] sm:left-[250px] left-[120px]`
                : `w-[90%] sm:left-[100px] left-[70px]`
            } flex gap-4 justify-center absolute flex-wrap top-36`}
          >
            {!isLoading ? (
              filteredVideos.map((video) => (
                <VideoCard
                  key={video?._id}
                  title={video?.title}
                  views={video?.views}
                  uploader={video?.uploader}
                  uploadDate={video?.uploadDate}
                  thumbnailUrl={video?.thumbnailUrl}
                  profileUrl={video?.profileUrl}
                  id={video?._id}
                />
              ))
            ) : (
              <div
                className={`${
                  sidebar
                    ? `w-[80%] sm:left-[250px] left-[120px]`
                    : `w-[90%] sm:left-[100px] left-[70px]`
                } flex gap-4 justify-center absolute flex-wrap top-36`}
              >
                Loading...
              </div>
            )}
          </div>
        </>
      )}
      {!errorStatus && !loginStatus && (
        <>
          <div
            className={`${
              sidebar
                ? `w-[80%] sm:left-[250px] left-[120px]`
                : `w-[90%] sm:left-[100px] left-[70px]`
            } flex gap-4 justify-center absolute flex-wrap top-36`}
          >
            Sign in to watch, like, comment videos
          </div>
        </>
      )}
      {errorStatus && !loginStatus && (
        <div
          className={`${
            sidebar
              ? `w-[80%] sm:left-[250px] left-[120px]`
              : `w-[90%] sm:left-[100px] left-[70px]`
          } flex gap-4 justify-center absolute flex-wrap top-36`}
        >
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default Home;
