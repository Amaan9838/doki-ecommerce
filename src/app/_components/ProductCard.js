
import React,{useContext} from 'react';
import { WishlistContext } from '../contexts/WishlistContext';
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import products from '../data/productsData.json'; // Import the static product data
import { Heart, ShoppingCart } from 'lucide-react';

export default function ProductCard ({ product }) {
    const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  
    const handleClick = () => {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    };
    return(
    <>
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} passHref>
          <div className="flex flex-col relative group cursor-pointer ">
            <div className="relative mb-2">
              <Image
                src={product.images[0]}
                alt={product.description}
                width={300}
                height={400}
                className="w-full h-auto object-cover rounded-xl transition-transform duration-300"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-white text-green-700 px-2 py-1 text-sm font-medium">
                  {product.discount}
                </span>
              )}
            </div>
            <div className="flex items-center mb-1">
              <span className="text-green-600 mr-1">★</span>
              <span className="text-sm text-gray-600">{product.rating} review</span>
            </div>
            <div className="absolute top-[12%] right-3 sm:right-6 transform -translate-y-1/2 flex flex-col gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100">
              <button onClick={handleClick} className={`w-[28px] h-[28px]  flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md transition-colors ${
          isWishlisted ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
        }`}>
                <Heart className=" h-4 md:h-5 text-red-400" />
              </button>
              <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
                <ShoppingCart className="text-gray-700 h-4 md:h-5" />
              </button>
            </div>
            <h3 className="font-semibold max-h-[48px] overflow-hidden">
              {product.description.length > 70 ? `${product.description.substring(0, 70)}...` : product.description}
            </h3>
            <div className="flex items-center">
              <span className="font-bold mr-2">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
    );
  };
  