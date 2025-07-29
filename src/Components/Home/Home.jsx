// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReacentProduct from '../ReacentProduct/ReacentProduct'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import PromoSlider from '../PromoSlider/PromoSlider'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <MainSlider/>
    <PromoSlider/>
    <div className='my-7'>
      <div className='flex justify-between'>
        <h1 className='text-[40px] font-bold text-left py-5 text-[#606160]'>
        Popular Products
      </h1>
      <Link to={'/allproducts'}>
      <button className='border border-[#9BC2AF] text-[#9BC2AF] p-2 rounded-xl my-3 text-[20px] font-semibold hover:text-[#E76840] hover:border-[#E76840]'>
        See All Products
      </button></Link>
      </div>
   <ReacentProduct limit={8}/>
</div>
    </>
  )
}
