// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link'; // Import the Link component
// import products from '../data/productsData.json'; // Import the static product data
// import { Heart, ShoppingCart } from 'lucide-react';

// const ProductCard = () => (
//   <>
//     {products.map((product) => (
//       <Link key={product.id} href={`/products/${product.id}`} passHref>
//         <div className="flex flex-col relative group cursor-pointer ">
//           <div className="relative mb-2">
//             <Image
//               src={product.images[0]}
//               alt={product.description}
//               width={300}
//               height={400}
//               className="w-full h-auto object-cover group-hover:scale-110 rounded-xl transition-transform duration-300"
//             />
//             {product.discount && (
//               <span className="absolute top-2 left-2 bg-white text-green-700 px-2 py-1 text-sm font-medium">
//                 {product.discount}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center mb-1">
//             <span className="text-green-600 mr-1">★</span>
//             <span className="text-sm text-gray-600">{product.rating} review</span>
//           </div>
//           <div className="absolute top-[18%] right-3 sm:right-6 transform -translate-y-1/2 flex flex-col gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100">
//             <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
//               <Heart className="text-gray-700 h-4 md:h-5" />
//             </button>
//             <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
//               <ShoppingCart className="text-gray-700 h-4 md:h-5" />
//             </button>
//           </div>
//           <h3 className="font-semibold max-h-[48px] overflow-hidden">
//             {product.description.length > 70 ? `${product.description.substring(0, 70)}...` : product.description}
//           </h3>
//           <div className="flex items-center">
//             <span className="font-bold mr-2">${product.price}</span>
//             {product.originalPrice && (
//               <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//             )}
//           </div>
//         </div>
//       </Link>
//     ))}
//   </>
// );

// const ProductCategoryGrid = () => {
//   return (
//     <div className="mx-3.5 px-4 mt-[120px] md:mt-[160px]">
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
//         <ProductCard />
//       </div>
//     </div>
//   );
// };

// export default ProductCategoryGrid;

'use client';

import React from 'react';


import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import products from '../data/productsData.json'; // Import the static product data
import { Heart, ShoppingCart } from 'lucide-react';
import MiddleNav from '../_components/MiddleNav';






const ProductCard = () => (
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
            <button className="w-[28px] h-[28px]  flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
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

const MensFashionStorePage = () => {
  

  return (
    <div className="container mx-auto mt-[60px] px-4 py-8">

<MiddleNav/>

      
      <div className="flex flex-col md:flex-col gap-8">
        <div className="flex justify-start items-center ml-4">
      <h1 className="text-3xl font-bold mb-4 mt-10">Top Wear</h1>
      </div>
      <div className="mx-5">
        <div className="mb-6 flex justify-start items-center">
       
        <div className="flex gap-8">
  <div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> Availability </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>

      <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700"> 0 Selected </span>

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
              Reset
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            <li>
              <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                <input type="checkbox" id="FilterInStock" className="size-5 rounded border-gray-300" />

                <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
              </label>
            </li>

            <li>
              <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                <input type="checkbox" id="FilterPreOrder" className="size-5 rounded border-gray-300" />

                <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
              </label>
            </li>

            <li>
              <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterOutOfStock"
                  className="size-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </details>
  </div>

  <div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> Price </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>

      <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700"> The highest price is $600 </span>

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
              Reset
            </button>
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceFrom"
                  placeholder="From"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>

              <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceTo"
                  placeholder="To"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </details>
  </div>
</div>
      </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
         
           <ProductCard />
          
         </div>
         </div>
      

    </div>
  </div>
  );
};

export default MensFashionStorePage;
