// components/ScrollAnimation.js
'use client';
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollAnimation = () => {
  const leftImageControls = useAnimation();
  const rightImageControls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      leftImageControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1 },
      });
      rightImageControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  }, [inView, leftImageControls, rightImageControls]);

  return (
    <div className="scroll-animation-container" ref={ref}>
      <motion.div
        className="scroll-animation-item left"
        initial={{ x: '-100%', opacity: 0 }}
        animate={leftImageControls}
      >
        <img src="/sweater.jpg" alt="Left" className="scroll-image" />
      </motion.div>

      <motion.div
        className="scroll-animation-item right"
        initial={{ x: '100%', opacity: 0 }}
        animate={rightImageControls}
      >
        <img src="/tshirt.jpg" alt="Right" className="scroll-image" />
      </motion.div>
    </div>
  );
};

export default ScrollAnimation;
