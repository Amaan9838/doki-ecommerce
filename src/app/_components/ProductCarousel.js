// 'use client';
// import React, { useRef, useState, useEffect } from "react";
// import Slider from "react-slick";
// import Link from "next/link";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
// import products from '../data/productsData.json'; // Import the static product data
// import GlobalApi from '../_utils/GlobalApi.jsx';


// const ProductCarousel = ({denimJean}) => {
//   const sliderRef = useRef(null);

//   // const [productList, setProductList] = useState([]);
//   // useEffect( ()=>{
//   //   getProductList( ) ;
//   // },[]) 
  
//   //   const getProductList = ()=>{
//   //   GlobalApi.getProducts().then(resp=>{
//   //   console. log("CategoryList Resp:", resp.data.data);
//   //   setProductList(resp.data.data);
//   //   });
//   // }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//         }
//       }
//     ],
//     appendDots: dots => (
//       <div style={{ bottom: '-30px' }}>
//         <ul style={{ margin: "0px" }}> {dots} </ul>
//       </div>
//     )
//   };

//   return (
//     <div className="relative product-carousel">
      
//       <Slider {...settings} ref={sliderRef}>
//         {products.map((product) => (
//           <div key={product.id} className="product-card relative group px-2">
//             <Link href={`/products/${product.id}`}>
//               <div className="relative w-full md:h-[28rem] h-[16rem] overflow-hidden">
//                 <img
//                   src={product.images[0]}
//                   alt={product.description}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded"
//                 />
//                 <div className="absolute top-2 left-4 sm:left-6 bg-white text-green-700 opacity-85 font-medium text-xs px-2 py-1 rounded">
//                   {product.discount}
//                 </div>
//                 <div className="absolute md:top-[14%] top-[18%] right-3 sm:right-6 transform -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
//                   <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
//                     <Heart className="text-gray-700 h-4 md:h-5" />
//                   </button>
//                   <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
//                     <ShoppingCart className="text-gray-700 h-4 md:h-5" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold max-h-[48px] overflow-hidden">
//                   {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
//                 </h3>
//                 <div className="flex flex-row gap-4 items-center">
//                   {product.originalPrice && (
//                     <p className="line-through text-gray-500">{product.originalPrice}</p>
//                   )}
//                   <p className="text-lg font-bold text-black">{product.price}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}

// {/* {productList.map((product, index) => (
//           <div key={product.id} className="product-card relative group px-2">
//             <Link href={`/products/${product.id}`}>
//               <div className="relative w-full md:h-[28rem] h-[16rem] overflow-hidden">
//                 <img
//                   src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
//                     product?.attributes?.images?.data[0]?.attributes?.url}
//                   alt={product.attributes.title}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded"
//                 />
//                 <div className="absolute top-2 left-4 sm:left-6 bg-white text-green-700 opacity-85 font-medium text-xs px-2 py-1 rounded">
//                   {product.attributes.discount}%
//                 </div>
//                 <div className="absolute md:top-[14%] top-[18%] right-3 sm:right-6 transform -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
//                   <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
//                     <Heart className="text-gray-700 h-4 md:h-5" />
//                   </button>
//                   <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
//                     <ShoppingCart className="text-gray-700 h-4 md:h-5" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold max-h-[48px] overflow-hidden">
//                   {product.attributes.title.length > 30 ? `${product.attributes.title.substring(0, 30)}...` : product.attributes.title}
//                 </h3>
//                 <div className="flex flex-row gap-4 items-center">
//                   {product.attributes.price && (
//                     <p className="line-through text-gray-500">{product.attributes.price}</p>
//                   )}
//                   <p className="text-lg font-bold text-black">{product.attributes.price}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))} */}
//       </Slider>
//       <button
//         onClick={() => sliderRef.current.slickPrev()}
//         className="md:flex hidden absolute top-1/3 -left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
//       >
//         <ChevronLeft />
//       </button>
//       <button
//         onClick={() => sliderRef.current.slickNext()}
//         className="md:flex hidden absolute top-1/3 -right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
//       >
//         <ChevronRight />
//       </button>
//     </div>
//   );
// };

// export default ProductCarousel;

'use client';
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import products from '../data/productsData.json';
import { motion, inView } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductCard = ({ product, index }) => {
  // const [ref, inView] = useInView({
  //   triggerOnce: false,
  //   threshold: 0.25,
  // });

  const variants = {
    hidden: { opacity: 0, y: index % 1 === 0 ? 150 : -150 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 17,
        delay: index * 0.1
      }
    },
  };

  return (
    <motion.div
      initial="hidden"
     whileInView="visible"
      variants={variants}
      viewport={{ once: false, amount: 0.25 }}

      transition={{ duration: 0.3, ease: 'easeIn' }}
      className="product-card relative group px-2"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full md:h-[28rem] h-[16rem] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.description}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded"
          />
          <div className="absolute top-2 left-4 sm:left-6 bg-white text-green-700 opacity-85 font-medium text-xs px-2 py-1 rounded">
            {product.discount}
          </div>
          <div className="absolute md:top-[14%] top-[18%] right-3 sm:right-6 transform -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
            <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
              <Heart className="text-gray-700 h-4 md:h-5" />
            </button>
            <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
              <ShoppingCart className="text-gray-700 h-4 md:h-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold max-h-[48px] overflow-hidden">
            {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
          </h3>
          <div className="flex flex-row gap-4 items-center">
            {product.originalPrice && (
              <p className="line-through text-gray-500">{product.originalPrice}</p>
            )}
            <p className="text-lg font-bold text-black">{product.price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductCarousel = () => {
  const sliderRef = useRef(null);
  const [productList, setProductList] = useState(products);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    appendDots: dots => (
      <div style={{ bottom: '-30px' }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    )
  };

  return (
    <div className="relative product-carousel">
      <Slider {...settings} ref={sliderRef}>
        {productList.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </Slider>
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="md:flex hidden absolute top-1/3 -left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="md:flex hidden absolute top-1/3 -right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ProductCarousel;