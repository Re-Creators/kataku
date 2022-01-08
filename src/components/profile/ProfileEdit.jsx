import React from "react";
import { BiUpload } from "react-icons/bi";

function ProfileEdit({ onCancel }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[200px_auto] items-center">
        <div>Avatar :</div>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/rie.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-full">
            <label className="h-full">
              <div className=" flex gap-2 items-center text-white rounded-md px-3 py-2 bg-gray-500 cursor-pointer">
                <BiUpload /> Unggah Foto
              </div>
              <input type="file" className="opacity-0 hidden" />
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[200px_auto] items-center">
        <div>Nama Pengguna :</div>
        <div className="w-full">
          <input
            type="text"
            className="px-2 py-1 outline-none border-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-[200px_auto] items-center">
        <div>Email :</div>
        <div className="w-full">
          <input
            type="email"
            className="px-2 py-1 outline-none border-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-[200px_auto] items-center">
        <div>Kata Sandi :</div>
        <div className="w-full">
          <input
            type="password"
            className="px-2 py-1 outline-none border-2 w-full"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button className="px-5 py-2 rounded-md bg-primary text-white">
          Simpan
        </button>
        <button
          className="px-5 py-2 rounded-md bg-gray-500 text-white"
          onClick={() => onCancel()}
        >
          Batal
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;
