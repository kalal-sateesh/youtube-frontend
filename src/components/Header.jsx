import toggleIcon from "../assets/Images/hamburger.png";
import youtubeLogo from "../assets/Images/YouTube-logo.png";
import searchIcon from "../assets/Images/magnifying-glass.png";
import Sidemenu from "./Sidemenu";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { removeuserData, setLoggedInStatus, togglenavbar } from "./HeaderSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null);
  const [isChannel, setIsChannel] = useState(false);
  const sidebar = useSelector((state) => state.navbar.sidebar);
  const loginStatus = useSelector((state) => state.login.isLoggedIn);
  const userData = useSelector((state) => state.userData.userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleToggleSidebar = () => {
    dispatch(togglenavbar());
  };

  const handleToggleIsChannel = () => {
    setIsChannel(!isChannel);
  };

  const handleNavigateToHome = () => {
    navigate("/", { state: { searchText } });
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    dispatch(setLoggedInStatus(false));
    dispatch(removeuserData());
    navigate("/");
    setIsChannel(!isChannel);
  };

  const handleNavigateToChannel = () => {
    navigate(`/user/${userId}`);
    setIsChannel(!isChannel);
  };

  const handleCreateChannel = () => {
    navigate(`/${userId}/create`);
    setIsChannel(!isChannel);
  };
  useEffect(() => {
    const getUserName = () => {
      if (loginStatus) {
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        setName(username);
        setUserId(userId);
      }
    };
    getUserName();
  }, [loginStatus]);

  return (
    <>
      {/*  Header */}
      <header className="w-[100%] flex justify-center fixed top-0 bg-[#FFFFFF] z-50">
        <nav className="w-[97%] h-[60px] bg-[#FFFFFF] flex justify-between">
          <div className="flex justify-center items-center sm:gap-5">
            <div
              className="sm:w-[40px] sm:h-[40px] w-[25px] h-[25px] rounded-full hover:bg-[#E5E5E5] hover:cursor-pointer flex items-center justify-center"
              onClick={handleToggleSidebar}
            >
              <img
                src={toggleIcon}
                alt="toggle-Icon"
                className="sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]"
              />
            </div>
            <div className="hover:cursor-pointer">
              <img
                src={youtubeLogo}
                alt="Logo"
                className="md:w-[90px] md:h-[50px] w-[60px] h-[40px]"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="lg:w-[600px] md:w-[400px] sm:w-[300px] w-[130px] sm:h-[40px] h-[25px] rounded-s-full px-5 border-[0.5px] border-gray-400 focus:outline-blue-600 text-sm sm:text-base"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div
              className="rounded-e-full sm:w-[60px] w-[30px] sm:h-[40px] h-[25px] flex items-center sm:pl-4 pl-2 border-[1px] border-gray-400 border-l-0 hover:cursor-pointer hover:bg-[#E5E5E5]"
              onClick={handleNavigateToHome}
            >
              <img
                src={searchIcon}
                alt="SearchIcon"
                className="sm:w-[20px] sm:h-[20px] w-[10px] h-[10px]"
              />
            </div>
          </div>
          <div className={`flex items-center`}>
            {loginStatus ? (
              <>
                <button
                  className="rounded-full px-3 py-1 bg-gray-600 text-gray-100"
                  onClick={handleToggleIsChannel}
                >
                  {name && name[0]}
                </button>
                {isChannel && (
                  <div className="w-[150px] h-[100px] bg-white rounded-md text-sm fixed top-12 right-5 z-50 flex flex-col border-gray-600 border-[1px]">
                    <div className="font-semibold overflow-hidden px-2 py-2">
                      {name}
                    </div>
                    {userData[0]?.channel.length > 0 ? (
                      <div
                        className="hover:bg-gray-100 cursor-pointer px-2 py-1 text-blue-600 rounded-md"
                        onClick={handleNavigateToChannel}
                      >
                        View your channel
                      </div>
                    ) : (
                      <div
                        className="hover:bg-gray-100 cursor-pointer px-2 py-1 text-blue-600 rounded-md"
                        onClick={handleCreateChannel}
                      >
                        Create channel
                      </div>
                    )}
                    <div
                      className="hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-md flex gap-2 align-center"
                      onClick={handleSignout}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-arrow-right h-[20px]"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                        />
                      </svg>
                      <div>Sign out</div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                className="sm:px-3 sm:py-2 px-1 py-1 bg-[#FFFFFF] hover:bg-[#DEF1FF] rounded-full text-xs sm:text-sm text-blue-600 font-semibold border-[1px] border-gray-400"
                onClick={handleNavigateToLogin}
              >
                Sign in
              </button>
            )}
          </div>
        </nav>
      </header>
      {/*  Header */}

      {/* Sidebar */}
      {sidebar ? <Sidemenu /> : <Sidebar />}
      {/* Sidebar */}
    </>
  );
}

export default Header;
