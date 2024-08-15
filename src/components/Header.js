import img1 from "../images/food_logo.png";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";
const Header = () => {
  const [btnName, setBtnName] = useState("Log IN");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center bg-pink-50 shadow-lg p-4">
      <div className="logo-container">
        <img className="w-24" src={img1} alt="Food Logo" />
      </div>
      <div className="nav-items flex items-center">
        <ul className="flex space-x-6">
          <li className="p-2">Online Status: {onlineStatus ? "✅" : "🛑"}</li>
          <li className="p-2">
            <Link to="/" className="hover:text-gray-700">
              Home
            </Link>
          </li>
          <li className="p-2">
            <Link to="/about" className="hover:text-gray-700">
              About Us
            </Link>
          </li>
          <li className="p-2">
            <Link to="/details" className="hover:text-gray-700">
              Contact Us
            </Link>
          </li>
          <li className="p-2">
            <Link to="/cart" className="hover:text-gray-700">
              Cart
            </Link>
          </li>
          <li>{loggedInUser}</li>
        </ul>
        <button
          className="ml-4 p-2 bg-green-200 rounded-lg hover:bg-green-300 transition duration-300"
          onClick={() => {
            setBtnName(btnName === "Log IN" ? "Log OUT" : "Log IN");
          }}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default Header;
