// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
export default function ProductDetalis() {
  let { addProductToCart, NumItem, setNumItem } = useContext(CartContext)
   let { addProductToWishList, setNumItem2, NumItem2, getLoggedUserWishList, deleteWishListItem } = useContext(WishListContext);
  
  let { id, category } = useParams()
  const [oneProduct, setoneProduct] = useState(null)
  const [relatedProduct, setrelatedProduct] = useState([])
  const [Loading, setLoading] = useState(false)
  const [CurrentId, setCurrentId] = useState(0)
  const [CurrentId2, setCurrentId2] = useState(0);
const [WishListDetails, setWishListDetails] = useState([]);

  let token = localStorage.getItem("userToken");

  // جلب الوشليست عند المكون
  async function fetchWishList() {
    let response = await getLoggedUserWishList();
    if (response.data.status === "success") {
      setWishListDetails(response.data.data);
    }
  }
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
    fetchWishList();
    getOneProduct(id);
    getAllProduct();
  }, [id, category])

   function isInWishList(productId) {
    return WishListDetails.some(product => product.id === productId);
  }

   async function toggleWishList(productId) {
    if (!token) {
      toast.error("سجّل الدخول أولًا لإضافة المنتج إلى المفضلة");
      return;
    }

    setCurrentId2(productId);
    setLoading(true);

    if (isInWishList(productId)) {
      let response = await deleteWishListItem(productId);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setNumItem2(NumItem2 - 1);
        await fetchWishList();
      } else {
        toast.error(response.data.message || "فشل في الحذف من المفضلة");
      }
    } else {
      let response = await addProductToWishList(productId);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setNumItem2(NumItem2 + 1);
        await fetchWishList();
      } else {
        toast.error(response.data.message || "فشل في الإضافة إلى المفضلة");
      }
    }

    setLoading(false);
  }

  return (
    <>
      {/* Container for product detail and images */}
      <div className="flex flex-col lg:flex-row items-center text-start gap-6 mb-10">
        {/* Images slider */}
        <div className="w-full lg:h-auto lg:w-1/4">
          <Slider {...settings}>
            {oneProduct?.images.map((src, idx) => (
              <img key={idx} src={src} alt={`product-img-${idx}`} className='w-full rounded-lg' />
            ))}
          </Slider>
        </div>

        {/* Product details */}
        <div className="w-full lg:w-1/3 p-5">
          <h3 className="font-semibold text-[#606160] capitalize text-2xl">{oneProduct?.title}</h3>
          <h4 className="text-gray-700 my-4">{oneProduct?.description}</h4>
          <h4 className="text-[#9BC2AF] my-4">{oneProduct?.category.name}</h4>

          <div>
            <div className='flex justify-between my-5'>
              <span>{oneProduct?.price} EGP</span>
                 <span className="flex items-center gap-1">
               <span className="text-sm text-gray-500">({oneProduct?.ratingsAverage})</span>
  {Array.from({ length: 5 }, (_, index) => {
    
    const rating = oneProduct?.ratingsAverage;
    if (rating >= index + 1) {
      return <i key={index} className="fas fa-star text-yellow-500 text-sm"></i>;
    } else if (rating >= index + 0.5) {
      return <i key={index} className="fas fa-star-half-alt text-yellow-500 text-sm"></i>;
    } else {
      return <i key={index} className="far fa-star text-yellow-500 text-sm"></i>;
    }
  })}
 
</span> </div>
 <div className='flex justify-between '>
            <button onClick={() => addToCart(oneProduct.id)} className='btn px-6 py-2 bg-[#9BC2AF] text-white rounded hover:bg-[#719f89] transition'>
              {Loading && CurrentId === oneProduct.id
                ? <i className='fas fa-spinner fa-spin'></i>
                : "Add To Cart"}
            </button>
                   <button
                    onClick={() => toggleWishList(oneProduct?.id)}
                    className='px-2 '
                    disabled={Loading && CurrentId2 === oneProduct?.id}
                    style={{ fontSize: "1.6rem" }}
                    aria-label={isInWishList(oneProduct?.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {Loading && CurrentId2 === oneProduct?.id ? (
                      <i className='fas fa-spinner fa-spin'></i>
                    ) : isInWishList(oneProduct?.id) ? (
                      <i className="fas fa-heart" style={{ color: " #606160" }}></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="flex flex-wrap  p-2 items-center justify-center ">
        {relatedProduct.length > 0 ? relatedProduct.map((product) =>
          <div key={product.id} className=' px-4  w-1/2  md:w-1/3 lg:w-1/4'>
            <div className="product p-2 my-2 text-start border rounded shadow hover:shadow-lg transition">
              <a href={`/productdetalis/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt={product.title} className='w-full rounded' />
                 <h3 className='font-semibold text-2xl mb-1'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <h3 className='text-[#9BC2AF] text-lg mt-2'>{product.category.name}</h3>
               
                <div className='flex justify-between p-3'>
                  <span>{product.price} EGP</span>
                     <span className="flex items-center gap-1">
               <span className="text-sm text-gray-500">({product.ratingsAverage})</span>
  {Array.from({ length: 5 }, (_, index) => {
    
    const rating = product.ratingsAverage;
    if (rating >= index + 1) {
      return <i key={index} className="fas fa-star text-yellow-500 text-sm"></i>;
    } else if (rating >= index + 0.5) {
      return <i key={index} className="fas fa-star-half-alt text-yellow-500 text-sm"></i>;
    } else {
      return <i key={index} className="far fa-star text-yellow-500 text-sm"></i>;
    }
  })}
 
</span> </div>
              </a>
           <div className='flex justify-between'>
   <button onClick={() => addToCart(product.id)} className='btn px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition'>
                {Loading && CurrentId === product.id
                  ? <i className='fas fa-spinner fa-spin'></i>
                  : "Add To Cart"}
              </button>
               <button
                    onClick={() => toggleWishList(product.id)}
                    className='px-2 '
                    disabled={Loading && CurrentId2 === product.id}
                    style={{ fontSize: "1.6rem" }}
                    aria-label={isInWishList(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {Loading && CurrentId2 === product.id ? (
                      <i className='fas fa-spinner fa-spin'></i>
                    ) : isInWishList(product.id) ? (
                      <i className="fas fa-heart" style={{ color: " #606160" }}></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </button>

           </div>
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
