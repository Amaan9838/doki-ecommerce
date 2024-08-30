'use client';

import React, { useState, useEffect } from 'react';
import GlobalApi from '../_utils/GlobalApi.jsx';
import Loader from './Loader';

export default function TopCategories() {
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    GlobalApi.getHeroSections().then(resp => {
      const filteredData = resp.data.data.filter(item => item.attributes.section === 5);
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

  const categories = [
    {
      name: 'Pants',
      imageUrl: 'https://us.icon-amsterdam.com/cdn/shop/files/11T_c07a8c70-fb7d-46a2-8d65-237b1bfb8d9e.jpg?v=1723728632&width=800',
      link: '/shop/pants',
    },
    {
      name: 'Denim Jeans',
      imageUrl: '/jeans.jpg',
      link: '/shop/denim-jeans',
    },
    {
      name: 'Shorts',
      imageUrl: 'https://us.icon-amsterdam.com/cdn/shop/files/s_s2.jpg?v=1723979769&width=800',
      link: '/shop/shorts',
    },
    {
      name: 'Tops',
      imageUrl: '/tshirt.jpg',
      link: '/shop/tops',
    },
  ];

  return (
    <section className="bg-[#181818] py-12 px-4 md:px-24  md:mt-24 mt-16 md:mx-8 rounded-3xl">
      <h2 className="text-3xl text-white font-bold text-center mb-8">Most Popular Categories</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {hero.map((category) => (
          <div 
            key={category?.attributes?.title} 
            className="relative w-64 h-80 lg:h-96 rounded-3xl overflow-hidden shadow-lg group"
          >
            <img 
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +category?.attributes?.image?.data[0]?.attributes?.url} 
              alt={category?.attributes?.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-2xl font-bold mb-4">{category?.attributes?.title}</h3>
              <a 
                href={category.link} 
                className="bg-yellow-500 text-black px-6 py-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
