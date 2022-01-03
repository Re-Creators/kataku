import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/user/userSlice";

function Topbar({ toggleSidebar }) {
  const [showUserOption, setShowUserOption] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="w-full px-10 py-5 flex justify-between items-center">
      <button className="flex gap-1 items-center" onClick={toggleSidebar}>
        <BiMenu fontSize={28} className="cursor-pointer" />
        Menu
      </button>
      <Link to="/">
        <img src="/kataku-logo.svg" alt="Logo" className="h-10" />
      </Link>
      <div className="relative">
        <div className="flex gap-2 items-center relative">
          <img
            src="/rie.jpg"
            alt="Profile"
            className="cursor-pointer w-10 h-10 rounded-full"
            onClick={() => setShowUserOption((oldVal) => !oldVal)}
          />
          <p
            className="cursor-pointer"
            onClick={() => setShowUserOption((oldVal) => !oldVal)}
          >
            Rie Takahasi
          </p>
        </div>

        {showUserOption && (
          <div className="absolute  bg-white w-32 top-full mt-2 left-0">
            <button
              className="p-2 w-full hover:bg-primary hover:text-white text-left"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
