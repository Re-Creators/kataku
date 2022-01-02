import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-2/5 py-5 px-10 bg-white flex flex-col rounded-md shadow-lg">
        <div className="w-32 self-center">
          <Link to="/">
            <img src="/kataku-logo.svg" alt="Logo" className="h-14" />
          </Link>
        </div>
        <div className="mt-10">
          <div className="">
            <label className="">Email</label>
            <div className="relative">
              <input
                type="email"
                className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
              />
              <HiOutlineMail
                fontSize="28"
                className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="">Password</label>
            <div className="relative">
              <input
                type="password"
                className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                auto
              />
              <IoMdLock
                fontSize="28"
                className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center  mt-10 justify-center">
            <button className="w-full py-3 bg-primary rounded-md text-white">
              Masuk
            </button>
          </div>
        </div>
        <div className="flex gap-1 mt-5 text-sm">
          <p className="text-gray-500">Belum punya akun ? </p>
          <Link to="/register" className="text-primary">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
