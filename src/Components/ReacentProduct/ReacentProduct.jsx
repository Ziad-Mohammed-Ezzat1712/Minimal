import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { LanguageContext } from '../../Context/LanguageContext'; // ✅ إضافة الكونتكست

export default function ReacentProduct() {

  const { isArabic } = useContext(LanguageContext); // ✅ استخدام isArabic
  let { addProductToCart, NumItem, setNumItem } = useContext(CartContext);
  let { addProductToWishList, setNumItem2, NumItem2, getLoggedUserWishList, deleteWishListItem } = useContext(WishListContext);

  const [Loading, setLoading] = useState(false);
  const [CurrentId, setCurrentId] = useState(0);
  const [CurrentId2, setCurrentId2] = useState(0);

  const [products, setproducts] = useState([]);
  const [orader, setorader] = useState([]);
  const [WishListDetails, setWishListDetails] = useState([]);

  let token = localStorage.getItem("userToken");

  async function fetchWishList() {
    let response = await getLoggedUserWishList();
    if (response.data.status === "success") {
      setWishListDetails(response.data.data);
    }
  }

  useEffect(() => {
    fetchWishList();
    getProducts();
    getorader();
  }, []);

  function isInWishList(productId) {
    return WishListDetails.some(product => product.id === productId);
  }

  async function toggleWishList(productId) {
    if (!token) {
      toast.error(isArabic ? "سجّل الدخول أولًا لإضافة المنتج إلى المفضلة" : "Please log in first to add to wishlist");
      return;
    }

    setCurrentId2(productId);
    setLoading(true);

    if (isInWishList(productId)) {
      let response = await deleteWishListItem(productId);
      if (response.data.status === "success") {
        toast.success(isArabic ? response.data.message || "تم الحذف من المفضلة" : response.data.message || "Removed from wishlist");
        setNumItem2(NumItem2 - 1);
        await fetchWishList();
      } else {
        toast.error(isArabic ? response.data.message || "فشل في الحذف من المفضلة" : response.data.message || "Failed to remove from wishlist");
      }
    } else {
      let response = await addProductToWishList(productId);
      if (response.data.status === "success") {
        toast.success(isArabic ? response.data.message || "تمت الإضافة إلى المفضلة" : response.data.message || "Added to wishlist");
        setNumItem2(NumItem2 + 1);
        await fetchWishList();
      } else {
        toast.error(isArabic ? response.data.message || "فشل في الإضافة إلى المفضلة" : response.data.message || "Failed to add to wishlist");
      }
    }

    setLoading(false);
  }

  async function addToCart(id) {
    if (!token) {
      toast.error(isArabic ? "سجّل الدخول أولًا لإضافة المنتج إلى السلة" : "Please log in first to add to cart");
      return;
    }

    setCurrentId(id);
    setLoading(true);

    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(isArabic ? response.data.message || "تمت الإضافة إلى السلة" : response.data.message || "Added to cart");
      setNumItem(NumItem + 1);
    } else {
      toast.error(response.data.message);
    }

    setLoading(false);
  }

  async function getProducts() {
    await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => {
       
        setproducts(res.data.data);
      })
      .catch(() => { });
  }

  async function getorader() {
    await axios.get('https://ecommerce.routemisr.com/api/v1/orders')
      .then((res) => {
         console.log(res.data.data);
        setorader(res.data.data);
      })
      .catch(() => { });
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.length > 0 ? products.map((product) => (
          <div key={product.id} className='w-full'>
            <div className="product p-2 my-2 text-start">
              <Link to={`productdetalis/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className='w-full' alt="" />
                <h3 className='font-semibold mb-1 text-xl'>
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <h3 className='text-[#9BC2AF] text-lg'>{product.category.name}</h3>
              </Link>
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
                </span>
              </div>
              <div className='flex justify-between'>
                <button onClick={() => addToCart(product.id)} className='btn'>
                  {Loading && CurrentId === product.id
                    ? <i className='fas fa-spinner fa-spin'></i>
                    : isArabic ? "أضف إلى السلة" : "Add to Cart"}
                </button>
                <button
                  onClick={() => toggleWishList(product.id)}
                  className='px-2 '
                  disabled={Loading && CurrentId2 === product.id}
                  style={{ fontSize: "1.6rem" }}
                  aria-label={isInWishList(product.id)
                    ? isArabic ? "إزالة من المفضلة" : "Remove from wishlist"
                    : isArabic ? "أضف إلى المفضلة" : "Add to wishlist"
                  }
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
              <br /><br />
            </div>
          </div>
        )) : (
          <div className="sk-circle col-span-full flex justify-center items-center py-10">
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
