import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export let UserContext = createContext();

export default function UserContextProvider(props){


const [userLogin, setuserLogin] = useState(localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null )



 function ResetPassword(formData) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,formData)
    .then((res)=> res)
    .catch((err) => err)
 
    
}


    return (

          <UserContext.Provider value={{userLogin,setuserLogin,ResetPassword, }}>
              {props.children}
          </UserContext.Provider>

    )
}