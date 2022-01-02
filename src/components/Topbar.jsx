import React from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

function Topbar({ toggleSidebar }) {
  return (
    <div className="w-full px-10 py-5 flex justify-between items-center">
      <button className="flex gap-1 items-center" onClick={toggleSidebar}>
        <BiMenu fontSize={28} className="cursor-pointer" />
        Menu
      </button>
      <Link to="/">
        <img src="/kataku-logo.svg" alt="Logo" className="h-10" />
      </Link>
      <div className="flex gap-2 items-center">
        <img
          src="/rie.jpg"
          alt="Profile"
          className="cursor-pointer w-10 h-10 rounded-full"
        />
        <p>Rie Takahasi</p>
      </div>
    </div>
  );
}

export default Topbar;
