import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { IoMdLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, login, clearState } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  function onSubmit(data) {
    dispatch(login(data));
  }

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate("/");
    }
  }, [isError, isSuccess, navigate, dispatch]);
  return (
    <div className="flex justify-center items-center h-screen md:min-h-[600px]">
      <div className="w-4/5 md:w-2/5 py-5 px-10 bg-white flex flex-col rounded-md shadow-lg">
        <div className="w-32 self-center">
          <Link to="/">
            <img src="/kataku-logo.svg" alt="Logo" className="h-14" />
          </Link>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <label className="">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                  {...register("email", { required: true })}
                />
                <HiOutlineMail
                  fontSize="28"
                  className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
                />
              </div>
              {errors?.email && (
                <p className="text-sm text-red-500 italic mt-1">
                  Email harus diisi!
                </p>
              )}
            </div>
            <div className="mt-5">
              <label className="">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                  {...register("password", { required: true })}
                />
                <IoMdLock
                  fontSize="28"
                  className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
                />
              </div>
              {errors?.password && (
                <p className="text-sm text-red-500 italic mt-1">
                  Password harus diisi
                </p>
              )}
              {errorMessage && (
                <p className="text-sm text-red-500 italic mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="flex items-center  mt-10 justify-center">
              <button
                type="submit"
                className="w-full py-3 bg-primary rounded-md text-white cursor-pointer"
                disabled={isFetching}
              >
                {isFetching ? <Spinner /> : "Masuk"}
              </button>
            </div>
          </form>
        </div>
        <div className="flex gap-1 mt-5 text-sm">
          <p className="text-gray-500">Belum punya akun ? </p>
          <Link to="/register" className="text-primary">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
