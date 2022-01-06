import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../features/user/userSlice";
import { userSelector } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { clearState } from "../features/user/userSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { isFetching, isSuccess, errorMessage, isError } =
    useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate("/");
    }
  }, [isError, isSuccess, navigate, dispatch]);

  function onSubmit(data) {
    dispatch(signup(data));
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-2/5 py-5 px-10 bg-white flex flex-col rounded-md shadow-lg">
        <div className="w-32 self-center">
          <Link to="/">
            <img src="/kataku-logo.svg" alt="Logo" className="h-14" />
          </Link>
        </div>
        <div className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <form method="POST">
            <div className="">
              <label className="">Username</label>
              <div className="relative">
                <input
                  type="text"
                  className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                  {...register("username", {
                    required: "Username harus diisi",
                    minLength: {
                      value: 3,
                      message: "Username harus lebih dari 3 karakter",
                    },
                  })}
                />

                <FaUser
                  fontSize="28"
                  className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
            {errors?.username && (
              <p className="text-sm text-red-500 italic mt-1">
                {errors.username.message}
              </p>
            )}

            <div className="mt-5">
              <label className="">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                  {...register("email", { required: "Email harus diisi" })}
                />
                <HiOutlineMail
                  fontSize="28"
                  className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
            {errors?.email && (
              <p className="text-sm text-red-500 italic mt-1">
                {errors.email.message}
              </p>
            )}
            {errorMessage && (
              <p className="text-sm text-red-500 italic mt-1">{errorMessage}</p>
            )}

            <div className="mt-5">
              <label className="">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                  {...register("password", {
                    required: "Kata sandi harus diisi",
                  })}
                />
                <IoMdLock
                  fontSize="28"
                  className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
            {errors?.password && (
              <p className="text-sm text-red-500 italic mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="flex items-center  mt-10 justify-center">
              <button
                type="submit"
                className="w-full py-3 bg-primary rounded-md text-white cursor-pointer"
                disabled={isFetching}
              >
                {isFetching ? <Spinner /> : "Daftar"}
              </button>
            </div>
          </form>
        </div>
        <div className="flex gap-1 mt-5 text-sm">
          <p className="text-gray-500">Sudah punya akun ? </p>
          <Link to="/login" className="text-primary">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
