import { useState, useCallback, useEffect } from "react";
import { BiUpload } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import axios from "../../axios";
import Spinner from "../Spinner";

function ProfileEdit({ back, user }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(user.avatar);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    if (file) {
      formData.append("avatar", file);
    }

    try {
      setLoading(true);
      const { data } = await axios.patch("/user", formData);
      dispatch(updateUser(data));

      back();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const convertToPreview = useCallback((file) => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setPreviewImg(fileReader.result);
      };
    }
  }, []);

  useEffect(() => {
    convertToPreview(file);
  }, [file, convertToPreview]);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
            <div>Avatar :</div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={previewImg}
                  alt="Preview Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-full">
                <label className="h-full">
                  <div className="text-sm md:text-base flex gap-2 items-center text-white rounded-md px-3 py-2 bg-gray-500 cursor-pointer">
                    <BiUpload /> Unggah Foto
                  </div>
                  <input
                    type="file"
                    className="opacity-0 hidden"
                    onChange={(e) => {
                      if (e.target.files) setFile(e.target.files[0]);
                    }}
                    accept=".jpg, .jpeg, .png"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
            <div>Nama Pengguna :</div>
            <div className="w-full">
              <input
                type="text"
                className="px-2 py-1 outline-none border-2 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
            <div>Email :</div>
            <div className="w-full">
              <input
                type="email"
                className="px-2 py-1 outline-none border-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] items-center">
            <div>Kata Sandi :</div>
            <div className="w-full">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-2 py-1 outline-none border-2 w-full"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              className="px-5 py-2 rounded-md bg-primary text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Simpan"}
            </button>
            <button
              className="px-5 py-2 rounded-md bg-gray-500 text-white"
              onClick={() => back()}
              disabled={loading}
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
