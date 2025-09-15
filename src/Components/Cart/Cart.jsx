import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    setNumItem,
    NumItem,
    applyCoupon,
    coupon,
    setCoupon,
    discountPercent,
  } = useContext(CartContext);

  const [CartDetails, setCartDetails] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const navigate = useNavigate();

  async function getCartItem() {
    const response = await getLoggedUserCart();
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
  }

  async function updateProduct(id, count) {
    if (count < 1) return;
    const response = await updateCartProductQuantity(id, count);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
  }

  async function deleteItem(productId) {
    const response = await deleteCartItem(productId);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
      setNumItem(NumItem - 1);
    }
  }

  async function handleApplyCoupon() {
    if (!couponCode) return;
    const response = await applyCoupon(couponCode);
    if (response?.data?.status === "success") {
      setCartDetails((prev) => ({ ...prev }));
      setCouponMessage("Coupon Applied ✅");
      setCoupon(couponCode);
    } else {
      setCouponMessage("Invalid Coupon ❌");
    }
  }

  useEffect(() => {
    getCartItem();
    if (coupon) {
      setCouponCode(coupon);
      handleApplyCoupon();
    }
  }, [coupon]);

  const subtotal =
    CartDetails?.products.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    ) || 0;
  const shipping = 60;
  const discountAmount = subtotal * discountPercent;
  const total = subtotal + shipping - discountAmount;

  return (
    <>
      {CartDetails?.products.length > 0 ? (
        <>
          {/* Steps Header */}
          <div className="bg-[#9BC2AF] w-full flex justify-center p-4 sm:p-6 gap-2 sm:gap-6 flex-wrap text-center">
            <span className="text-xl sm:text-[40px] font-bold text-black">
              Shopping Cart <i className="fa fa-arrow-right"></i>
            </span>
            <span className="text-xl sm:text-[40px] font-bold text-[#606160]">
              Checkout <i className="fa fa-arrow-right"></i>
            </span>
            <span className="text-xl sm:text-[40px] font-bold text-[#606160]">
              Order Complete
            </span>
          </div>

          {/* Cart Items + Coupon + Totals */}
          <div className="flex flex-col lg:flex-row p-4 sm:p-6 gap-6 sm:gap-8">
            {/* Left Side */}
            <div className="flex-1 flex flex-col gap-8">
              {CartDetails.products.map((product) => (
                <div
                  key={product.product.id}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-1/3 md:w-1/4 flex justify-center">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-28 h-28 sm:w-40 sm:h-40 md:w-60 md:h-60 object-contain rounded"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="w-full md:w-3/4 space-y-4 mt-6 md:mt-10 text-start break-words">
                    <h3 className="font-semibold text-lg sm:text-xl md:text-[30px] text-black">
                      {product.product.title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-[25px] font-semibold text-[#606160]">
                      size S
                    </p>
                    <p className="text-[#E76840] text-lg sm:text-xl md:text-[30px] font-bold">
                      {product.price * product.count} EGP
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          updateProduct(product.product.id, product.count - 1)
                        }
                        className="h-8 w-8 sm:h-10 sm:w-10 text-gray-500 bg-white border rounded flex items-center justify-center"
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <span className="text-base sm:text-xl md:text-[30px] text-[#606160]">
                        {product.count}
                      </span>
                      <button
                        onClick={() =>
                          updateProduct(product.product.id, product.count + 1)
                        }
                        className="h-8 w-8 sm:h-10 sm:w-10 text-gray-500 bg-white border rounded flex items-center justify-center"
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => deleteItem(product.product.id)}
                      className="text-white bg-red-800 px-3 py-2 rounded-xl mt-2 text-sm sm:text-base md:text-lg font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="flex flex-col md:flex-row gap-4 items-center mt-6 border-t pt-6">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full md:w-1/2 border rounded px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-[#9BC2AF] hover:bg-[#E76840] text-white text-base sm:text-lg md:text-[20px] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded transition"
                >
                  Apply Coupon
                </button>
              </div>

              {couponMessage && (
                <p
                  className={`mt-2 font-semibold ${
                    couponMessage.includes("Invalid")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Right Side - Totals */}
            <div className="w-full lg:w-1/3 xl:w-1/4 mt-4 lg:mt-0">
              <div className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow">
                <h3 className="text-xl sm:text-2xl md:text-[40px] text-left font-bold mb-6">
                  Cart Totals
                </h3>

                {/* Subtotal */}
                <div className="flex justify-between mb-4">
                  <span className="text-base sm:text-lg md:text-[30px] font-semibold">
                    Subtotal
                  </span>
                  <span className="text-[#E76840] font-semibold text-base sm:text-lg md:text-[30px] text-right block">
                    {subtotal} EGP
                  </span>
                </div>

                {/* Shipping */}
                <div className="my-7">
                  <div className="flex justify-between py-2">
                    <span className="text-base sm:text-lg md:text-[30px] font-semibold">
                      Shipping
                    </span>
                    <span className="text-[#E76840] font-medium text-sm sm:text-lg md:text-[25px] text-right block">
                      <span className="text-[#606160] font-medium">
                        Flat rate:
                      </span>{" "}
                      60.00 EGP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-[25px] text-right font-medium text-gray-500">
                    Shipping to{" "}
                    <span className="font-semibold text-[#606160]">Cairo</span>.
                  </p>
                  <div className="mt-4 text-right">
                    <a
                      href="#"
                      className="text-[#E76840] text-xs sm:text-sm md:text-[25px] font-medium hover:text-[#9BC2AF]"
                    >
                      Change address
                    </a>
                  </div>
                </div>

                {/* Discount */}
                {discountPercent > 0 && (
                  <div className="flex justify-between mb-4 text-green-600 font-semibold text-base sm:text-lg md:text-[30px]">
                    <span>Discount</span>
                    <span>-{discountAmount.toFixed(2)} EGP</span>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between mt-6 mb-6">
                  <span className="text-base sm:text-lg md:text-[30px] font-semibold">
                    Total
                  </span>
                  <span className="text-[#E76840] font-semibold text-base sm:text-lg md:text-[30px] text-right block">
                    {total.toFixed(2)} EGP
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#9BC2AF] hover:bg-[#E76840] text-white text-base sm:text-lg md:text-[20px] font-semibold py-2 sm:py-3 rounded"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-emerald-600 font-bold text-center text-lg sm:text-2xl md:text-4xl my-8">
          No Product is added
        </h1>
      )}
    </>
  );
}
