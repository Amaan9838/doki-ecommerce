'use client';

import { Raleway } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Footer from './_components/Footer';
import Header from './_components/Header';
import { UpdateCartContext } from './_context/UpdateCartContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { UpdateWishlistContext } from './_context/UpdateWishlistContext';
import { GoogleAnalytics } from '@next/third-parties/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children }) {
  const params = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  const [updateWishlist, setUpdateWishlist] = useState(false);

  const showHeader = params === '/SignIn' || params === '/SignUp' ? false : true;

  useEffect(() => {
    // Create and append Weglot script
    const script = document.createElement('script');
    script.src = 'https://cdn.weglot.com/weglot.min.js';
    // script.async = true;
    script.onload = () => {
      if (window.Weglot) {
        window.Weglot.initialize({
          api_key: 'wg_0eff2eee944bce8e60cfc91cfc0a828e5',
        });
      }
    };
    document.head.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="alternate" hreflang="en" href="https://dokicollections.com" />
        <link rel="alternate" hreflang="nl" href="https://nl.dokicollections.com" />
      </head>
      <body className={raleway.className}>
        <UpdateWishlistContext.Provider value={{ updateWishlist, setUpdateWishlist }}>
          <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
            {showHeader && <Header />}
            {children}
            {showHeader && <Footer />}
            <Toaster />
          </UpdateCartContext.Provider>
        </UpdateWishlistContext.Provider>
        <GoogleAnalytics gaId="G-RERCB1HZDM" />
      </body>
    </html>
  );
}
