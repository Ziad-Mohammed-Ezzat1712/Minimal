import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let CartContext = createContext();

const validCoupons = {
  // الكوبونات التجريبية: الكود => نسبة الخصم (مثلاً 0.1 = 10%)
  'DISCOUNT10': 0.1,
  'FREESHIP': 0, // ممكن تعالجها بطريقة مختلفة إذا حبيت
  'SAVE20': 0.2,
};

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [CartId, setCartId] = useState(0);
  const [NumItem, setNumItem] = useState(0);
  const [CartDetails, setCartDetails] = useState(null);

  const [coupon, setCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  function addProductToCart(productId, count = 1) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
          count,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setNumItem(res.data.numOfCartItems);
        setCartDetails(res.data.data);

        setCartId(res.data.data._id);

        return res;
      })
      .catch((err) => err);
  }

  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  // تطبيق كوبون محلي (بدون API)
  function applyCoupon(couponCode) {
    return new Promise((resolve) => {
      const code = couponCode.toUpperCase();
      if (validCoupons[code]) {
        setCoupon(code);
        setDiscountPercent(validCoupons[code]);
        resolve({ data: { status: "success" } });
      } else {
        setCoupon(null);
        setDiscountPercent(0);
        resolve({ data: { status: "fail" } });
      }
    });
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProductQuantity,
        deleteCartItem,
        checkout,
        CartId,
        NumItem,
        setNumItem,
        CartDetails,
        setCartDetails,
        applyCoupon,
        coupon,
        setCoupon,
        discountPercent,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
