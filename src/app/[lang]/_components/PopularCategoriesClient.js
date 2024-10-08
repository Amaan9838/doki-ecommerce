'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from './useIsMobile'; // Import the custom hook
import { Ubuntu } from "next/font/google";
import GlobalApi from '../_utils/GlobalApi.jsx';
import Loader from './Loader';


const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300","400",'500',"700"], variable: '--font-ubuntu' });

const PopularCategoriesClient = ({dict, lang}) => {
  const isMobile = useIsMobile(); // Check if the viewport is mobile

  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
 

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    GlobalApi.getHeroSections(lang).then(resp => {
      const filteredData = resp.data.data.filter(item => item.attributes.section === 3);
    //   console.log("Filtered CategoryList Resp:", lang);
      setHero(filteredData);
      setLoading(false);
    });
  }

  // Animation variants
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 30, damping: 20, delay: 0.2 }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 30, damping: 20, delay: 0.2 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 30, damping: 20, delay: 0.2 }
    }
  };
  if (loading) {
    return  <div className="flex justify-center items-center h-[400px]">
   <Loader/>
  </div>;
  }

  return (
    <div className="container mx-auto py-8 px-0.5 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: Big patterns are back in fashion */}
        {hero.length > 0 && dict && (
          <>
            <motion.div
              className="relative max-w-full h-[400px] lg:h-[auto] shadow-2xl rounded-3xl"
              initial={isMobile ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={isMobile ? fadeInLeft : fadeIn}
            >
              <img 
                src={hero[0]?.attributes?.image?.data[0]?.attributes?.url} 
                alt={hero[0]?.attributes?.title || "Big patterns are back in fashion"} 
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 p-8 flex flex-col md:justify-start justify-center md:max-w-[400px] max-w-[300px] select-none">
                <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                    {dict.new_season}
                    {/* New Season */}
                </p>
                <h3 className={`${ubuntu.variable} font-sans text-4xl font-bold text-gray-900 mb-4`}>{hero[0]?.attributes?.title || "Big patterns are back in fashion"}</h3>
                <p className="text-gray-600 mb-6 max-w-[450px]">{hero[0]?.attributes?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."}</p>
                <a href="/categories" className="text-gray-700 font-semibold flex items-center mt-10">
                  {dict.shop_now}
                  {/* Shop Now */}
                  <span className="ml-2">→</span>
                </a>
              </div>
            </motion.div>

            {/* Right Section: Two stacked cards */}
            <motion.div
              className="flex flex-col gap-6"
              initial={isMobile ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={isMobile ? fadeInRight : fadeIn}
            >
              {hero.slice(1).map((item, index) => (
                <div key={index} className="relative h-[335px] shadow-2xl rounded-3xl">
                  <img 
                    src={item?.attributes?.image?.data[0]?.attributes?.url} 
                    alt={item.attributes.title} 
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 p-8 flex flex-col md:justify-start justify-center max-w-[300px] select-none">
                    <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                        {dict.new_season}
                        {/* New Season */}
                        </p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.attributes.title}</h3>
                    <p className="text-gray-600 mb-6">{item.attributes.description}</p>
                    <a href="#" className="text-gray-700 font-semibold flex items-center">
                    {dict.shop_now}
                    {/* Shop Now */}
                     <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularCategoriesClient;
