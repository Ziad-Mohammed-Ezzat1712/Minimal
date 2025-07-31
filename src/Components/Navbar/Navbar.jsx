import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/png.png';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import { LanguageContext } from '../../Context/LanguageContext';
import LoginModal from '../LoginModal/LoginModal';

export default function Navbar() {
  const { NumItem } = useContext(CartContext);
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { NumItem2 } = useContext(WishListContext);
  const { isArabic, toggleLanguage } = useContext(LanguageContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/");
  }

  const translations = {
    home: isArabic ? "الرئيسية" : "Home",
    brands: isArabic ? "العلامات التجارية" : "Brands",
    MyAccount: isArabic ? " حسابي" : "My Account",
    boys: isArabic ? "أولاد" : "Boys",
    girls: isArabic ? "بنات" : "Girls",
    login: isArabic ? "تسجيل الدخول" : "Login",
    register: isArabic ? "إنشاء حساب" : "Register",
    signout: isArabic ? "تسجيل الخروج" : "Signout",
    language: isArabic ? "English" : "العربية",
  };

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#E76840' : '#64748b',
  });

  return (
    <>
      <nav className="top-0 right-0 left-0 z-50 relative">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-20" alt="Logo" />
            </Link>
          </div>

          {/* Toggle Button for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Main Links */}
          <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
            <ul className="flex flex-col text-xl font-semibold lg:flex-row gap-4 lg:gap-5 mt-4 lg:mt-0 text-center lg:text-start">
              <li><Link to="/" style={getLinkStyle('/')} className="font-semibold hover:text-[#E76840]">{translations.home}</Link></li>
              <li><Link to="/boys" style={getLinkStyle('/boys')} className="font-semibold hover:text-[#E76840]">{translations.boys}</Link></li>
              <li><Link to="/girls" style={getLinkStyle('/girls')} className="font-semibold hover:text-[#E76840]">{translations.girls}</Link></li>
              <li><Link to="/brands" style={getLinkStyle('/brands')} className="font-semibold hover:text-[#E76840]">{translations.brands}</Link></li>

              {/* ✅ Search Bar */}
              <li className="lg:ml-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const query = e.target.search.value.trim();
                    if (query) {
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                    }
                  }}
                  className="flex items-center border border-slate-300 rounded-full px-3 py-1 bg-white"
                >
                  <input
                    type="text"
                    name="search"
                    placeholder={isArabic ? "ابحث هنا..." : "Search..."}
                    className="outline-none bg-transparent w-32 lg:w-44 placeholder-slate-400 text-slate-700"
                  />
                  <button type="submit" className="text-[#E76840] ml-2">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </li>

              {/* Mobile Auth Links */}
              <div className='lg:hidden text-xl font-semibold flex flex-col items-center gap-2 mt-3'>
                {userLogin ? (
                  <>
                    <li><Link to="/myaccount" style={getLinkStyle('/myaccount')} className="font-semibold flex gap-2 text-slate-700"><FaUserCircle size={24} />{translations.MyAccount}</Link></li>
                    <li><Link className='text-slate-600' to="/wishlist"><i className="fas fa-heart"></i></Link></li>
                    <li><Link className='text-slate-600' to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className='text-slate-600' to="/wishlist">
                      <div className="relative">
                        <i className="fa-solid fa-heart text-[25px]"></i>
                        {NumItem2 > 0 && (
                          <span className="absolute -top-2 -right-2 bg-[#E76840] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {NumItem2}
                          </span>
                        )}
                      </div>
                    </Link></li>
                    <li><Link className='text-slate-600' to="/cart">
                      <div className="relative">
                        <i className="fa-solid fa-cart-shopping text-[25px]"></i>
                        {NumItem > 0 && (
                          <span className="absolute -top-2 -right-2 bg-[#9BC2AF] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {NumItem}
                          </span>
                        )}
                      </div>
                    </Link></li>
                    <li>
                      <button onClick={() => setShowLoginModal(true)} className="text-slate-700">
                        {translations.login}
                      </button>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>

          {/* Right Section for Large Screens */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-slate-700 font-semibold border px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              {translations.language}
            </button>

            {/* Wishlist + Cart */}
            <ul className="flex gap-4 text-xl font-semibold text-slate-600">
              <li><Link className='text-slate-600' to="/wishlist"><div className="relative">
                <i className="fa-solid fa-heart text-[25px]"></i>
               
                  <span className="absolute -top-2 -right-2 bg-[#E76840] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {NumItem2}
                  </span>
           
              </div></Link></li>
              <li><Link className='text-slate-600' to="/cart"><div className="relative">
                <i className="fa-solid fa-cart-shopping text-[25px]"></i>
                
                  <span className="absolute -top-2 -right-2 bg-[#9BC2AF] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {NumItem}
                  </span>
               
              </div></Link></li>
            </ul>

            {/* Auth Links */}
            <ul className="flex gap-4 text-xl font-semibold">
              {userLogin ? (
                <>
                  <li><Link to="/myaccount" style={getLinkStyle('/myaccount')} className="font-semibold flex gap-2 text-slate-700"> <FaUserCircle size={30} /> {translations.MyAccount}</Link></li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={() => setShowLoginModal(true)} className="text-slate-700">
                      {translations.login}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
