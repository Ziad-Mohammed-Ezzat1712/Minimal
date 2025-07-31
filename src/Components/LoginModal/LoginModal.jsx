import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import illustration from '../../assets/log.png';
import { Link } from 'react-router-dom';

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forget'
  const activeClass = "bg-[#E76840] text-white";
  const inactiveClass = "text-gray-600 hover:bg-gray-200";

  function handleModeChange(newMode) {
    setMode(newMode);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="flex justify-center mb-6">
          <img
            src={illustration}
            alt="Illustration"
            className="h-80 object-contain"
          />
        </div>

        <h1 className="font-bold text-2xl mb-6 text-center">Hala! Let's get started</h1>

        <div className="text-right">
          <Link to={'/'}>
            <button className="bg-[#9BC2AF] my-3 p-2 rounded-xl text-white font-semibold hover:bg-[#E76840] hover:border-[#E76840] ">
              Back To Home
            </button>
          </Link>
        </div>

        {/* أزرار اختيار الوضع */}
        <div className="flex justify-center bg-[#9BC2AF] py-2 rounded-xl gap-0 mb-6">
          <button
            onClick={() => handleModeChange('login')}
            className={`px-6 py-2 text-white rounded-md hover:bg-[#9BC2AF] font-semibold transition-colors duration-300 ${mode === 'login' ? activeClass : inactiveClass}`}
            type="button"
          >
            Login
          </button>
          <button
            onClick={() => handleModeChange('register')}
            className={`px-6 py-2 rounded-md text-white hover:bg-[#9BC2AF] font-semibold transition-colors duration-300 ${mode === 'register' ? activeClass : inactiveClass}`}
            type="button"
          >
            Register
          </button>
        </div>

        {/* عرض الفورم حسب الوضع */}
        {mode === 'login' && <LoginForm onClose={onClose} onSwitchMode={handleModeChange} />}
        {mode === 'register' && <RegisterForm onClose={onClose} onSwitchMode={handleModeChange} />}
        {mode === 'forget' && <ForgetPassword onClose={onClose} onSwitchMode={handleModeChange} />}
      </div>
    </div>
  );
}
