
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { LanguageContext } from '../../Context/LanguageContext';

export default function CategoryProduct() {
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
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  }

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

  // تجميع المنتجات حسب الكاتيجوري
  const groupedByCategory = products.reduce((acc, product) => {
    const categoryName = product.category?.name || "Other";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(product);
    return acc;
  }, {});

  // دالة للحصول على رابط صفحة الكاتيجوري حسب الاسم
  function getCategoryLink(categoryName) {
    if (categoryName === "Women's Fashion") return "/girls";
    if (categoryName === "Men's Fashion") return "/boys";
    // ممكن تضيف روابط لتصنيفات ثانية هنا
    return "/";
  }

  return (
    <div className="container mx-auto px-4">
      {loadingProducts ? (
        <div className="col-span-full flex justify-center py-16">
          <i className="fas fa-spinner fa-spin text-4xl text-[#E76840]"></i>
        </div>
      ) : (
        <>
          {/* قسم أزياء النساء */}
          {groupedByCategory["Women's Fashion"] && (
            <div >
              <div className="flex justify-between items-center mt-10 mb-4  pb-2">
                <h2 className="text-[40px] font-bold text-[#606160]">
                  {isArabic ? " أزياء نسائية" : " Women's Fashion"}
                </h2>
                <Link
                  to={getCategoryLink("Women's Fashion")}
className="text-[20px] font-semibold text-[#9BC2AF] border border-[#9BC2AF] py-1 px-4 rounded-xl hover:text-[#E76840] hover:border-[#E76840]"
                 >
                  {isArabic ? "شاهد المزيد" : "See More"}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {groupedByCategory["Women's Fashion"].slice(0, 8).map(product => (
                  <div key={`women-${product.id}`} className="product p-2 text-start border rounded shadow hover:shadow-lg transition">
                    <Link to={`/productdetalis/${product.id}/${product.category.name}`}>
                      <img src={product.imageCover} className="w-full object-contain h-56 mb-2" alt={product.title} />
                      <h3 className="font-semibold text-xl mb-2">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <p className="text-[#9BC2AF] text-lg mb-2">{product.category.name}</p>
                    </Link>
                    <p className="text-[#E76840] text-lg font-semibold mb-2">{product.price} EGP</p>
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
                    <div className="flex justify-between items-center">
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
            </div>
          )}

          {/* قسم أزياء الرجال */}
          {groupedByCategory["Men's Fashion"] && (
            <div>
              <div className="flex justify-between items-center mt-10 mb-4  pb-2">
                <h2 className="text-[40px] font-bold text-[#606160]">
                  {isArabic ? " أزياء رجالية" : "Men's Fashion"}
                </h2>
                <Link
                  to={getCategoryLink("Men's Fashion")}
                  className="text-[20px] font-semibold text-[#9BC2AF] border border-[#9BC2AF] py-1 px-4 rounded-xl hover:text-[#E76840] hover:border-[#E76840]"
                >
                  {isArabic ? "شاهد المزيد" : "See More"}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedByCategory["Men's Fashion"].slice(0, 8).map(product => (
                  <div key={`men-${product.id}`} className="product p-2 text-start border rounded shadow hover:shadow-lg transition">
                    <Link to={`/productdetalis/${product.id}/${product.category.name}`}>
                      <img src={product.imageCover} className="w-full object-contain h-56 mb-2" alt={product.title} />
                      <h3 className="font-semibold text-xl mb-2">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <p className="text-[#9BC2AF] text-lg mb-2">{product.category.name}</p>
                    </Link>
                    <p className="text-[#E76840] text-lg font-semibold mb-2">{product.price} EGP</p>
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
                    <div className="flex justify-between items-center">
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
