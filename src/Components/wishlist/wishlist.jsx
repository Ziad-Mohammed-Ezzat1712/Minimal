import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import ReacentProduct from "../ReacentProduct/ReacentProduct";

export default function Wishlist() {
  const { addProductToCart, NumItem, setNumItem } = useContext(CartContext);
  const {
    deleteWishListItem,
    NumItem2,
    setNumItem2,
    wishListData,
  } = useContext(WishListContext);

  const [CurrentId, setCurrentId] = useState(0);
  const [Loading, setLoading] = useState(false);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    const response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      setNumItem(NumItem + 1);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  async function deleteItem(productId) {
    setLoading(true);
    const response = await deleteWishListItem(productId);
    if (response.data.status === "success") {
      toast.success("Item removed from wishlist");
      setNumItem2(NumItem2 - 1);
    } else {
      toast.error("Failed to remove item");
    }
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-center text-[40px] text-[#606160] capitalize font-bold my-6">
        My Wishlist
      </h2>

      {Loading && (
        <div className="flex justify-center items-center min-h-[150px]">
          <i className="fas fa-spinner fa-spin text-[#9BC2AF] text-5xl"></i>
        </div>
      )}

      {!Loading && wishListData?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 mb-20">
          {wishListData.map((product) => (
            <div
              key={product.id}
              className="border rounded shadow hover:shadow-lg p-4 transition bg-white"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-64 object-contain rounded mb-4"
              />
             <h3 className="text-[24px] text-left font-semibold mb-1">
  {product.title.split(" ").slice(0, 2).join(" ")}
</h3>

              <h4 className="text-[#9BC2AF] text-left mb-2 text-[18px]">
                {product.category.name}
              </h4>
              <p className="text-[#E76840] text-left font-medium text-[20px] mb-2">
                {product.price} EGP
              </p>

              <div className="flex justify-between items-center text-gray-600 text-[18px] mb-4">
                <span>({product.ratingsAverage})</span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating = product.ratingsAverage;
                    if (rating >= index + 1) {
                      return (
                        <i
                          key={index}
                          className="fas fa-star text-yellow-500"
                        ></i>
                      );
                    } else if (rating >= index + 0.5) {
                      return (
                        <i
                          key={index}
                          className="fas fa-star-half-alt text-yellow-500"
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={index}
                          className="far fa-star text-yellow-500"
                        ></i>
                      );
                    }
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-[#9BC2AF] text-white px-4 py-2 font-semibold rounded-lg hover:bg-[#E76840] transition"
                >
                  {Loading && CurrentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
                <button
                  onClick={() => deleteItem(product.id)}
                  className="bg-[#bc0c0c] text-white px-4 py-2 font-semibold rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !Loading && (
        <div className="text-center mb-24 p-4">
          <i className="fa-regular fa-heart text-[200px] text-[#E76840]"></i>
          <h1 className="text-black font-bold text-3xl my-6">
            This wishlist is empty.
          </h1>
          <p className="text-lg text-[#606160] font-semibold max-w-xl mx-auto mb-6">
            You don't have any products in the wishlist yet. You will find a lot
            of interesting products on our "Shop" page.
          </p>
          <Link to="/">
            <button className="bg-[#9BC2AF] px-10 py-2 text-lg rounded-xl text-white font-semibold">
              Return to Shop Page
            </button>
          </Link>
        </div>
      )}

      <div className="flex justify-between ">
        <h1 className="pl-8 text-left text-[40px] font-bold text-[#606160]">
          Related Products
        </h1>
        <Link to={"/"}>
          <button className="border p-4 rounded-xl text-[20px] font-semibold text-[#9BC2AF] hover:bg-[#E76840] hover:text-white">
            See More
          </button>
        </Link>
      </div>
      <ReacentProduct limit={8} />
    </>
  );
}
