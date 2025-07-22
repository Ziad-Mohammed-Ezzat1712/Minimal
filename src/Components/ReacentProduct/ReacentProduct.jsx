import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

export default function ReacentProduct() {

  let { addProductToCart, NumItem, setNumItem } = useContext(CartContext);
  let { addProductToWishList, setNumItem2, NumItem2, getLoggedUserWishList, deleteWishListItem } = useContext(WishListContext);

  const [Loading, setLoading] = useState(false);
  const [CurrentId, setCurrentId] = useState(0);
  const [CurrentId2, setCurrentId2] = useState(0);

  const [WishListDetails, setWishListDetails] = useState([]);
  const [products, setproducts] = useState([]);
  const [orader, setorader] = useState([]);

  let token = localStorage.getItem("userToken");

  // جلب الوشليست عند المكون
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

  async function addToCart(id) {
    if (!token) {
      toast.error("سجّل الدخول أولًا لإضافة المنتج إلى السلة");
      return;
    }

    setCurrentId(id);
    setLoading(true);

    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
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
                <h3 className='text-emerald-600'>{product.category.name}</h3>
                <h3 className='font-semibold mb-1'>
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
              </Link>
              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span>
                  <button
                    onClick={() => toggleWishList(product.id)}
                    className='px-2'
                    disabled={Loading && CurrentId2 === product.id}
                    style={{ fontSize: "1.2rem" }}
                    aria-label={isInWishList(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {Loading && CurrentId2 === product.id ? (
                      <i className='fas fa-spinner fa-spin'></i>
                    ) : isInWishList(product.id) ? (
                      <i className="fas fa-heart" style={{ color: "red" }}></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </button>
                  <i className='fas fa-star text-yellow-500 px-1'></i>{product.ratingsAverage}
                </span>
              </div>
              <button onClick={() => addToCart(product.id)} className='btn'>
                {Loading && CurrentId === product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
              </button>
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
