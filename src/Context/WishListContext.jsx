import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const [WishListId, setWishListId] = useState(0);
  const [NumItem2, setNumItem2] = useState(0);
  const [wishListData, setWishListData] = useState([]);

  async function addProductToWishList(productId) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      await getLoggedUserWishList(); // ✅ تحديث تلقائي بعد الإضافة
      return res;
    } catch (err) {
      return err;
    }
  }

  async function getLoggedUserWishList() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      setWishListId(res.data.data._id || 0);
      setWishListData(res.data.data || []);
      setNumItem2(res.data.count || 0);
      return res;
    } catch (err) {
      return err;
    }
  }

  async function deleteWishListItem(productId) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      await getLoggedUserWishList(); // ✅ تحديث تلقائي بعد الحذف
      return res;
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    getLoggedUserWishList();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        addProductToWishList,
        getLoggedUserWishList,
        deleteWishListItem,
        NumItem2,
        setNumItem2,
        wishListData,
        refetchWishList: getLoggedUserWishList, // ⬅️ تستخدمها في أي مكان لتحديث البيانات
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
