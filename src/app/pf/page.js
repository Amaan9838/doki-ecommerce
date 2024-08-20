// pages/index.js
import React from 'react';
import ParallaxSection from '../_components/ParallaxSection';
import Ticker from '../_components/Ticker';
import ProductCards from '../_components/ParallaxSection';
import FadeInCards from '../_components/ParallaxSection';

const HomePage = () => {
  const cardContents = [
    'Card 1 Content',
    'Card 2 Content',
    'Card 3 Content',
    'Card 4 Content',
  ];
  return (
    <div className='container mt-[850px] mb-[150px]'>
      <Ticker />
      <h1>Men's Clothing Store</h1>
      <FadeInCards cards={cardContents} />
     
    </div>
  );
};

export default HomePage;

