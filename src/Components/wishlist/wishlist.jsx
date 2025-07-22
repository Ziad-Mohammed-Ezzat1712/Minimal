import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

import { WishListContext } from "../../Context/WishListContext";


export default function Wishlist() {

  let {addProductToCart, NumItem , setNumItem} = useContext(CartContext)
  let { NumItem2 , setNumItem2} = useContext(WishListContext)

   const [Loading, setLoading] = useState(false)
    const [CurrentId, setCurrentId] = useState(0)
    async function addToCart (id) {
      setCurrentId(id)
      setLoading(true)
      let response = await addProductToCart(id)
      console.log(response.data );
    
    
      if(response.data.status == "success"){
    
        toast.success(response.data.message)
    
        setNumItem(NumItem + 1 )
    
        setLoading(false)
    
      }
      else{
    
        toast.error(response.data.message)
        setLoading(false)
    
    
      }
      
     }


  

  let {getLoggedUserWishList ,  deleteWishListItem  } = useContext(WishListContext);
  const [WishListDetails, setWishListDetails] = useState(null)

  async function getWishListItem() {
    let response= await getLoggedUserWishList();

    console.log(response.data.data);


    if(response.data.status == "success"){
      setWishListDetails(response.data.data)
       
    
  }

  }
  async function deleteItem(productId) {
  let response =   await deleteWishListItem(productId)
  console.log(response.data.data);
  // setWishListDetails(response.data.data)
  if(response.data.status == "success"){
    getWishListItem()
    (NumItem2 - 1)
  } setNumItem2
  
  }

  useEffect(()=>{
    getWishListItem()

  },[])
  return (
    <>
     {WishListDetails?.length > 0 ?<>
     <h2 className="text-center text-2xl text-emerald-600 capitalize font-bold my-4">My Wishlist</h2>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
        Action
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {WishListDetails?.map((product)=> <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
          
            <div>
            <button onClick={()=>
              addToCart(product.id)} className='btn'>Add To Cart</button>
            </div>
            
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${product.price }
        </td>
        <td className="px-6 py-4">
          <span className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=> deleteItem(product.id)}>Remove</span>
        </td>
      </tr>)}
      
  
    </tbody>
  </table>

  
</div>
</>: <h1 className="text-emerald-600 font-bold text-center text-4xl my-8 ">No Product is added</h1> }
    </>
    
  );
}
