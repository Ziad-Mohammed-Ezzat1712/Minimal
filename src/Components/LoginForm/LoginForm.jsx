import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';

export default function LoginForm({ onClose, onSwitchMode }) {
  const { setuserLogin } = useContext(UserContext);
  const [errorMessage, seterrorMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);

  async function handleLogin(values) {
    setisLoading(true);
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      setisLoading(false);

      if (res.data.message === 'success') {
        localStorage.setItem('userToken', res.data.token);
        setuserLogin(res.data.token);
        toast.success('Login successful!');
        onClose(); // يغلق المودال تلقائياً
      }
    } catch (error) {
      setisLoading(false);
      const message = error.response?.data?.message || 'Login failed';
      seterrorMessage(message);
      toast.error(message);
    }
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email not valid').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password min length is 6'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {errorMessage && (
        <div className="text-red-600 font-bold rounded-lg p-3 mb-4 text-center">{errorMessage}</div>
      )}

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {/* Email Input */}
        <div className="relative text-left z-0 w-full mb-5 group">
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
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-800 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        {/* Password Input */}
        <div className="relative text-left z-0 w-full mb-5 group">
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
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-800 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        {/* Forget Password */}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={() => onSwitchMode('forget')}
            className="text-[#E76840] text-md"
          >
            Forget Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="font-semibold text-white bg-[#9BC2AF] hover:bg-[#E76840] text-[20px] xl:px-52 focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg w-full sm:w-auto py-2.5 mt-6 text-center"
          disabled={isLoading}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
        </button>
      </form>
    </>
  );
}
