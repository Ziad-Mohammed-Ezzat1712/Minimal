import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import zigzag from "../../assets/zigzag.svg";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { CartDetails, checkout, CartId } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    details: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleCheckout = async () => {
    if (!CartDetails) return;
    setLoading(true);
    try {
      const res = await checkout(CartId, window.location.origin, formData);
      if (res?.data?.status === "success") {
        const orderInfo = {
          orderNumber: res.data.orderId || res.data.order?.id,
          date: new Date().toISOString().slice(0, 10),
          email: formData.email || "",
          total: CartDetails.totalCartPrice + 60,
          paymentMethod: "Cash on delivery",
          products: CartDetails.products,
        };
        navigate("/ordersuccess", { state: orderInfo });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Steps Header */}
      <div className="bg-[#9BC2AF] w-full mb-5 flex justify-center p-4 sm:p-6 gap-4 sm:gap-6 flex-wrap text-center">
        <span className="text-xl sm:text-3xl lg:text-[40px] font-bold text-[#606160]">
          Shopping Cart <i className="fa fa-arrow-right"></i>
        </span>
        <span className="text-xl sm:text-3xl lg:text-[40px] font-bold text-black">
          Checkout <i className="fa fa-arrow-right"></i>
        </span>
        <span className="text-xl sm:text-3xl lg:text-[40px] font-bold text-[#606160]">
          Order Complete
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 p-4 sm:p-6">
        {/* Left - Billing Address */}
        <div className="flex-1 space-y-4 sm:space-y-6 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] text-left font-bold">
            Billing Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="First name *"
              className="border p-3 h-[50px] sm:h-[60px] lg:h-[80px] rounded"
            />
            <input
              type="text"
              placeholder="Last name *"
              className="border p-3 h-[50px] sm:h-[60px] lg:h-[80px] rounded"
            />
          </div>

          <div>
            <label className="block text-left text-lg sm:text-xl lg:text-[25px] mb-1">
              Country / Region *
            </label>
            <div className="p-3 text-[#606160] text-left text-base sm:text-lg lg:text-[20px] rounded">
              Egypt
            </div>
          </div>

          <label className="block text-left text-lg sm:text-xl lg:text-[25px] mb-1">
            State / County *
          </label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            placeholder="State / County *"
            className="border h-[50px] sm:h-[60px] lg:h-[80px] p-3 rounded w-full"
          />

          <label className="block text-left text-lg sm:text-xl lg:text-[25px] mb-1">
            Area *
          </label>
          <input
            type="text"
            placeholder="Area *"
            className="border p-3 rounded w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          />

          <label className="block text-left text-lg sm:text-xl lg:text-[25px] mb-1">
            Street address *
          </label>
          <input
            type="text"
            name="details"
            onChange={handleChange}
            placeholder="House number and street name"
            className="border p-3 rounded w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          />
          <input
            type="text"
            name="details"
            onChange={handleChange}
            placeholder="Apartment, suite, unit, etc (optional)"
            className="border p-3 rounded w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          />

          <label className="block text-left text-lg sm:text-xl lg:text-[25px] mb-1">
            Phone *
          </label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="Phone *"
            className="border p-3 rounded w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          />

          <label className="block text-left text-lg sm:text-xl lg:text-[25px] mb-1">
            Email address *
          </label>
          <input
            type="email"
            placeholder="Careman@gmail.com"
            className="border p-3 rounded w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          />

          <h3 className="text-2xl sm:text-3xl lg:text-[40px] text-left font-semibold mt-6">
            Additional Information
          </h3>
          <label className="block text-left text-lg sm:text-xl lg:text-[25px] mb-1">
            Order notes (optional)
          </label>
          <textarea className="border p-3 rounded w-full h-32 sm:h-40 lg:h-48"></textarea>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full lg:w-1/3 bg-[#9BC2AF] rounded shadow overflow-hidden">
          {/* Zigzag Header */}
          <img src={zigzag} alt="zigzag" className="w-full h-[30px] sm:h-[40px] lg:h-[50px]" />

          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 border-b pb-2">
              Your Order
            </h3>

            <div className="bg-white rounded p-4 mb-6 shadow">
              <div className="flex justify-between text-lg sm:text-xl lg:text-[30px] font-bold border-b pb-2">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {CartDetails?.products.map((prod, i) => (
                <div key={i} className="flex flex-col text-sm sm:text-base lg:text-[20px] gap-2 py-2">
                  <span>
                    {prod.product.title}, x{prod.count}
                  </span>
                  <span className="text-[#E76840] text-base sm:text-lg lg:text-[25px] font-medium">
                    {prod.price * prod.count} EGP
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-lg sm:text-xl lg:text-[30px] font-semibold border-t pt-2 mt-2">
                <span>Subtotal</span>
                <span className="text-[#E76840] text-base sm:text-lg lg:text-[25px] font-medium">
                  {CartDetails?.totalCartPrice} EGP
                </span>
              </div>
              <div className="flex justify-between text-lg sm:text-xl lg:text-[30px] mt-1">
                <span className="text-gray-600">Shipping</span>
                <span className="text-[#E76840] text-base sm:text-lg lg:text-[25px] font-medium">
                  Flat rate: 60.00 EGP
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg sm:text-xl lg:text-[30px] mt-2 border-t pt-2">
                <span>Total</span>
                <span className="text-[#E76840] text-base sm:text-lg lg:text-[25px] font-medium">
                  {CartDetails?.totalCartPrice + 60} EGP
                </span>
              </div>
            </div>

            <h4 className="text-lg sm:text-xl lg:text-[30px] text-left font-semibold mb-2">
              Cash on delivery
            </h4>
            <div className="p-3 rounded mb-4 text-left border border-black text-sm sm:text-base lg:text-[20px]">
              Pay with cash upon delivery.
            </div>

            <p className="text-sm sm:text-base lg:text-[20px] text-left text-gray-800 mb-4">
              Your personal data will be used to process your order, support your
              experience throughout this website, and for other purposes described in our privacy policy.
            </p>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#E76840] text-white py-2 sm:py-3 rounded text-base sm:text-lg font-bold hover:bg-orange-600 transition"
            >
              {loading ? "Processing..." : "Place order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
