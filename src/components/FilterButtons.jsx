/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const FilterButtons = ({ category, index, clickedIndex, setClickedIndex }) => {

  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    if (clickedIndex === index) {
      navigate("/", { state: null });
      setClickedIndex(null);
    } else {
      navigate("/", { state: { category } });
      setClickedIndex(index);
    }
  };

  return (
    <div
      className={`${
        clickedIndex === index ? `bg-gray-700 text-white` : `bg-[#F2F2F2]`
      } px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm mr-3 hover:bg-[#E5E5E5]`}
      onClick={handleNavigateToHome}
    >
      {category}
    </div>
  );
};

export default FilterButtons;
