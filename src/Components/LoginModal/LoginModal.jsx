import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import illustration from "../../assets/log.png";
import { Link } from "react-router-dom";

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register' | 'forget'
  const activeClass = "bg-[#E76840] text-white";
  const inactiveClass = "text-gray-600 hover:bg-gray-200";

  function handleModeChange(newMode) {
    setMode(newMode);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-red-500 text-2xl sm:text-3xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Illustration */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            src={illustration}
            alt="Illustration"
            className="h-40 sm:h-56 md:h-72 lg:h-80 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center">
          Hala! Let's get started
        </h1>

        {/* Back button */}
        <div className="text-center sm:text-right">
          <Link to={"/"}>
            <button className="bg-[#9BC2AF] my-2 sm:my-3 px-4 py-2 rounded-xl text-white text-sm sm:text-base font-semibold hover:bg-[#E76840] transition-colors">
              Back To Home
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex justify-center bg-[#9BC2AF] py-1 sm:py-2 rounded-xl gap-0 mb-4 sm:mb-6">
          <button
            onClick={() => handleModeChange("login")}
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-white rounded-md font-semibold transition-colors duration-300 ${
              mode === "login" ? activeClass : inactiveClass
            }`}
            type="button"
          >
            Login
          </button>
          <button
            onClick={() => handleModeChange("register")}
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-white rounded-md font-semibold transition-colors duration-300 ${
              mode === "register" ? activeClass : inactiveClass
            }`}
            type="button"
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {mode === "login" && (
          <LoginForm onClose={onClose} onSwitchMode={handleModeChange} />
        )}
        {mode === "register" && (
          <RegisterForm onClose={onClose} onSwitchMode={handleModeChange} />
        )}
        {mode === "forget" && (
          <ForgetPassword onClose={onClose} onSwitchMode={handleModeChange} />
        )}
      </div>
    </div>
  );
}
