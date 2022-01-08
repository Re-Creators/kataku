import React, { useState } from "react";
import ProfileEdit from "../components/profile/ProfileEdit";
import ProfileInfo from "../components/profile/ProfileInfo";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="w-4/5 lg:w-1/2 mx-auto mt-10">
      <div className="bg-white p-5 rounded-md">
        <div className="mb-5">
          <h1 className="text-2xl">Informasi Profil</h1>
          <hr className="mt-3" />
        </div>
        {isEdit ? (
          <ProfileEdit onCancel={() => setIsEdit(false)} />
        ) : (
          <ProfileInfo onEdit={() => setIsEdit(true)} />
        )}
      </div>
    </div>
  );
}

export default Profile;
