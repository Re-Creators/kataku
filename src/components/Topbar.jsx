import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { userSelector } from "../features/user/userSlice";
import useClickOutside from "../hooks/useClickOutside";

function Topbar({ toggleSidebar }) {
  const [showUserOption, setShowUserOption] = useState(false);
  const domNode = useClickOutside(() => setShowUserOption(false));
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  return (
    <div className="w-full px-5 md:px-10 py-5 flex justify-between items-center">
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
            src={user.avatar}
            alt="Profile"
            className="cursor-pointer w-10 h-10 rounded-full object-cover object-center"
            onClick={() => setShowUserOption((oldVal) => !oldVal)}
          />
          <p
            className="cursor-pointer capitalize"
            onClick={() => setShowUserOption((oldVal) => !oldVal)}
          >
            {user?.username}
          </p>
        </div>

        <div className="absolute -left-5 md:-left-10" ref={domNode}>
          {showUserOption && (
            <div className=" bg-white w-32 top-full mt-2 rounded-md overflow-hidden shadow-md">
              <Link to="/profile">
                <button className="py-2 px-3 w-full hover:bg-primary hover:text-white text-left">
                  Profil
                </button>
              </Link>
              <button
                className="py-2 px-3 w-full hover:bg-primary hover:text-white text-left"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
