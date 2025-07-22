import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { UserContext } from '../../Context/UserContext';



export default function VerifiyCode() {
  let {userVerifiyCode,setuserVerifiyCode}=useContext(UserContext)
const [errorMessage, seterrorMessage] = useState("")
const [isLoading, setisLoading] = useState(false)
async function handleVerifiyCode() {
 setisLoading(true)
 return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
  resetCode:""
 })

.then((res)=> {console.log(res)
setisLoading(false)

}
)
.catch((res)=>   {
console.log(res);
setisLoading(false)
})
}



let formik = useFormik({
  initialValues : {
   
    resetCode : "",
   
 
  },
  validationSchema : "",
  onSubmit:handleVerifiyCode,
})



  return (
    <>
    {errorMessage ? <div className='w-1/2 mx-auto text-red-600 font-bold  rounded-lg p-3'>
{errorMessage}
    </div> : null}
    <h1 className='text-emerald-600 font-bold'>VerifiyCode Now</h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto" >

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="emal" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email&& formik.touched.email ? (
<div className="p-4 mb-4 text-red-800 rounded-lg" role="alert">
<span className="font-medium">{formik.errors.email}</span>
</div>
  ) : null }
  </div>
  
 
  
 
  <div className='flex items-center gap-4'>
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Next"}</button>
  
  
  </div>
  
  </form>
    </>
  )
}
