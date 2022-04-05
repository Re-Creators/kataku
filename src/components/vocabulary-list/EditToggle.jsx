import React from "react";
const editModeClass = " transform translate-x-6";

function EditToggle({ editMode, toggleHandler }) {
  return (
    <div className="flex gap-2 items-center mt-5 md:mt-0">
      <div
        className="w-10 h-4 flex items-center bg-white rounded-full cursor-pointer  "
        onClick={toggleHandler}
      >
        <div
          className={
            "bg-primary h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out" +
            (editMode ? editModeClass : null)
          }
        ></div>
      </div>
      <div>Edit Mode</div>
    </div>
  );
}

export default EditToggle;
