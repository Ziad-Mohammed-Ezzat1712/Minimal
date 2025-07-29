import React, { useContext, useState } from 'react';
import { FaClipboardList, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext';
import { LanguageContext } from '../../Context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import ReacentProduct from '../ReacentProduct/ReacentProduct';

export default function MyAccount() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { isArabic } = useContext(LanguageContext);
  const navigate = useNavigate();
const governorates = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Dakahlia",
  "Red Sea",
  "Beheira",
  "Fayoum",
  "Gharbia",
  "Ismailia",
  "Menofia",
  "Minya",
  "Qalyubia",
  "New Valley",
  "Suez",
  "Aswan",
  "Assiut",
  "Beni Suef",
  "Port Said",
  "Damietta",
  "Sharqia",
  "South Sinai",
  "Kafr El Sheikh",
  "Matrouh",
  "Luxor",
  "Qena",
  "North Sinai",
  "Sohag",
];

  const [activeSection, setActiveSection] = useState("dashboard");

  const translations = {
    signout: isArabic ? "تسجيل الخروج" : "Signout",
  };

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/");
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <h2 className="text-[40px] font-bold  text-center py-6 border-b">My Account</h2>
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 border-r p-4">
            <div className="p-4 space-y-4">
              <h3 className="text-[30px] font-semiBold border-b py-2">My Account</h3>
              <ul className="space-y-2 text-sm font-medium">
                <li
                  onClick={() => setActiveSection("dashboard")}
                  className={`cursor-pointer px-3 py-2 text-[25px] font-semibold rounded ${
                    activeSection === "dashboard" ? "bg-[#9BC2AF] text-white" : "hover:text-[#9BC2AF]"
                  }`}
                >
                  Dashboard
                </li>
                <li
                  onClick={() => setActiveSection("orders")}
                  className={`cursor-pointer px-3 py-2 text-[25px] font-semibold rounded ${
                    activeSection === "orders" ? "bg-[#9BC2AF] text-white" : "hover:text-[#9BC2AF]"
                  }`}
                >
                  Orders
                </li>
                <li
                  onClick={() => setActiveSection("addresses")}
                  className={`cursor-pointer px-3 py-2 text-[25px] font-semibold rounded ${
                    activeSection === "addresses" ? "bg-[#9BC2AF] text-white" : "hover:text-[#9BC2AF]"
                  }`}
                >
                  Addresses
                </li>
                <span
                  onClick={signout}
                  className="text-[25px] font-semibold cursor-pointer hover:text-[#9BC2AF] block pt-4"
                >
                  {translations.signout}
                </span>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 p-6">
            {activeSection === "dashboard" && (
              <>
                <p className="text-[20px] text-left text-[#606160] mb-6">
                  From your account dashboard you can view your recent orders, manage your shipping and billing
                  addresses, and edit your password and account details.
                </p>

                <div className="grid text-[25px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    onClick={() => setActiveSection("orders")}
                    className="text-[25px]  cursor-pointer"
                  >
                    <DashboardCard icon={<FaClipboardList size={40} />} label="Orders" />
                  </div>

                  <div
                    onClick={() => setActiveSection("addresses")}
                    className="cursor-pointer"
                  >
                    <DashboardCard icon={<FaMapMarkerAlt size={40} />} label="Addresses" />
                  </div>

                  <div
                    onClick={signout}
                    className="cursor-pointer"
                  >
                    <DashboardCard icon={<FaSignOutAlt size={40} />} label="Logout" />
                  </div>
                </div>
              </>
            )}

            {activeSection === "orders" && (
              <>
                <h2 className="text-2xl text-left font-bold mb-4">Your Orders</h2>
                <p className="text-gray-600 text-left mb-4">Here you will find a list of all your previous orders.</p>

                {/* Dummy example — replace with actual data later */}
                <div className="border rounded p-4 mb-4">
                  <div className="flex justify-between text-lg">
                    <span>Order #12345</span>
                    <span>EGP 210.00</span>
                  </div>
                  <div className="text-sm text-gray-600">Placed on: 2025-07-28</div>
                  <div className="text-sm text-gray-600">Status: Processing</div>
                </div>
              </>
            )}

            {activeSection === "addresses" && (
              <>
                <p className="text-[20px] font-semibold text-[#606160] text-left mb-6">
                  The following addresses will be used on the checkout page by default.
                </p>
                <h2 className="text-[40px] text-left  font-bold mb-4">Billing Address</h2>

                <div className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <label className="block text-[20px] text-left mb-1">First name *</label>
                     <label className="block text-[20px] text-left mb-1">Last name *</label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text"  className="border p-3 rounded" />
                    <input type="text"  className="border p-3 rounded" />
                  </div>
                  <div>
                    <label className="block text-[20px] text-left mb-1">Country / Region *</label>
                    <div className="p-3 text-left text-[#606160] font-semibold text-[20px] rounded">Egypt</div>
                  </div>
                  <label className="block text-[25px] text-left">State / County *</label>
              <div className="mb-10"> 
                <select className="border p-3 rounded w-full">
  <option value="">Select a governorate</option>
  {governorates.map((gov) => (
    <option key={gov} value={gov}>
      {gov}
    </option>
  ))}
</select>
</div>
  <label className="block text-[25px] text-left">Area *</label>
                  <input type="text" placeholder="Area *" className="border p-3 rounded w-full" />
                   <label className="block text-[25px] text-left">Street address *</label>
                  <input type="text" placeholder="House number and street name" className="border p-3 rounded w-full" />
                  <input type="text" placeholder="Apartment, suite, unit, etc (optional)" className="border p-3 rounded w-full" />
                    <label className="block text-[25px] text-left">Phone *</label>
                  <input type="text" placeholder="Phone *" className="border p-3 rounded w-full" />
                     <label className="block text-[25px] text-left">Email address *</label>
                  <input type="email" placeholder="Careman@gmail.com" className="border p-3 rounded w-full" />
                  <div className='text-left'><button className="bg-[#9BC2AF] text-[20px]  font-semibold  text-white px-10 py-1 rounded-xl hover:bg-[#E76840]">Save</button></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-between">
        <h1 className="pl-8 text-left text-[40px] font-bold text-[#606160]">
          Related Products
        </h1>
        <Link to={"/allProducts"}>
          <button className="border p-4 rounded-xl text-[20px] font-semibold text-[#9BC2AF] hover:bg-[#E76840] hover:text-white">
            See More
          </button>
        </Link>
      </div>
      <ReacentProduct limit={6} />
    </>
  );
}

function DashboardCard({ icon, label }) {
  return (
    <div className="border rounded-md p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition">
      <div className="text-gray-700 mb-2">{icon}</div>
      <p className="text-[25px] font-medium text-gray-700">{label}</p>
    </div>

    
  );
}
