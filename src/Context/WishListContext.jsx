import axios from "axios";
import { createContext, useState, useEffect } from "react";


export let WishListContext=createContext();

export default function WishListContextProvider(props){


    let headers ={

        token : localStorage.getItem("userToken")

    }

    const [WishListId, setWishListId] = useState(0)
    const [NumItem2, setNumItem2] = useState(0)

function addProductToWishList(productId){

    return axios.post(`https://ecommerce.routemisr.com/api/v1/WishList`,{
        productId:productId
    },{

        headers
        
    })
    .then((res)=> res)
    .catch((err) => err)
}

function getLoggedUserWishList(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/WishList
`,{

        headers
        
    })
    .then((res)=> { 

setWishListId(res.data.data._id)

        return res
        
    })
    .catch((err) => err)
}


function deleteWishListItem(productId){

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
{headers})
    .then((res)=> res)
    .catch((err) => err)
}



useEffect(() => {
  getLoggedUserWishList()
}, [])




    return <WishListContext.Provider  value={{addProductToWishList , getLoggedUserWishList,deleteWishListItem, setNumItem2 ,NumItem2}}>

        {props.children}
    </WishListContext.Provider>
}