import React from "react";
import { useLocation, Link } from "react-router-dom";
import { format } from "date-fns";

export default function OrderSuccess() {
  const { state } = useLocation();
  const { orderNumber, date, email, total, paymentMethod, products } = state || {};

  return (
    <>

      {/* Steps Header */}
      <div className="bg-[#9BC2AF] w-full mb-5 flex justify-center p-6 gap-6 flex-wrap text-center">
        <span className="text-[40px] font-bold text-[#606160]">
          Shopping Cart <i className="fa fa-arrow-right"></i>
        </span>
        <span className="text-[40px] font-bold text-[#606160]">
          Checkout <i className="fa fa-arrow-right"></i>
        </span>
        <span className="text-[40px] font-bold  text-black ">
          Order Complete
        </span>
      </div>

    <div className="max-w-7xl mx-auto p-6">
      <div className="border border-dashed border-[#E76840] rounded p-6 mb-6">
        <h2 className="text-[40px] font-bold text-[#E76840]">
          Thank you. Your order has been received.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-2 text-[30px] mb-8">
        <div className=" border-r-2">
          <span className="font-semibold flex justify-center text-[#606160]">Order number:</span> {orderNumber}
        </div >
        <div className=" border-r-2">
          <span className=" font-semibold flex justify-center text-[#606160] ">Date:</span>{" "}
          {format(new Date(date), "yyyy‑MM‑dd")}
        </div>
        <div className=" border-r-2">
          <span className="font-semibold flex justify-center text-[#606160]">Email:</span> {email}
        </div>
        <div className=" border-r-2">
          <span className="font-semibold flex justify-center text-[#606160]">Total:</span> {total} EGP
        </div>
        <div >
          <span className="font-semibold flex justify-center text-[#606160]">Payment method:</span> {paymentMethod}
        </div>
       
      </div>
 <div className="text-left mb-20">
  <span className=" text-[30px] text-[#606160]">Pay with cash upon delivery.

</span>
 </div>
      <h3 className="text-[40px] text-left font-bold mb-4">Order details</h3>
      <div className="border rounded shadow-md mb-24">
        <div className="flex text-[30px] justify-between border-b p-3 font-semibold">
          <span>Product</span>
          <span>Total</span>
        </div>
        {products.map((prod, i) => (
          <div key={i} className="flex flex-col text-[20px] gap-3 py-2">
            <span>
              {prod.product.title}, Number of pacis: {prod.count}
            </span>
            <span className="text-[#E76840]">
              {prod.price * prod.count} EGP
            </span>
          </div>
        ))}
        <div className="flex justify-between border-t p-3 font-semibold">
          <span className="text-[30px] font-medium">Subtotal</span>
          <span className="text-[25px] text-[#E76840]">{products.reduce((acc, p) => acc + p.price * p.count, 0)} EGP</span>
        </div>
        <div className="flex justify-between p-3">
          <span className="text-[30px] font-medium">Shipping</span>
          <span className="text-[25px] text-[#E76840]">Flat rate: 60.00 EGP</span>
        </div>
        <div className="flex justify-between border-t p-3 font-bold">
          <span className="text-[30px] font-medium">Total</span>
          <span className="text-[25px] text-[#E76840]">{total} EGP</span>
        </div>
      </div>

    
    </div>
    </>
  );
}
