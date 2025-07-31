import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';

export default function RegisterForm({ onClose, onSwitchMode }) {
  const { setuserLogin } = useContext(UserContext);
  const [errorMessage, seterrorMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);

  async function handleRegister(values) {
    setisLoading(true);
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      setisLoading(false);

      if (res.data.message === 'success') {
        localStorage.setItem('userToken', res.data.token);
        setuserLogin(res.data.token);
        toast.success('Registered successfully!');
        onClose();
      }
    } catch (error) {
      setisLoading(false);
      const message = error.response?.data?.message || 'Register failed';
      seterrorMessage(message);
      toast.error(message);
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().min(2, 'min length is 2').max(10, 'max length is 10').required('name is required'),
    email: yup.string().email('email not valid').required('email is required'),
    password: yup.string().required('password is required').min(6, 'password min length is 6'),
    rePassword: yup.string().required('password is required').oneOf([yup.ref('password')], 'not match with password'),
    phone: yup.string().matches(/^01[1025][0-9]{8}$/, 'phone not valid').required('phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      {errorMessage && (
        <div className="text-red-600 font-bold rounded-lg p-3 mb-4 text-center">{errorMessage}</div>
      )}

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {/* Name */}
        <div className="relative text-left z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Name
          </label>
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-800 text-sm mt-1">{formik.errors.name}</div>
          )}
        </div>

        {/* Email */}
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
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-800 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        {/* Password */}
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
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-800 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative text-left z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Confirm Password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="text-red-800 text-sm mt-1">{formik.errors.rePassword}</div>
          )}
        </div>

        {/* Phone */}
        <div className="relative text-left z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-800 text-sm mt-1">{formik.errors.phone}</div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="font-semibold text-white bg-[#9BC2AF] hover:bg-[#E76840] text-[20px] px-10 focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg w-full sm:w-auto py-2.5 mt-6 text-center"
            disabled={isLoading}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Register'}
          </button>

          <button
            type="button"
            onClick={() => onSwitchMode('login')}
            className="text-[#E76840] text-md mt-7"
          >
            Do you have an account? Login now
          </button>
        </div>
      </form>
    </>
  );
}
