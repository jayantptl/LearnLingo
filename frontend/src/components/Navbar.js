import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";
import userIcon from "../assets/user.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();

  // when logout is clicked
  const handleClick = () => {
    logout();
  };

  // when user icon is clicked
  const handleClickUser = () => {
       navigate('/getUserDashbord');
  };
  return (
    <header className="bg-white">
      <nav className="flex justify-between">
        <div>
          <h1 className="font-bold text-3xl m-4">LearnLingo</h1>
        </div>

        {!user && (
          <div className="flex items-center gap-[1vw]">
            <Link to="/signup">
              <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                Signup
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-[#a6c1ee] text-white mr-4 px-5 py-2 rounded-full hover:bg-[#87acec]">
                Login
              </button>
            </Link>
          </div>
        )}
        {user && (
          <div className="flex items-center">
            <Link to="/">
              <button className="bg-[#a6c1ee] text-white mr-4 px-5 py-2 rounded-full hover:bg-[#6392e4]">
                Home
              </button>
            </Link>
            <button
              onClick={handleClick}
              className="bg-[#a6c1ee] text-white px-5 py-2 mr-5 rounded-full hover:bg-[#6392e4]"
            >
              Logout
            </button>
            <Link to="/getUserLeaderboard">
              <button className="bg-[#a6c1ee] text-white mr-4 px-3 py-2 rounded-full hover:bg-[#6392e4]">
                Leaderboard
              </button>
            </Link>
            <div
              onClick={handleClickUser}
              className="w-9 mr-3 hover:cursor-pointer"
            >
              <img src={userIcon} alt="user-icon" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
