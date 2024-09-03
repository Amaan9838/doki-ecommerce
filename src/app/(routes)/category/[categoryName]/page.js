import React from 'react'
import GlobalApi from '../../../_utils/GlobalApi';
import {generateSlug} from '../../../_utils/slug';
import { Heart, ShoppingCart } from 'lucide-react';
import MiddleNav from '../../../_components/MiddleNav';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProductCategory({params}) {
  const productList=await GlobalApi.getProductByCategory(params.categoryName);
  const categoryList=await GlobalApi.getCategoryList();
  // const reviews = product.attributes.reviews.data;
  // const totalRating = reviews.reduce((sum, review) => sum + review.attributes.ratingValue, 0);

  // const [averageRating, setAverageRating] = useState(reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0);
 
  // console.log("this is product list", productList);
  return (
    <>
 
    <div className="container mx-auto mt-[60px] px-4 py-8">
  
  <MiddleNav categoryList={categoryList}/>
  
        
        <div className="flex flex-col md:flex-col gap-8">
          <div className="flex justify-start items-center ml-4">
        <h1 className="text-3xl font-bold mb-4 mt-10">{decodeURIComponent(params.categoryName)}</h1>
        </div>
        <div className="mx-5">
          <div className="mb-6 flex justify-start items-center">
         
          <div className="flex gap-8">
    

  </div>
        </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            <>
    {productList.map((product) => (
        // <h1>{product.attributes.title}</h1>
      <Link key={product.id} className='cursor-pointer' href={`/products/${product.id}/${generateSlug(product.attributes.title)}`} passHref>
        <div className="flex flex-col relative group cursor-pointer ">
          <div className="relative mb-2">
            <Image
              src={product?.attributes?.images?.data[0]?.attributes?.url} 
              alt={product.attributes.title}
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
            <span className="text-sm text-gray-600">{product.reviews.data[0].attributes.ratingValue} review</span>
          </div>
          <div className="absolute top-[12%] right-3 sm:right-6 transform -translate-y-1/2 flex flex-col gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100">
            <button className="w-[28px] h-[28px]  flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
              <Heart className=" h-4 md:h-5 text-gray-400" />
            </button>
            <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
              <ShoppingCart className="text-gray-700 h-4 md:h-5" />
            </button>
          </div>
          <h3 className="font-semibold max-h-[48px] overflow-hidden">
            {product.attributes.description.length > 70 ? `${product.attributes.description.substring(0, 70)}...` : product.description}
          </h3>
          <div className="flex items-center">
            {product.attributes.discount !== null ? (
              <>
            <span className="font-bold mr-2">${(product?.attributes?.price * (1 - product?.attributes?.discount / 100)).toFixed(2)}</span>

              <span className="text-sm text-gray-500 line-through">${product.attributes.price}</span>
              </>
            ): (            <span className="font-bold mr-2">${product.attributes.price}</span>
            )}
          </div>
        </div>
      </Link>
    ))}
  </>
            
           </div>
           </div>
        
  
      </div>
    </div>
  
    </>
)};

