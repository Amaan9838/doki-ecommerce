'use client';
import Header from "@/app/[lang]/_components/Header";
import Footer from "@/app/[lang]/_components/Footer";
import { useState } from 'react';
import { UpdateWishlistContext } from '@/app/[lang]/_context/UpdateWishlistContext';
import { UpdateCartContext } from '@/app/[lang]/_context/UpdateCartContext';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';

// type Props = {
//   children: React.ReactNode;
//   dict: any;
//   lang: string;
// };

export default function MainLayout({ children, dict, lang }) {

  const pathname = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  const [updateWishlist, setUpdateWishlist] = useState(false);

  const showHeader = pathname !== '/SignIn' && pathname !== '/SignUp';

  return (
    <>
    <UpdateWishlistContext.Provider value={{ updateWishlist, setUpdateWishlist }}>
    <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
      {showHeader && <Header dict={dict} lang={lang}/>}
      {children}
      {showHeader && <Footer dict={dict} />}
      <Toaster />
    </UpdateCartContext.Provider>
  </UpdateWishlistContext.Provider>
  </>
  );
}