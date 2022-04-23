import { Link, useNavigate } from "react-router-dom"
import { HiOutlineMail } from "react-icons/hi"
import { IoMdLock } from "react-icons/io"
import { FaUser } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { signup } from "../features/user/userSlice"
import { userSelector } from "../features/user/userSlice"
import { useSelector } from "react-redux"
import Spinner from "../components/Spinner"
import ValidationMessage from "../components/shared/ValidationMessage"
import InputContainer from "../components/shared/InputContainer"
import Logo from "../components/shared/Logo"
import SubmitButton from "../components/shared/SubmitButton"

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm()
  const { isFetching } = useSelector(userSelector)

  const onSubmit = async (data) => {
    try {
      await dispatch(signup(data)).unwrap()
      navigate("/")
    } catch (err) {
      if (err.email) {
        setError("email", {
          type: "server",
          message: err.email,
        })
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-4/5 md:w-2/5 py-5 px-10 bg-white flex flex-col rounded-md shadow-lg">
        <div className="w-32 self-center">
          <Logo />
        </div>
        <div className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <form method="POST">
            <InputContainer errorMessage={errors?.username} textLabel="Username">
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
            </InputContainer>
            <InputContainer errorMessage={errors?.email} textLabel="Email">
              <input
                type="email"
                className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                {...register("email", {
                  required: "Email harus diisi",
                })}
              />
              <HiOutlineMail
                fontSize="28"
                className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
              />
            </InputContainer>
            <InputContainer error={errors?.password} textLabel="Password">
              <input
                type="password"
                className="mt-2 w-full outline-none border-2 border-gray-500 rounded-md py-2 px-2 pl-12"
                {...register("password", {
                  required: "Kata sandi harus diisi",
                  minLength: {
                    value: 6,
                    message: "Password harus lebih dari 6 karakter",
                  },
                })}
              />
              <IoMdLock
                fontSize="28"
                className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-gray-500"
              />
            </InputContainer>
            <div className="flex items-center  mt-10 justify-center">
              <SubmitButton loading={isFetching} disabled={isFetching} text="Daftar" />
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
  )
}

export default Register
