import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../features/user/userSlice";

function Home() {
  return (
    <div className="w-4/5 mx-auto mt-14">
      <div className="">
        <h1 className="text-3xl font-bold">Selamat Pagi, Richardo</h1>
        <p className="text-gray-500 text-sm mt-2">
          Ini adalah ringkasan hasil belajarmu.
        </p>
      </div>
      <div className="mt-8 flex gap-10">
        <div className="w-72 text-center py-10   bg-white shadow-md rounded-md">
          <h1 className="mb-2 font-bold text-xl text-primary">
            Kosa Kata Hari ini
          </h1>
          <h2 className="font-semibold text-lg">30</h2>
        </div>
        <div className="w-72 text-center py-10   bg-white shadow-md rounded-md">
          <h1 className="mb-2 font-bold text-xl text-primary">
            Semua Kosa Kata
          </h1>
          <h2 className="font-semibold text-lg">30</h2>
        </div>
        <div className="w-72 text-center py-10   bg-white shadow-md rounded-md">
          <h1 className="mb-2 font-bold text-xl text-primary">
            Kosa Kata Hari ini
          </h1>
          <h2 className="font-semibold text-lg">30</h2>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="font-bold text-lg">Kosa Kata Baru</h1>
        <div className="flex gap-8 mt-3">
          <div className="w-80 text-center py-10 px-5  bg-white shadow-md rounded-md">
            <h1 className="mb-2 font-bold text-xl text-primary">Cut it out</h1>
            <h2 className="font-semibold text-lg">
              Hentikan Sekarang Juga wkwkw asda
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
