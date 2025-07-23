import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Allorders() {
  const [orders, setOrders] = useState([]);

  async function getOrders() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/orders");
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p>Loading orders...</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="mb-6 p-4 border rounded-md shadow-md bg-white"
          >
            <h2 className="font-semibold mb-2 text-lg text-blue-800">
              Order ID: {order._id}
            </h2>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Total Price: ${order.totalOrderPrice}</p>
            <p>Payment Method: {order.paymentMethodType}</p>
            <p>
              Delivered:{" "}
              {order.isDelivered ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </p>
            <p>
              Paid:{" "}
              {order.isPaid ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </p>

            {/* Products */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-blue-700">Products:</h3>
              <ul>
                {order.cartItems?.map((item, index) => (
                  <li
                    key={item.product?._id || index}
                    className="mb-2 flex items-center gap-4"
                  >
                    <img
                      src={item.product?.imageCover}
                      alt={item.product?.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p>{item.product?.title}</p>
                      <p>
                        Quantity: {item.count} × Price: ${item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Address */}
            <div className="mt-4">
              <h3 className="font-semibold text-blue-700">Shipping Address:</h3>
              <p>City: {order.shippingAddress?.city || "N/A"}</p>
              <p>Details: {order.shippingAddress?.details || "N/A"}</p>
              <p>Phone: {order.shippingAddress?.phone || "N/A"}</p>
            </div>

            {/* User Info */}
            <div className="mt-4">
              <h3 className="font-semibold text-blue-700">User Info:</h3>
              <p>Name: {order.user?.name || "N/A"}</p>
              <p>Email: {order.user?.email || "N/A"}</p>
              <p>Phone: {order.user?.phone || "N/A"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
