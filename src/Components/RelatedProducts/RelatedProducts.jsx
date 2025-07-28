import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatedProducts({ relatedProduct, addToCart, toggleWishList, isInWishList, CurrentId, CurrentId2, Loading }) {
  
  
  
  return (
    <div className="flex flex-wrap p-2 items-center justify-center">
      {relatedProduct.length > 0 ? relatedProduct.map((product) => (
        <div key={product.id} className='px-4 w-1/2 md:w-1/3 lg:w-1/4'>
          <div className="product p-2 my-2 text-start border rounded shadow hover:shadow-lg transition">
            <Link to={`/productdetalis/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} alt={product.title} className='w-full rounded' />
              <h3 className='font-semibold text-xl mb-1'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <h3 className='text-[#9BC2AF] text-lg mt-2'>{product.category.name}</h3>

              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">({product.ratingsAverage})</span>
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating = product.ratingsAverage;
                    if (rating >= index + 1) {
                      return <i key={index} className="fas fa-star text-yellow-500 text-sm"></i>;
                    } else if (rating >= index + 0.5) {
                      return <i key={index} className="fas fa-star-half-alt text-yellow-500 text-sm"></i>;
                    } else {
                      return <i key={index} className="far fa-star text-yellow-500 text-sm"></i>;
                    }
                  })}
                </span>
              </div>
            </Link>

            <div className='flex justify-between'>
              <button onClick={() => addToCart(product.id)} className='btn px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition'>
                {Loading && CurrentId === product.id
                  ? <i className='fas fa-spinner fa-spin'></i>
                  : "Add To Cart"}
              </button>
              <button
                onClick={() => toggleWishList(product.id)}
                className='px-2'
                disabled={Loading && CurrentId2 === product.id}
                style={{ fontSize: "1.6rem" }}
                aria-label={isInWishList(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {Loading && CurrentId2 === product.id ? (
                  <i className='fas fa-spinner fa-spin'></i>
                ) : isInWishList(product.id) ? (
                  <i className="fas fa-heart" style={{ color: " #E76840" }}></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      )) : (
        <div className="sk-circle mx-auto">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`sk-circle${i + 1} sk-child`}></div>
          ))}
        </div>
      )}
    </div>
  );
}
