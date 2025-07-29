import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import { UserContext } from '../../Context/UserContext'

export default function ForgetPassword({ onClose, onSwitchMode }) {
  let { ResetPassword } = useContext(UserContext)
  const [errorMessage, seterrorMessage] = useState("")
  const [isLoading, setisLoading] = useState(false)

  async function handleForgetPassword() {
    setisLoading(true)
    try {
      const res = await ResetPassword(formik.values)
      console.log(res.data)
      setisLoading(false)
      onSwitchMode('login') // ارجع لتسجيل الدخول بعد إرسال الطلب
    } catch (error) {
      seterrorMessage(error.response?.data?.message || "Failed to reset password")
      setisLoading(false)
    }
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("email not valid").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema,
    onSubmit: handleForgetPassword,
  })

  return (
    <>
      {errorMessage && (
        <div className='text-red-600 font-bold rounded-lg p-3 mb-4 text-center'>
          {errorMessage}
        </div>
      )}

      <p className='text-[#606160]  text-[15px] mb-6 text-center'>Lost your password? Please enter your username or email address. You will receive OTP code to create a new password via email.
</p>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto ">
        <div className="text-left relative z-0 w-full mb-5 group">
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
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-800 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="text-white bg-[#9BC2AF] hover:bg-[#E76840] text-[20px] px-52 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg  w-full sm:w-auto  py-2.5 text-center"
          disabled={isLoading}
        >
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Next"}
        </button>

        <div className="text-right mt-4 ">
          <button
            type="button"
            onClick={() => onSwitchMode('login')}
            className="text-[#E76840]  text-[20px]"
          >
            Back to Login
          </button>
        </div>
      </form>
    </>
  );
}
