// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-10 md:py-14 lg:py-16 overflow-hidden">
        <Outlet />
      </div>

      <Footer />
    </>
  )
}
