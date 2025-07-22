import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { UserContext } from '../../Context/UserContext';
import signin from '../../assets/signin.png'
export default function Login() {
  let { userLogin, setuserLogin } = useContext(UserContext)
  const [errorMessage, seterrorMessage] = useState("")
  const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate()

  async function handleLogin(values) {
    setisLoading(true)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        console.log(res)
        setisLoading(false)

        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token)
          setuserLogin(res.data.token)
          navigate("/")
        }
      })
      .catch((res) => {
        console.log(res);
        seterrorMessage(res.response.data.message)
        setisLoading(false)
      })
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("email not valid").required("email is required"),
    password: yup.string().required("password is required").min(6, "password min length is 6"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  })

  return (
    <div className="flex h-[70vh] items-center justify-center px-4">
      <div className="flex flex-col justify-center md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-7xl w-full">
        
        {/* Left Side - Image */}
        <div className="hidden  md:block md:w-1/2">
          <img
            src={signin} // تقدر تغير الرابط دا لصورة من عندك
            alt="Login Illustration"
            className="object-contain h-100 w-100"
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/4  p-8 text-left">
          {errorMessage ? (
            <div className='text-red-600 font-bold rounded-lg p-3'>
              {errorMessage}
            </div>
          ) : null}

         <div className='text-left'>
           <h1 className='text-[#52B177] font-bold text-2xl mb-6'>Sign in to FreshCart</h1>
          <p className=' mb-6'>Welcome back to FreshCart! Enter your email to get started.


</p>
         </div>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                required
              />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Enter Your Email</label>
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-800 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                required
              />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Enter Your Password</label>
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-800 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className='flex items-center gap-4 flex-wrap mt-4'>
              <button type="submit" className="text-white font-semibold bg-[#52B177] hover:bg-[#36774f] focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
              </button>

              <Link to={"/register"}>
                <span className='text-green-800'><span className='text-black'>Don't have an account?</span> Register now</span>
              </Link>

              <Link to={"/forgetpassword"}>
                <span className='text-blue-500 underline'>Forget password</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
