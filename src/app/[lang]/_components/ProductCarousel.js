'use client';
import React, { useRef, useContext } from "react";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { WishlistContext } from '../contexts/WishlistContext';
import { generateSlug } from '../_utils/slug';



const ProductCard = ({ product, index }) => {
 

  // const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  // const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

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
      <a href={`/products/${product.id}/${generateSlug(product?.attributes?.title)}`}>
        <div className="relative w-full md:h-[28rem] h-[16rem] overflow-hidden">
          <img
            src={product?.attributes?.images?.data[0]?.attributes?.url}
            alt={product.attributes.description}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded"
          />
          {product.attributes.discount && (
          <div className="absolute top-2 left-4 sm:left-6 bg-white text-green-700 opacity-85 font-medium text-xs px-2 py-1 rounded">
            {(product.attributes.discount)}%
          </div>) }
          <div className="absolute md:top-[14%] top-[18%] right-3 sm:right-6 transform -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
            <button onClick={''} className={`w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md transition-colors `}>
             {/* ${
        isWishlisted ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
      } */}
              <Heart className="text-gray-700 h-4 md:h-5" />
            </button>
            <button className="w-[28px] h-[28px] flex items-center justify-center md:w-[40px] md:h-[40px] bg-white rounded-full shadow-md">
              <ShoppingCart className="text-gray-700 h-4 md:h-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold max-h-[48px] overflow-hidden">
            {product.attributes.title.length > 30 ? `${product.attributes.title.substring(0, 30)}...` : product.attributes.title}
          </h3>
          <div className="flex flex-row gap-4 items-center">
          {product.attributes.discount ? (
      <>
        <p className="line-through text-gray-500">
          ${product.attributes.price.toFixed(2)}
        </p>
        <p className="text-lg font-bold text-black">
          ${(product.attributes.price * (1 - product.attributes.discount / 100)).toFixed(2)}
        </p>
        <p className="text-sm text-green-600">
          ({product.attributes.discount}% off)
        </p>
      </>
    ) : (
      <p className="text-lg font-bold text-black">
        ${product.attributes.price.toFixed(2)}
      </p>
    )}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const ProductCarousel = (productList) => {
  const sliderRef = useRef(null);
  
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
        {productList.productList.slice(0,8).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </Slider>
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="md:flex hidden absolute top-[40%] -left-2 transform -translate-y-1/2  p-2 "
      >
        <ChevronLeft className="sm:w-16 sm:h-24 text-[#411b0fa7] hover:text-gray-900"/>
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="md:flex hidden absolute top-[40%] -right-2 transform -translate-y-1/2  p-2"
      >
        <ChevronRight className="sm:w-16 sm:h-24 text-[#411b0fa7] hover:text-gray-900"/>
      </button>
    </div>
  );
};

export default ProductCarousel;