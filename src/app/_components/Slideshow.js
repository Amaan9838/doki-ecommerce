'use client';

import { useEffect, useRef } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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
    { type: 'image', src: '/main_section.png', content: 'Video Content' },
    { type: 'image', src: 'https://img.freepik.com/free-photo/portrait-handsome-confident-stylish-hipster-lambersexual-modelman-dressed-green-sweater-jeans-fashion-male-posing-studio-near-blue-wall_158538-24057.jpg?t=st=1723887503~exp=1723891103~hmac=81360471111ef2b50e1d09887e6d4af487e2822f6e9e9fd3b0279578d60a20ba&w=996', content: 'Image 1 Content' },
    { type: 'image', src: 'https://cdn.pixabay.com/photo/2016/11/29/07/16/balancing-1868051_1280.jpg', content: 'Image 2 Content' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1665832102183-b232574131ff?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', content: 'Image 3 Content' },
  ];

  return (
    <div className="relative w-full sm:w-[92%] sm:ml-[4%] rounded-3xl h-[50vh] sm:h-[70vh] lg:h-screen overflow-hidden mt-[60px] sm:mt-[73px] z-[40]">
     {/* <Fade direction="left" cascade damping={0.5}>
    <Fade> */}

      <Slider {...settings} ref={sliderRef} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[50vh] sm:h-[70vh] lg:h-screen">
            {slide.type === 'video' ? (
              <video src={slide.src} autoPlay muted loop className="w-full h-full object-cover" />
            ) : (
              <img src={slide.src} alt={slide.content} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </Slider>
      {/* </Fade>
      </Fade> */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow z-10"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow z-10"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>
      
    </div>
    
  );
}
