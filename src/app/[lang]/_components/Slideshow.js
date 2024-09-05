'use client';

import { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GlobalApi from '../_utils/GlobalApi.jsx';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Loader from './Loader.js';
// import { Fade, JackInTheBox, Roll, Slide, Zoom, Hinge, Bounce } from "react-awesome-reveal";

export default function Slideshow({dict, lang}) {
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(true); // State to manage loader

  const [hero, setHero] = useState([]);
  useEffect(()=>{
    getProductList();
    console.log("this is the language:",lang)
  },[]) 
  
    const getProductList = ()=>{
    GlobalApi.getHeroSections(lang).then(resp=>{
      const filteredData = resp.data.data.filter(item => item.attributes.section === 1);
      console.log("this is the category data:",resp)
      console.log("Filtered CategoryList Resp:", filteredData);
      const sortedHero = filteredData.sort((a, b) => (a.attributes.type === 'video' ? -1 : 1));

      setHero(sortedHero);
    });
  }
  const handleVideoLoad = () => {
    setLoading(false); // Hide loader when video is loaded
  };
  // console.log("this is the section:",setHero(resp.data.data.section));

  const settings = {
    
    fade:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    dots: true,
    draggable: true,
    focusOnSelect: false,
    touchMove: true,
    arrows:false,
    appendDots: dots => (
      <div style={{ bottom: '-30px', zIndex:"100" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    )
  };

  const slides = [
    { type: 'video', src: '/public.mp4', content: 'Image 3 Content' },

    { type: 'image', src: 'https://assets.paulsmith.com/paul-smith-storyblok/f_webp,q_auto,w_2048/v1715858343/AW24/DIGITAL/16X9/AW24_PAUL_SMITH_DIGITAL_16X915',  },
    { type: 'image', src: '/new_pikaso.png',heading: 'New Arrivals', content: 'New Drops Every Week', color:'black', mobileColor: 'white', mobileColorText:'black' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1665832102183-b232574131ff?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', content: '',color:'black', mobileColor: 'white', mobileColorText:'white' },
  ];

  return (
    <>
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center z-50">
      <Loader/>
      </div>
    )}
    <div className="relative w-full sm:w-[92%] sm:ml-[4%] mt-0  sm:rounded-3xl h-screen overflow-hidden sm:mt-[73px] z-[40]">
     {/* <Fade direction="left" cascade damping={0.5}>
    <Fade> */}

      <Slider {...settings} ref={sliderRef} className="h-full">
     
         {hero.map((slide, index) => (
          <div key={index} className={`relative w-full h-screen }`}>

            {slide.attributes.type === 'video' ? (
              <div>
              <video preload='none' src={slide?.attributes?.image?.data[0]?.attributes?.url} 
              autoPlay muted loop className="w-full h-full min-h-screen object-cover" 
              onLoadedData={handleVideoLoad}
              />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <h1 className="text-white sm:text-[58px] sm:leading-[70px] max-w-[580px] text-xl font-bold">{slide.attributes.title}</h1>
              <span className='text-white sm:max-w-[580px] text-sm'>{slide.attributes.description}</span>
              <Link href="/category/t-shirt" className='my-2.5 cursor-pointer'> {slide.attributes.ImageBg === 'dark' ? 
              <span className={`text-black border-white hover:bg-black hover:text-white bg-white opacity-75 font-semibold border-2 px-[40px] py-[14px] `}>{dict.shop_now}</span>
            : <span className={`text-white border-black opacity-75 hover:bg-white bg-black hover:text-black font-semibold border-2 px-[40px] py-[14px] `}>{dict.shop_now}</span>}  </Link>
            </div></div>
            ) : (
              <div>
              <img src={slide?.attributes?.image?.data[0]?.attributes?.url} alt={slide.attributes.title} className="w-full object-cover h-screen" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <h1 className={`text-${slide.attributes.ImageBg == 'dark' ? 'white' : 'black'} text-4xl font-bold`}>{slide.attributes.title}</h1>
              <span className={`text-${slide.color}`}>{slide.attributes.description}</span>
              <Link href="/categories" className='my-2.5'>
              {slide.attributes.ImageBg === 'dark' ? 
              <span className={`text-black border-white hover:bg-black hover:text-white bg-white opacity-75 font-semibold border-2 px-[40px] py-[14px] `}>{dict.shop_now}</span>
            : <span className={`text-white border-black opacity-75 hover:bg-white bg-black hover:text-black font-semibold border-2 px-[40px] py-[14px] `}>{dict.shop_now}</span>}  </Link>
            </div></div>
            )}
          </div>
        ))}
      </Slider>
      {/* </Fade>
      </Fade> */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="hidden sm:block absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 rounded-full  z-10"
      >
        <ChevronLeft className=" sm:w-16 sm:h-24 text-[#411b0fa7]" />
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="hidden sm:block absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2  p-1 sm:p-2 rounded-full  z-10"
      >
        <ChevronRight  className=" sm:w-16 sm:h-24 text-[#411b0fa7]" />
      </button>
      
    </div>
    </>
  );
}
