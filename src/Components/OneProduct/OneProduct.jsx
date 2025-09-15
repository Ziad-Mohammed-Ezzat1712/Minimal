// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import InfoTabs from '../InfoTabs/InfoTabs';
export default function OneProduct() {
  let { addProductToCart, NumItem, setNumItem } = useContext(CartContext);
  let { addProductToWishList, setNumItem2, NumItem2, getLoggedUserWishList, deleteWishListItem } = useContext(WishListContext);

  let { id, category } = useParams();

  const [oneProduct, setoneProduct] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [CurrentId, setCurrentId] = useState(0);
  const [CurrentId2, setCurrentId2] = useState(0);
  const [WishListDetails, setWishListDetails] = useState([]);
  const [count, setCount] = useState(1); // 👈 التحكم في الكمية
 const [selectedSize, setSelectedSize] = useState('');
  let token = localStorage.getItem("userToken");

  async function fetchWishList() {
    let response = await getLoggedUserWishList();
    if (response.data.status === "success") {
      setWishListDetails(response.data.data);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  function getOneProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setoneProduct(res.data.data);
        setCount(1); // 👈 إعادة الكمية 1 عند تغيير المنتج
      })
      .catch((res) => {
        console.log(res);
      });
  }

async function addToCart(id) {
  setCurrentId(id);
  setLoading(true);

  try {
    let response = await addProductToCart(id); // 👈 إضافة أولية

    if (response.data.status === "success") {
      // ✅ بعد الإضافة، نعمل تحديث للكمية (لو count > 1)
      if (count > 1) {
        await updateCartProductQuantity(id, count);
      }

      toast.success(`تم إضافة ${count} قطعة إلى السلة`);
      setNumItem(prev => prev + 1);
    } else {
      toast.error(response.data.message || "فشل في الإضافة إلى السلة");
    }

  } catch (err) {
    toast.error("حدث خطأ أثناء إضافة المنتج");
  }

  setLoading(false);
}



  function getAllProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let releted = res.data.data.filter((product) => product.category.name === category);
        setrelatedProduct(releted);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchWishList();
    getOneProduct(id);
    getAllProduct();
  }, [id, category]);

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
             <div className=' drop-shadow-lg rounded-md'>
               <img key={idx} src={src} alt={`product-img-${idx}`} className='w-full h-[425px] object-cover rounded-lg' />
             </div>
            ))}
          </Slider>
        </div>

        {/* Product details */}
        <div className="w-full lg:w-1/3 p-5">
          <h3 className="font-semibold text-[35px]  capitalize text-2xl">{oneProduct?.title}</h3>
          <h4 className="text-gray-700 my-4">{oneProduct?.description}</h4>
          <h4 className="text-[#9BC2AF] my-4">{oneProduct?.category.name}</h4>

          <div>
            <div className='flex justify-between my-5'>
              <span className='text-[#E76840] text-[30px] font-semibold'>{oneProduct?.price * count} EGP</span>
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
              </span>
            </div>
 {/* size */}

<div className="my-6">
  <h5 className="mb-2  font-medium text-[30px]">Select Size:</h5>
  <div className="flex gap-3">
    {['S', 'M', 'L', 'XL'].map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`px-4 py-1 border rounded-full transition 
          ${selectedSize === size ? 'bg-[#E76840] text-white border-[#E76840]' : 'bg-white text-gray-700 border-gray-300'}
        `}
      >
        {size}
      </button>
    ))}
  </div>
</div>

             {/* size */}
            {/* Quantity buttons */}
            <div className="flex items-center">
              <button onClick={() => setCount(prev => Math.max(1, prev - 1))} className="h-6 w-6 text-gray-500 bg-white border rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                </svg>
              </button>
              <span className='px-4'>{count}</span>
              <button onClick={() => setCount(prev => prev + 1)} className="h-6 w-6 text-gray-500 bg-white border rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>

            {/* Cart & Wishlist buttons */}
            <div className='flex justify-between mt-4'>
              <button onClick={() => addToCart(oneProduct.id)} className='btn px-6 py-2 bg-[#9BC2AF] text-white rounded hover:bg-[#E76840] transition'>
                {Loading && CurrentId === oneProduct.id
                  ? <i className='fas fa-spinner fa-spin'></i>
                  : "Add To Cart"}
              </button>

              <button
                onClick={() => toggleWishList(oneProduct?.id)}
                className='px-2'
                disabled={Loading && CurrentId2 === oneProduct?.id}
                style={{ fontSize: "1.6rem" }}
                aria-label={isInWishList(oneProduct?.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {Loading && CurrentId2 === oneProduct?.id ? (
                  <i className='fas fa-spinner fa-spin'></i>
                ) : isInWishList(oneProduct?.id) ? (
                  <i className="fas fa-heart" style={{ color: " #E76840" }}></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

<InfoTabs/>
    {/* Related products section */}
<h1 className="pl-4 md:pl-8 text-left text-2xl md:text-[40px] font-bold text-[#606160]">
  Related Products
</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {relatedProduct.length > 0 ? (
    relatedProduct.map((product) => (
      <div
        key={product.id}
        className="product p-3 border rounded shadow hover:shadow-lg transition"
      >
        <a href={`/productdetalis/${product.id}/${product.category.name}`}>
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full rounded mb-2"
          />
          <h3 className="font-semibold text-lg md:text-xl mb-1">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <h3 className="text-[#9BC2AF] text-sm md:text-lg mt-1">
            {product.category.name}
          </h3>

          <div className="flex justify-between items-center mt-2">
            <span className="text-[#E76840] text-base md:text-lg font-semibold">
              {product.price} EGP
            </span>
            <span className="flex items-center gap-1 text-sm">
              <span className="text-gray-500">({product.ratingsAverage})</span>
              {Array.from({ length: 5 }, (_, index) => {
                const rating = product.ratingsAverage;
                if (rating >= index + 1) {
                  return (
                    <i
                      key={index}
                      className="fas fa-star text-yellow-500 text-xs md:text-sm"
                    ></i>
                  );
                } else if (rating >= index + 0.5) {
                  return (
                    <i
                      key={index}
                      className="fas fa-star-half-alt text-yellow-500 text-xs md:text-sm"
                    ></i>
                  );
                } else {
                  return (
                    <i
                      key={index}
                      className="far fa-star text-yellow-500 text-xs md:text-sm"
                    ></i>
                  );
                }
              })}
            </span>
          </div>
        </a>

        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => addToCart(product.id)}
            className="px-3 py-2 text-sm md:text-base bg-[#9BC2AF] text-white rounded hover:bg-[#E76840] transition"
          >
            {Loading && CurrentId === product.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </button>

          <button
            onClick={() => toggleWishList(product.id)}
            className="px-2"
            disabled={Loading && CurrentId2 === product.id}
            style={{ fontSize: "1.4rem" }}
            aria-label={
              isInWishList(product.id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            {Loading && CurrentId2 === product.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : isInWishList(product.id) ? (
              <i className="fas fa-heart" style={{ color: "#E76840" }}></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </button>
        </div>
      </div>
    ))
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
  );
}
