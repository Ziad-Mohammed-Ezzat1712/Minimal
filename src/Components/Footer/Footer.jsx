// eslint-disable-next-line no-unused-vars
import React from 'react'
import logo from '../../assets/png.png'
import { Link } from 'react-router-dom';

export default function Footer() {
 return (
    <>
      {/* Main Footer */}
      <footer className="bg-[#9BC2AF] text-black px-6 md:px-12 py-12">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}
          <div className="flex flex-col gap-4 items-start">
            <img src={logo} alt="Logo" className="h-40 w-60 object-contain drop-shadow-lg   " />
          </div>

          {/* Need Help */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-[30px] mb-4">Quick Links</h3>
            <Link to={'/'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">Home</Link>
            <Link to={'/girls'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">Girls</Link>
            <Link to={'/boys'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">Boys</Link>
            <Link to={'/brands'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">Brand</Link>
          </div>
       <div className="flex flex-col items-start">
            <h3 className="font-semibold text-[30px] mb-4">Quick Links</h3>
            <Link to={''} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">FAQ</Link>
            <Link to={''} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">Returns & Exchanges</Link>
            <Link to={''} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">Shipping Info</Link>
            <Link to={''} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]">Contact Us</Link>
          </div>
          {/* Info */}
              <div className="flex flex-col items-start">
            <h3 className="font-semibold text-[30px] mb-4">Follow US</h3>
            <Link to={'https://www.instagram.com/minimal_kids_wear/#'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]"><i className='fab fa-instagram '></i> Instagram</Link>
            <Link to={'https://www.facebook.com/profile.php?id=61577103311162'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]"><i className='fab fa-facebook-f'></i> Facebook</Link>
            <Link to={'https://www.instagram.com/minimal_kids_wear/#'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]"><i className='fab fa-twitter'></i> Twitter</Link>
            <Link to={'https://www.tiktok.com/@minimal_kiddy_wear'} className="mb-2 cursor-pointer font-medium text-[#606160] text-[25px] hover:text-[#E76840]"><i className='fab fa-tiktok'></i> Tiktok</Link>
   
          </div>

        
          {/* Blog Posts */}
          {/* <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4">BLOG POSTS</h3>
            <p className="mb-2 cursor-pointer hover:underline">Vaping for Beginners</p>
            <p className="mb-2 cursor-pointer hover:underline">Tips On Buying Your First Vape</p>
            <p className="mb-2 cursor-pointer hover:underline">All Vape Guides</p>
            <p className="mb-2 cursor-pointer hover:underline">Mystery Bags</p>
          </div> */}
        </div>
      </footer>

      {/* Copyright Bottom Bar */}
      <div className=" bg-[#9BC2AF] p-6 text-black text-center md:text-left">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-4">
          <h1 className="text-[25px] text-left ">Copyright © 2025 Traffic-Digital.com</h1>
        </div>
      </div>
    </>
  );
}
