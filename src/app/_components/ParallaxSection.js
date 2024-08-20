// 'use client';
// import { Fade } from "react-awesome-reveal";

// export default function ParallaxSection() {
//   return (
//     <div >

//     <Fade direction="down" cascade className='mt-[350px] bg-gray-400' >
//       <p className='mt-[150px] bg-gray-400'>I am an animated text</p>
//     </Fade>
//     <Fade direction="right" className='mt-[350px] bg-gray-400' >
//       <p className='mt-[150px] bg-gray-400'>I am an animated text</p>
//     </Fade>
//     </div>
//   );
// }
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Card = ({ index, content }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: index % 2 === 0 ? 50 : -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="bg-white p-6 rounded-lg shadow-md mb-4"
    >
      {content}
    </motion.div>
  );
};

const FadeInCards = ({ cards }) => {
  return (
    <div className="container mx-auto px-4">
      {cards.map((card, index) => (
        <Card key={index} index={index} content={card} />
      ))}
    </div>
  );
};

export default FadeInCards;