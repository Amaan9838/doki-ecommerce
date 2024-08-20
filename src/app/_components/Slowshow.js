'use client';
import { useState, useEffect } from 'react';

const Slowshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: 'https://us.icon-amsterdam.com/cdn/shop/files/black6_91067281-a3bc-48ee-a784-02c50fcf02c1.jpg?v=1722539327&width=800', text: 'THE RL67 HERRINGBONE JACKET' },
    { image: 'https://us.icon-amsterdam.com/cdn/shop/files/LB4.jpg?v=1722539442&width=800', text: 'Slide 2' },
    { image: 'https://us.icon-amsterdam.com/cdn/shop/files/Grey4_44714aa6-1e81-4298-aabf-ad86660071c0.jpg?v=1711455436&width=800', text: 'Slide 3' },
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 blur-0 z-20'
                : 'opacity-0 blur-sm z-10'
            }`}
            style={{
              transitionDelay: `${index * 200}ms`,
            }}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-0 right-0 text-center text-white text-xl font-semibold bg-black bg-opacity-50 py-2">
              {slide.text}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-4 left-4 text-white text-2xl">
        {`Men’s Polo`}
      </div>
      <div className="absolute bottom-4 right-4 text-white">
        {`${currentSlide + 1} / ${slides.length}`}
      </div>
    </div>
  );
};

export default Slowshow;
