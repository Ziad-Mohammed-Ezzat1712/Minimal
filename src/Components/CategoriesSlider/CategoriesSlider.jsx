// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoriesSlider() {

  const [Categories, setCategories] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  function getAllCatigories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data)
      })
  }

  useEffect(() => {
    getAllCatigories();
  }, [])

  return (
    <div className="my-6 px-2 sm:px-4 md:px-8 overflow-hidden">
      <h2 className='text-start font-semibold text-lg mb-4'>Shop popular categories</h2>

      <Slider {...settings}>
        {Categories.map((category) => (
          <div key={category._id} className="px-2">
            <img
              src={category.image}
              alt={category.name}
              className="w-full object-cover h-[200px] rounded-lg shadow-sm hover:shadow-md transition"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
