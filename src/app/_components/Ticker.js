'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Ticker() {
  const tickerWrapperRef = useRef(null);
  const listRef = useRef(null);
  const clonedListRef = useRef(null);

  useEffect(() => {
    const tickerWrapper = tickerWrapperRef.current;
    const list = listRef.current;
    const clonedList = clonedListRef.current;

    const listWidth = Array.from(list.children).reduce(
      (width, listItem) => width + listItem.offsetWidth,
      0
    );

    list.style.width = `${listWidth}px`;
    clonedList.style.width = `${listWidth}px`;

    const timeline = gsap.timeline({ repeat: -1, paused: true });
    const time = 20;

    timeline
      .fromTo(
        list,
        { x: 0 },
        { x: -listWidth, duration: time, ease: "none" }
      )
      .fromTo(
        clonedList,
        { x: listWidth },
        { x: 0, duration: time, ease: "none" },
        0
      )
      .set(list, { x: listWidth })
      .to(clonedList, { x: -listWidth, duration: time, ease: "none" })
      .to(list, { x: 0, duration: time, ease: "none" });

    timeline.progress(1).progress(0).play();

    tickerWrapper.addEventListener("mouseenter", () => timeline.pause());
    tickerWrapper.addEventListener("mouseleave", () => timeline.play());

    return () => {
      tickerWrapper.removeEventListener("mouseenter", () => timeline.pause());
      tickerWrapper.removeEventListener("mouseleave", () => timeline.play());
      timeline.kill();
    };
  }, []);

  const items = [
    "This is list item 1",
    "This is list item 2",
    "This is list item 3",
    "This is list item 4",
    "This is list item 5"
  ];

  return (
    <div
      ref={tickerWrapperRef}
      className="bg-[#343434] py-4 text-white flex justify-center items-center rounded-3xl overflow-hidden mt-[350px]"
    >
      <ul
        ref={listRef}
        className="relative inline-block list-none p-0 m-0 whitespace-nowrap"
      >
        {items.map((item, index) => (
          <li key={index} className="float-left pl-5">
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ul
        ref={clonedListRef}
        className="absolute top-0 left-0 list-none p-0 m-0 whitespace-nowrap"
      >
        {items.map((item, index) => (
          <li key={index} className="float-left pl-5">
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
