import React from 'react';
import ReacentProduct from '../ReacentProduct/ReacentProduct';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import PromoSlider from '../PromoSlider/PromoSlider';
import { Link } from 'react-router-dom';
import CategoryProduct from '../CategoryProduct/CategoryProduct';
import WheelPopup from '../WheelPopup/WheelPopup'; // ✅ استيراد البوب أب

export default function Home() {
  return (
    <>
     <WheelPopup />

      <MainSlider />
      <PromoSlider />
      <div className='my-7'>
        <CategoryProduct limit={8} />
      </div>

      <div className='text-right'>
        <Link to={'/allproducts'}>
          <button className='border border-[#9BC2AF] text-[#9BC2AF] p-2 rounded-xl mt-8 text-[20px] font-semibold hover:text-[#E76840] hover:border-[#E76840]'>
            See All Products
          </button>
        </Link>
      </div>
    </>
  );
}
