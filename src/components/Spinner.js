import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className=" animate-spin  rounded-full border-4 border-t-4 border-t-black  h-5 w-5"></div>
    </div>
  );
}

export default Spinner;
