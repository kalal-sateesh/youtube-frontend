import HomeIcon from "../assets/Images/home-icon2.png";
import ShortsIcon from "../assets/Images/shorts-icon3.png";
import SubscriptionsIcon from "../assets/Images/subscription-icon.png";
import HistoryIcon from "../assets/Images/history-icon3.png";
import PlaylistIcon from "../assets/Images/playlist-icon2.png";
import YourVideos from "../assets/Images/yourvideos-con.png";
import WatchLater from "../assets/Images/watchlater-icon.webp";
import LikedVideos from "../assets/Images/likedvideos-icon2.png";
import ProfileIcon from "../assets/Images/profile-icon.png";
import Allsubscription from "../assets/Images/hamburger.png";
import { useNavigate } from "react-router-dom";
const Sidemenu = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="sm:w-[220px] w-[115px] h-[560px] fixed sm:left-4 left-0 mt-[60px] overflow-y-auto text-xs sm:text-base bg-[#FFFFFF]">
      <div
        className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg"
        onClick={handleNavigateToHome}
      >
        <div>
          <img
            src={HomeIcon}
            alt="Home-icon"
            className="sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]"
          />
        </div>
        <div className="">Home</div>
      </div>
      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={ShortsIcon}
            alt="Shorts-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Shorts</div>
      </div>
      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={SubscriptionsIcon}
            alt="Subscriptions-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Subscribe</div>
      </div>
      <div className="border-b-[1px] border-gray-300 mt-4 mb-4"></div>
      <div className="px-3 py-2 flex gap-2 hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div className="font-bold">You</div>{" "}
        <div className="font-semibold">&gt;</div>
      </div>

      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={HistoryIcon}
            alt="History-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">History</div>
      </div>

      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={PlaylistIcon}
            alt="Playlist-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Playlist</div>
      </div>

      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={YourVideos}
            alt="Your videos-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Your videos</div>
      </div>

      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={WatchLater}
            alt="Watch later-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Watch later</div>
      </div>

      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={LikedVideos}
            alt="Liked videos-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Liked videos</div>
      </div>
      <div className="border-b-[1px] border-gray-300 mt-4 mb-4"></div>

      <div className="px-3 py-2">Subscriptions</div>

      <div className="px-3 py-2 w-[200px] h-[35px] flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg overflow-hidden">
        <div>
          <img
            src={ProfileIcon}
            alt="ProfileIcon-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Sateesh kumar</div>
      </div>

      <div className="px-3 py-2 w-[200px] h-[35px] flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg overflow-hidden">
        <div>
          <img
            src={ProfileIcon}
            alt="ProfileIcon-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Akshay</div>
      </div>

      <div className="px-3 py-2 w-[200px] h-[35px] flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg overflow-hidden">
        <div>
          <img
            src={ProfileIcon}
            alt="ProfileIcon-icon"
            className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"
          />
        </div>
        <div className="">Anurag</div>
      </div>
      <div className="px-3 py-2 flex sm:gap-9 gap-2 items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={Allsubscription}
            alt="Liked videos-icon"
            className="sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]"
          />
        </div>
        <div className="">All Subscriptions</div>
      </div>
    </div>
  );
};

export default Sidemenu;
