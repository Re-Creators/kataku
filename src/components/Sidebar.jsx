import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Sidebar({ toggleSidebar }) {
  return (
    <div className="absolute inset-0 z-20" onClick={toggleSidebar}>
      <div
        className="w-4/5 md:w-1/4 h-full bg-white pt-5 px-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="top-5 right-3 absolute" onClick={toggleSidebar}>
          <IoClose fontSize={28} />
        </button>
        <Link to="/" className="">
          <img src="/kataku-logo.svg" alt="" className="h-10 mx-auto" />
        </Link>
        <div className="mt-10">
          <ul className="text-xl flex flex-col">
            <li className="mb-5">
              <Link
                to="/"
                className="w-full relative hover:text-primary sliding-underline"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            <li className="mb-5">
              <Link
                to="/new-vocabulary"
                className="w-full relative hover:text-primary sliding-underline"
                onClick={toggleSidebar}
              >
                Tambah Kosakata
              </Link>
            </li>
            <li className="mb-5">
              <Link
                to="/vocabulary"
                className="w-full relative hover:text-primary sliding-underline"
                onClick={toggleSidebar}
              >
                Daftar Kosakata
              </Link>
            </li>
            <li>
              <Link
                to="/quiz"
                className="w-full relative hover:text-primary sliding-underline"
                onClick={toggleSidebar}
              >
                Kuis
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
