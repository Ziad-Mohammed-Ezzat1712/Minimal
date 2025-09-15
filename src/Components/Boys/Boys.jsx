import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import { LanguageContext } from '../../Context/LanguageContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Boys() {
  const { isArabic } = useContext(LanguageContext);
  const { addProductToCart, NumItem, setNumItem } = useContext(CartContext);
  const {
    addProductToWishList,
    deleteWishListItem,
    wishListData,
    refetchWishList,
    NumItem2,
    setNumItem2,
  } = useContext(WishListContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        const menProducts = res.data.data.filter(p => p.category?.name === "Men's Fashion");
        setProducts(menProducts);
      } catch (error) {
        console.error(error);
        toast.error(isArabic ? "حدث خطأ أثناء تحميل المنتجات" : "Error loading products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [isArabic]);

  function isInWishList(productId) {
    return wishListData?.some(product => product.id === productId);
  }

  async function toggleWishList(productId) {
    if (!token) {
      toast.error(isArabic ? "سجّل الدخول أولًا لإضافة المنتج إلى المفضلة" : "Please log in first to add to wishlist");
      return;
    }

    setLoadingAction(`wishlist-${productId}`);
    try {
      if (isInWishList(productId)) {
        const res = await deleteWishListItem(productId);
        if (res.data.status === "success") {
          toast.success(isArabic ? "تم الحذف من المفضلة" : "Removed from wishlist");
          setNumItem2(NumItem2 - 1);
        }
      } else {
        const res = await addProductToWishList(productId);
        if (res.data.status === "success") {
          toast.success(isArabic ? "تمت الإضافة إلى المفضلة" : "Added to wishlist");
          setNumItem2(NumItem2 + 1);
        }
      }
      await refetchWishList();
    } catch (error) {
      toast.error(isArabic ? "حدث خطأ في المفضلة" : "Wishlist error");
    }
    setLoadingAction(null);
  }

  async function addToCart(productId) {
    if (!token) {
      toast.error(isArabic ? "سجّل الدخول أولًا لإضافة المنتج إلى السلة" : "Please log in first to add to cart");
      return;
    }

    setLoadingAction(`cart-${productId}`);
    try {
      const res = await addProductToCart(productId);
      if (res.data.status === "success") {
        toast.success(isArabic ? "تمت الإضافة إلى السلة" : "Added to cart");
        setNumItem(NumItem + 1);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(isArabic ? "حدث خطأ أثناء الإضافة إلى السلة" : "Error adding to cart");
    }
    setLoadingAction(null);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <i className="fas fa-spinner fa-spin text-4xl text-[#E76840]"></i>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 ">
      <h1 className="text-3xl text-left font-bold mb-6 text-[#606160]">
        {isArabic ? "أزياء رجالية" : "Men's Fashion"}
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">
          {isArabic ? "لا توجد منتجات في هذا القسم حالياً" : "No products available in this category."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="border rounded p-3 shadow hover:shadow-lg transition flex flex-col">
              <Link
                to={`/productdetalis/${product.id}/${product.category.name}`}
                className="block mb-3 cursor-pointer"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-56 object-contain"
                />
              </Link>

              <div className="flex flex-col text-left flex-grow justify-between">
                <Link
                  to={`/productdetalis/${product.id}/${product.category.name}`}
                  className="font-semibold text-lg mb-1 hover:text-[#E76840]"
                >
                  {product.title}
                </Link>
                <p className="text-[#9BC2AF] mb-1">{product.category.name}</p>
                <p className="text-[#E76840] font-semibold mb-2">{product.price} EGP</p>
              </div>
<div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">({product.ratingsAverage})</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => {
                          const rating = product.ratingsAverage;
                          if (rating >= i + 1) return <i key={i} className="fas fa-star text-yellow-500 text-sm"></i>;
                          if (rating >= i + 0.5) return <i key={i} className="fas fa-star-half-alt text-yellow-500 text-sm"></i>;
                          return <i key={i} className="far fa-star text-yellow-500 text-sm"></i>;
                        })}
                      </div>
                    </div>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-[#9BC2AF] hover:bg-[#E76840] transition text-white font-semibold px-4 py-2 rounded-xl text-sm"
                >
                  {loadingAction === `cart-${product.id}` ? <i className="fas fa-spinner fa-spin"></i> : isArabic ? "أضف إلى السلة" : "Add to Cart"}
                </button>
                <button
                  onClick={() => toggleWishList(product.id)}
                  disabled={loadingAction === `wishlist-${product.id}`}
                  className="text-xl"
                >
                  {loadingAction === `wishlist-${product.id}` ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : isInWishList(product.id) ? (
                    <i className="fas fa-heart text-[#E76840]"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
