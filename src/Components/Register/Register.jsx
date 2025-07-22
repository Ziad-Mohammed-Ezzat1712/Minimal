import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { UserContext } from '../../Context/UserContext';
import signin from '../../assets/signin.png'



export default function Register() {
  let {userLogin,setuserLogin}=useContext(UserContext)
const [errorMessage, seterrorMessage] = useState("")
const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate()
async function handleRegester(values) {
 setisLoading(true)
 await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)

.then((res)=> {console.log(res)
setisLoading(false)

if (res.data.message == "success") {
  localStorage.setItem("userToken", res.data.token)

  setuserLogin(res.data.token)

  navigate("/")   
}
}
)
.catch((res)=>   {

  seterrorMessage(res.response.data.message)
setisLoading(false)
})
}

let validationSchema = yup.object().shape({
  name : yup.string().min(2,"min length is 2").max(10,"max length is 10").required("name is required"),
  email: yup.string().email("email not vaild").required("email is required"),
  password: yup.string().required("password is required").min(6,"password min length is 6"),
  rePassword: yup.string().required("password is required").oneOf( [yup.ref("password")],"not match with password"),
  phone: yup.string().matches(/^01[1025][0-9]{8}$/,"phone not vaild").required("phone is required")

});

let formik = useFormik({
  initialValues : {
    name : "",
    email : "",
    password: "",
    rePassword: "",
    phone:"",

  },
  validationSchema,
  onSubmit:handleRegester,
})



  return (
    <div className="flex h-[70vh] items-center justify-center px-4">
    <div className="flex flex-col justify-center md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-7xl w-full">
     <div className="hidden  md:block md:w-1/2">
             <img
               src={signin} // تقدر تغير الرابط دا لصورة من عندك
               alt="Login Illustration"
               className="object-contain h-100 w-100"
             />
           </div>
   
   
    <div className="md:w-1/4  p-8 text-left">
    {errorMessage ? <div className='w-1/2 mx-auto text-red-600 font-bold  rounded-lg p-3'>
{errorMessage}
    </div> : null}
    <h1 className='text-[#52B177] font-bold text-2xl'>Get Start Shopping</h1>
    <p className=''>Welcome to FreshCart! Enter your email to get started.</p>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto" >
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
  {formik.errors.name&& formik.touched.name ? (
<div className="p-4 mb-4 text-red-800 rounded-lg" role="alert">
<span className="font-medium">{formik.errors.name}</span>
</div>
  ) : null }
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="emal" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email&& formik.touched.email ? (
<div className="p-4 mb-4 text-red-800 rounded-lg" role="alert">
<span className="font-medium">{formik.errors.email}</span>
</div>
  ) : null }
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password&& formik.touched.password ? (
<div className="p-4 mb-4 text-red-800 rounded-lg" role="alert">
<span className="font-medium">{formik.errors.password}</span>
</div>
  ) : null }
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword</label>
      {formik.errors.rePassword&& formik.touched.rePassword ? (
<div className="p-4 mb-4 text-red-800 rounded-lg" role="alert">
<span className="font-medium">{formik.errors.rePassword}</span>
</div>
  ) : null }
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="tel" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
      {formik.errors.phone&& formik.touched.phone ? (
<div className="p-4 mb-4 text-red-800 rounded-lg" role="alert">
<span className="font-medium">{formik.errors.phone}</span>
</div>
  ) : null }
  </div>
  
 
  <div className='flex items-center gap-4'>
  <button type="submit" className="text-white bg-[#52B177] hover:bg-[#36774f] focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}</button>
  
  <Link to={"/login"}>  <span className='text-blue-500 underline'>do you have account ? login now</span>
  </Link>
  </div>
  
  </form>
  </div>
  </div>
    </div>
  )
}
