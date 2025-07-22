// eslint-disable-next-line no-unused-vars
import React from 'react';
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";
import slider4 from "../../assets/slider1.jpg";
import slider5 from "../../assets/slider1.jpg";
import Slider from 'react-slick';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-10 overflow-hidden ">
      {/* Main Slider */}
      <div className="w-full ">
        <Slider {...settings}>
          <img src={slider1} alt="slide1" className="w-auto h-auto md:h-auto object-cover rounded-lg" />
          <img src={slider4} alt="slide4" className="w-auto h-auto md:h-auto object-cover rounded-lg" />
          <img src={slider5} alt="slide5" className="w-auto h-auto md:h-auto object-cover rounded-lg" />
        </Slider>
      </div>

     
    </div>
  );
}
