'use client';

import { useEffect, useRef } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
// import { Fade, JackInTheBox, Roll, Slide, Zoom, Hinge, Bounce } from "react-awesome-reveal";

export default function Slideshow() {
  const sliderRef = useRef(null);

  const settings = {
    lazyLoad: true,
    fade:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    waitForAnimate: true,
    swipeToSlide: true,
    dots: true,
    appendDots: dots => (
      <div style={{ bottom: '30px' }}>
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
    <div className="relative w-full sm:w-[92%] sm:ml-[4%] mt-0  sm:rounded-3xl h-screen overflow-hidden sm:mt-[73px] z-[40]">
     {/* <Fade direction="left" cascade damping={0.5}>
    <Fade> */}

      <Slider {...settings} ref={sliderRef} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className={`relative w-full h-screen }`}>
            {slide.type === 'video' ? (
              <div>
              <video preload='none' src={slide.src} autoPlay muted loop className="w-full h-full min-h-screen object-cover" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <h1 className="text-white text-[58px] font-bold">New Collection AW24</h1>
              <span className='text-white'>Bridge the gap between smart and casual</span>
              <Link href="/categories" className='my-2.5 cursor-pointer'><span className='border px-[40px] py-[14px]  text-white'>Shop New In</span></Link>
            </div></div>
            ) : (
              <div>
              <img src={slide.src} alt={slide.content} className="w-full object-cover h-screen" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <h1 className={`text-${slide.color} text-4xl font-bold`}>{slide.heading}</h1>
              <span className={`text-${slide.color}`}>{slide.content}</span>
              <Link href="/categories" className='my-2.5'><span className={`text-${slide.mobileColorText} border-${slide.mobileColor} hover:bg:${slide.mobileColor} hover:text-black lg:text-${slide.color} border-${slide.color} border-2 px-[40px] py-[14px] `}>Shop New In</span></Link>
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
    
  );
}
