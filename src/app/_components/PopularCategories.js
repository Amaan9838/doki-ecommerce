'use client';
import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from './useIsMobile'; // Import the custom hook
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300","400",'500',"700"], variable: '--font-ubuntu' });

const PopularCategories = () => {
  const isMobile = useIsMobile(); // Check if the viewport is mobile

  const categories = [
    {
      title: 'Graphic Tees That Speak Your Style are back!',
      description: 'Unleash your personality with our exclusive graphic T-shirts. Designed for comfort and style, these tees are your go-to for everyday wear. Shop Now and make a statement!',
      imgSrc: 'https://img.freepik.com/free-photo/portrait-handsome-confident-stylish-hipster-lambersexual-model-sexy-man-dressed-size-tshirt-jeans-fashion-male-isolated-studio-posing-near-white-wall_158538-26376.jpg?w=996&t=st=1723804366~exp=1723804966~hmac=43930a2300c1687ba1429c9bd6b0089110151fd25702450d03645020b9cc269e',
    },
    {
      title: 'The latest men’s trends this season',
      description: 'Don’t miss the opportunity.',
      imgSrc: '/sweater_red.png',
    },
    {
      title: 'Show your fashion with summer Jeans',
      description: 'Don’t miss the opportunity.',
      imgSrc: '/green_sweater.png',
    },
  ];

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
    hidden: { opacity: 0, x: 100},
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 30, damping: 20, delay: 0.2 }
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
    <div className="container mx-auto py-8 px-0.5 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: Big patterns are back in fashion */}
        <motion.div
          className="relative max-w-full h-[400px] lg:h-[auto] shadow-2xl rounded-3xl"
          initial={isMobile ? 'visible' : 'hidden'}
          
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={isMobile ? fadeInLeft : fadeIn}
        >
          <img 
            src={categories[0].imgSrc} 
            alt="Big patterns are back in fashion" 
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 p-8 flex flex-col md:justify-start justify-center md:max-w-[400px] max-w-[300px] select-none">
            <p className="text-sm font-semibold text-gray-700 uppercase mb-2 ">New Season</p>
            <h3 className={`${ubuntu.variable} font-sans text-4xl font-bold text-gray-900 mb-4`}>Big patterns are back in fashion</h3>
            <p className="text-gray-600 mb-6 max-w-[450px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
            <a href="/categories" className="text-gray-700 font-semibold  flex items-center mt-10">
              Shop Now <span className="ml-2">→</span>
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
          {categories.slice(1).map((category, index) => (
            <div key={index} className="relative h-[290px] shadow-2xl rounded-3xl">
              <img 
                src={category.imgSrc} 
                alt={category.title} 
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 p-8 flex flex-col md:justify-start justify-center max-w-[300px] select-none">
                <p className="text-sm font-semibold text-gray-700 uppercase mb-2">New Season</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <a href="#" className="text-gray-700 font-semibold flex items-center">
                  Shop Now <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
};

export default PopularCategories;
