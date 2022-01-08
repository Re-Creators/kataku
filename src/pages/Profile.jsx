import React, { useState } from "react";
import ProfileEdit from "../components/profile/ProfileEdit";
import ProfileInfo from "../components/profile/ProfileInfo";
import { userSelector } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { user, isFetching } = useSelector(userSelector);

  return (
    <div className="w-4/5 lg:w-1/2 mx-auto mt-10">
      {isFetching ? (
        <div className="w-full mt-10 flex items-center justify-center">
          <Spinner classSize="w-10 h-10" />
        </div>
      ) : (
        <div className="bg-white p-5 rounded-md">
          <div className="mb-5">
            <h1 className="text-2xl">Informasi Profil</h1>
            <hr className="mt-3" />
          </div>
          {isEdit ? (
            <ProfileEdit back={() => setIsEdit(false)} user={user} />
          ) : (
            <ProfileInfo onEdit={() => setIsEdit(true)} user={user} />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
