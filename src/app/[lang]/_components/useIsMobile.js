'use client';
import { useState, useEffect } from 'react';

// Hook to determine if the viewport is mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
