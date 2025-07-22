import axios, { Axios } from "axios";
import { createContext, useState, useEffect } from "react";


export let BrandContext=createContext();

export default function BrandContextProvider(props){


     const [Brands, setBrands] = useState([])
function AllBrands(params) {
   axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=> {
         console.log(res);
         setBrands(res.data.data)
    })
    .catch((err)=> err)
  
   
}



    return <BrandContext.Provider  value={{AllBrands,Brands,setBrands}}>

        {props.children}
    </BrandContext.Provider>
}