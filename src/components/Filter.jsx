import React, { useState } from "react";
import { BiChevronDown, BiCheck } from "react-icons/bi";
import useClickOutside from "../hooks/useClickOutside";

const filterItems = ["Semua", "Terbaru", "Sudah Hafal"];

function Filter() {
  const [showOption, setShowOption] = useState(false);
  const [selected, setSelected] = useState(filterItems[0]);
  const domNode = useClickOutside(() => setShowOption(false));

  return (
    <div className="flex gap-2 items-center">
      <label>Filter : </label>
      <div className="w-36  relative cursor-pointer">
        <input
          type="text"
          disabled
          className="bg-white p-2 px-3 w-full cursor-pointer"
          value="Terbaru"
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 right-3"
          onClick={() => setShowOption(!showOption)}
        >
          <BiChevronDown fontSize={24} />
        </span>
        <div
          className="absolute top-full inset-x-0 bg-white  z-10 shadow-md mt-2 rounded-md"
          ref={domNode}
        >
          {showOption && (
            <ul className="">
              {filterItems.map((item, index) => (
                <li
                  className="cursor-pinter p-3 hover:bg-primary hover:text-white flex justify-between items-center transition-colors duration-300"
                  key={index}
                  onClick={() => setSelected(item)}
                >
                  {item} {selected === item && <BiCheck />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
