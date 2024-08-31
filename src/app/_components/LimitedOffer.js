'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useIsMobile from './useIsMobile'; // Import the custom hook
import GlobalApi from '../_utils/GlobalApi.jsx';
import Loader from './Loader';

export default function LimitedOffer() {

  // Animation variants for fade-in-left effect
  const isMobile = useIsMobile(); // Check if the viewport is mobile

  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    GlobalApi.getHeroSections().then(resp => {
      const filteredData = resp.data.data.filter(item => item.attributes.section === 4);
      console.log("Filtered CategoryList Resp:", filteredData);
      setHero(filteredData);
      setLoading(false);
    });
  }

  if (loading) {
    return  <div className="flex justify-center items-center h-[400px]">
   <Loader/>
  </div>;
  }
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: 100 },
    
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  };
  const fadeIn = {
    hidden: { opacity: 0},
    visible: {
      opacity: 1,
      
      transition: { type: 'spring', stiffness: 30, damping: 20, delay: 0.2 }
    }
  };
  

  return (
    <section className="bg-[#e7e5e5] flex flex-col md:flex-row items-center justify-center px-4 md:px-24 md:mt-24 mt-16 md:mx-8 rounded-3xl">
     {hero.length > 0 && (
      <>
      <div className="md:w-1/2 flex justify-center md:justify-start">
        <Image 
          src={ hero[0]?.attributes?.image?.data[0]?.attributes?.url}
          alt={hero[0]?.attributes?.title || "Fashion Promo"} 
          width={400}
          height={300}
          className="rounded-lg max-w-full h-auto"
        />
      </div>
      
      {/* Animated text section */}
      <motion.div 
        className="md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:ml-16 py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={isMobile ? fadeInLeft : fadeIn}
      >
        <h2 className="text-gray-600 font-semibold uppercase text-sm mb-2">Limited Time Offer</h2>
        <h1 className="text-gray-800 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
        {hero[0]?.attributes?.title}
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          { hero[0]?.attributes?.description || "Hurry, before it's too late! Grab your favorites now and elevate your style with our exclusive men's collection."}
        </p>
        <a 
          href="/shop" 
          className="bg-[#343434] text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-black transition duration-300"
        >
          Shop Now →
        </a>
      </motion.div>
      </>
     )}
    </section>
  );
}