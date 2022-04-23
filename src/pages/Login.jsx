import { Link } from "react-router-dom"
import { HiOutlineMail } from "react-icons/hi"
import { useForm } from "react-hook-form"
import { IoMdLock } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { userSelector, login } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import InputContainer from "../components/shared/InputContainer"
import Logo from "../components/shared/Logo"
import SubmitButton from "../components/shared/SubmitButton"

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm()
  const { isFetching } = useSelector(userSelector)

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap()
      navigate("/")
    } catch (err) {
      if (err.email) {
        setError("email", {
          type: "server",
          message: err.email,
        })
      }
      if (err.password) {
        setError("password", {
          type: "server",
          message: err.password,
        })
      }
    }
  }
  return (
    <div className="flex justify-center items-center h-screen md:min-h-[600px]">
      <div className="w-4/5 md:w-2/5 py-5 px-10 bg-white flex flex-col rounded-md shadow-lg">
        <div className="w-32 self-center">
          <Logo />
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer errorMessage={errors?.email} textLabel="Email">
              <input
                type="email"
                className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                {...register("email", { required: true })}
              />
              <HiOutlineMail
                fontSize="28"
                className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
              />
            </InputContainer>
            <InputContainer errorMessage={errors?.password} textLabel="Password">
              <input
                type="password"
                className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                {...register("password", { required: true })}
              />
              <IoMdLock
                fontSize="28"
                className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
              />
            </InputContainer>
            <div className="flex items-center  mt-10 justify-center">
              <SubmitButton disabled={isFetching} loading={isFetching} text="Masuk" />
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
  )
}

export default Login
