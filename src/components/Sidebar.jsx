import HomeIcon from "../assets/Images/home-icon2.png";
import ShortsIcon from "../assets/Images/shorts-icon3.png";
import SubscriptionsIcon from "../assets/Images/subscription-icon.png";
import ProfileIcon from "../assets/Images/profile-icon.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="w-auto h-[90vh] fixed sm:left-3 left-2 mt-[60px] bg-[#FFFFFF]">
      <div
        className="sm:px-4 px-1 py-4 sm:w-[60px] w-[40px] h-auto flex gap-2 flex-col items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg"
        onClick={handleNavigateToHome}
      >
        <div>
          <img
            src={HomeIcon}
            alt="Home-icon"
            className="sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]"
          />
        </div>
        <div style={{ fontSize: "10px" }}>Home</div>
      </div>

      <div className="sm:px-4 px-1 py-4 sm:w-[60px] w-[40px] h-auto flex gap-2 flex-col items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={ShortsIcon}
            alt="ShortsIcon-icon"
            className="w-[25px] h-[25px]"
          />
        </div>
        <div style={{ fontSize: "10px" }}>Shorts</div>
      </div>

      <div className="sm:px-4 px-1 py-4 sm:w-[60px] w-[45px] h-auto flex gap-2 flex-col items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={SubscriptionsIcon}
            alt="Subscriptions-icon"
            className="w-[25px] h-[25px]"
          />
        </div>
        <div style={{ fontSize: "10px" }}>Subscribe</div>
      </div>

      <div className="sm:px-4 px-1 py-4 sm:w-[60px] w-[40px] h-auto flex gap-2 flex-col items-center hover:cursor-pointer hover:bg-[#E5E5E5] rounded-lg">
        <div>
          <img
            src={ProfileIcon}
            alt="Profile-icon"
            className="w-[25px] h-[20px]"
          />
        </div>
        <div style={{ fontSize: "10px" }}>You</div>
      </div>
    </div>
  );
};

export default Sidebar;
