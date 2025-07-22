// eslint-disable-next-line no-unused-vars
import React, { useContext,useState, useEffect } from 'react'
import { BrandContext } from '../../Context/BrandContext'
import { Link } from 'react-router-dom'


export default function Brands() {
  
 const [Loading, setLoading] = useState(false)
  let {AllBrands,Brands,setBrands} = useContext(BrandContext)
 
 async function getAllBrands() {
    await AllBrands()
  }

  useEffect(() => {
getAllBrands()
  }, [])
  
  return (
    <>
    <div className="row">
    { Brands.length >0 ?  Brands.map((product)=> <div key={product.id} className='w-1/6 '>
    <div  className="product p-2 my-2 text-start">
     <img src={product.image} className='w-full' alt="" />
     
   </div>
    </div>) :<> <div className="sk-circle">
  <div className="sk-circle1 sk-child"></div>
  <div className="sk-circle2 sk-child"></div>
  <div className="sk-circle3 sk-child"></div>
  <div className="sk-circle4 sk-child"></div>
  <div className="sk-circle5 sk-child"></div>
  <div className="sk-circle6 sk-child"></div>
  <div className="sk-circle7 sk-child"></div>
  <div className="sk-circle8 sk-child"></div>
  <div className="sk-circle9 sk-child"></div>
  <div className="sk-circle10 sk-child"></div>
  <div className="sk-circle11 sk-child"></div>
  <div className="sk-circle12 sk-child"></div>
</div> </> }

    
    </div> 
    </>
  )
}
