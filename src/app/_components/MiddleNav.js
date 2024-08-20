'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", '500', "700"],
  variable: '--font-ubuntu'
});

export default function MiddleNav() {
  const scrollContainerRef = useRef(null);
  const clonedContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const clonedContainer = clonedContainerRef.current;

    const containerWidth = scrollContainer.scrollWidth;

    // Clone the scrollContainer and append it
    clonedContainer.style.width = `${containerWidth}px`;

    const timeline = gsap.timeline({ repeat: -1, paused: true });
    const time = 30; // Adjust this to control the scrolling speed

    timeline
      .fromTo(
        scrollContainer,
        { x: 0 },
        { x: -containerWidth, duration: time, ease: "none" }
      )
      .fromTo(
        clonedContainer,
        { x: containerWidth },
        { x: 0, duration: time, ease: "none" },
        0
      )
      .set(scrollContainer, { x: containerWidth })
      .to(clonedContainer, { x: -containerWidth, duration: time, ease: "none" })
      .to(scrollContainer, { x: 0, duration: time, ease: "none" });

    timeline.progress(1).progress(0).play();

    scrollContainer.addEventListener("mouseenter", () => timeline.pause());
    scrollContainer.addEventListener("mouseleave", () => timeline.play());

    return () => {
      scrollContainer.removeEventListener("mouseenter", () => timeline.pause());
      scrollContainer.removeEventListener("mouseleave", () => timeline.play());
      timeline.kill();
    };
  }, []);

  const categories = [
    "Best Sellers",
    "New Arrivals",
    "Pants",
    "Denim jeans",
    "Shorts",
    "Polos & T-Shirts",
    "Tops",
    "Sweaters",
    "Jackets"
  ];

  return (
    <div className="bg-[#343434] py-4 text-white flex px- justify-center items-center rounded-3xl overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex gap-8 uppercase whitespace-nowrap ${ubuntu.variable} font-sans font-semibold text-lg`}
          ref={scrollContainerRef}
        >
          {categories.map((category, index) => (
            <div key={index} className="flex-none">
              <ul>
                <li>{category}</li>
              </ul>
            </div>
          ))}
        </div>
        <div
          className={`absolute top-0 left-0 flex gap-8 uppercase whitespace-nowrap ${ubuntu.variable} font-sans font-semibold text-lg`}
          ref={clonedContainerRef}
        >
          {categories.map((category, index) => (
            <div key={index} className="flex-none">
              <ul>
                <li>{category}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
