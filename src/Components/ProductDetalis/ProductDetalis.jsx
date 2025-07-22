// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetalis() {
  let { addProductToCart, NumItem, setNumItem } = useContext(CartContext)
  let { id, category } = useParams()
  const [oneProduct, setoneProduct] = useState(null)
  const [relatedProduct, setrelatedProduct] = useState([])
  const [Loading, setLoading] = useState(false)
  const [CurrentId, setCurrentId] = useState(0)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };

  function getOneProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setoneProduct(res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  }
  
  async function addToCart(id) {
    setCurrentId(id)
    setLoading(true)
    let response = await addProductToCart(id)
    console.log(response.data);

    if (response.data.status == "success") {
      toast.success(response.data.message)
      setNumItem(NumItem + 1)
      setLoading(false)
    }
    else {
      toast.error(response.data.message)
      setLoading(false)
    }
  }

  function getAllProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let releted = res.data.data.filter((product) => product.category.name == category)
        setrelatedProduct(releted)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getOneProduct(id);
    getAllProduct();
  }, [id, category])

  return (
    <>
      {/* Container for product detail and images */}
      <div className="flex flex-col lg:flex-row items-center text-start gap-6 mb-10">
        {/* Images slider */}
        <div className="w-full lg:w-1/4">
          <Slider {...settings}>
            {oneProduct?.images.map((src, idx) => (
              <img key={idx} src={src} alt={`product-img-${idx}`} className='w-full rounded-lg' />
            ))}
          </Slider>
        </div>

        {/* Product details */}
        <div className="w-full lg:w-3/4 p-5">
          <h3 className="font-semibold capitalize text-2xl">{oneProduct?.title}</h3>
          <h4 className="text-gray-700 my-4">{oneProduct?.description}</h4>
          <h4 className="text-gray-700 my-4">{oneProduct?.category.name}</h4>

          <div>
            <div className='flex justify-between my-5'>
              <span>{oneProduct?.price} EGP</span>
              <span><i className='fas fa-star text-yellow-500'></i>{oneProduct?.ratingsAverage}</span>
            </div>
            <button onClick={() => addToCart(oneProduct.id)} className='btn px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition'>
              {Loading && CurrentId === oneProduct.id
                ? <i className='fas fa-spinner fa-spin'></i>
                : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="flex flex-wrap  p-2 items-center justify-center ">
        {relatedProduct.length > 0 ? relatedProduct.map((product) =>
          <div key={product.id} className=' px-4  w-1/2  md:w-1/3 lg:w-1/4'>
            <div className="product p-2 my-2 text-start border rounded shadow hover:shadow-lg transition">
              <Link to={`/productdetalis/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt={product.title} className='w-full rounded' />
                <h3 className='text-emerald-600 mt-2'>{product.category.name}</h3>
                <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div className='flex justify-between p-3'>
                  <span>{product.price} EGP</span>
                  <span><i className='fas fa-star text-yellow-500'></i>{product.ratingsAverage}</span>
                </div>
              </Link>
              <button onClick={() => addToCart(product.id)} className='btn px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition w-full'>
                {Loading && CurrentId === product.id
                  ? <i className='fas fa-spinner fa-spin'></i>
                  : "Add To Cart"}
              </button>
            </div>
          </div>
        ) : (
          <div className="sk-circle mx-auto">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
          </div>
        )}
      </div>
    </>
  )
}
