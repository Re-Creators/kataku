function ProfileInfo({ onEdit, user }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
        <div>Avatar :</div>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user.avatar}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
        <div>Nama Pengguna :</div>
        <div>{user.username}</div>
      </div>
      <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
        <div>Email :</div>
        <div>{user.email}</div>
      </div>
      <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
        <div>Kata Sandi :</div>
        <div>*******</div>
      </div>
      <div className="mt-3">
        <button
          className="rounded-md px-5 py-2 bg-gray-600 text-white"
          onClick={() => onEdit()}
        >
          Edit Profil
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
