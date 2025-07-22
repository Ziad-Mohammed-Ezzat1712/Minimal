import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/png.png'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'

export default function Navbar() {
  const { NumItem } = useContext(CartContext)
  const { userLogin, setuserLogin } = useContext(UserContext)
  const { NumItem2 } = useContext(WishListContext)

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  function signout() {
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/")
  }

  return (
    <nav className=" top-0 right-0 left-0 z-50 relative">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="" className="flex items-center">
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

        {/* Main Links (Center Left in large screens) */}
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col text-xl font-semibold lg:flex-row gap-4 lg:gap-5 mt-4 lg:mt-0 text-center lg:text-start">
            <li><Link className='text-slate-600' to="">Home</Link></li>
            <li><Link className='text-slate-600' to="brands">Brands</Link></li>
            
            
            <li><Link className='text-slate-600' to="categories">Categories</Link></li>

            {/* Auth Links for mobile only */}
            <div className='lg:hidden text-xl font-semibold flex flex-col items-center gap-2 mt-3'>
              {userLogin ? (
                <>
                           <li className="relative">
              <Link className='text-slate-600' to="wishlist">
                 <i className="fas fa-heart" ></i>
                
                   </Link>
            </li>
            <li><Link className='text-slate-600' to="cart">
                  <i className="fa-solid fa-cart-shopping"></i>
              </Link></li>
                <span onClick={signout} className="text-xl font-semibold cursor-pointer text-slate-700">Signout</span>
             </>
              ) : (
                <>
              <li className="relative">
              <Link className='text-slate-600' to="wishlist">
                 <i className="fas fa-heart" ></i>
                
                   </Link>
            </li>
            <li><Link className='text-slate-600' to="cart">
                  <i className="fa-solid fa-cart-shopping"></i>
              </Link></li>
                  <Link to="login" className="text-slate-700">Login</Link>
                  <Link to="register" className="text-slate-700">Register</Link>
                </>
              )}
            </div>

            {/* Social Icons for mobile */}
       
          </ul>
        </div>

        {/* Right Section - Auth + Social for large screens */}
        <div   className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-4 text-xl font-semibold text-slate-600">
            <li className="relative">
              <Link className='text-slate-600' to="wishlist">
                 <i className="fas fa-heart" ></i>
                
                   </Link>
            </li>
            <li><Link className='text-slate-600' to="cart">
                  <i className="fa-solid fa-cart-shopping"></i>
              </Link></li>
              
          </ul>

          <ul className="flex gap-4 text-xl font-semibold">
            {userLogin ? (
             
             <li><span onClick={signout} className="text-xl font-semibold cursor-pointer text-slate-700">Signout</span></li>

             
            ) : (
              <>
                <li><Link to="login" className="text-slate-700">Login</Link></li>
                <li><Link to="register" className="text-slate-700">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
