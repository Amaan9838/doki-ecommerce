'use client';
// import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Footer from './_components/Footer';
import Header from './_components/Header';
import {UpdateCartContext} from './_context/UpdateCartContext';
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UpdateWishlistContext } from "./_context/UpdateWishlistContext";

const raleway = Raleway({ subsets: ["latin"], weight: ["100","200","300","400",'500',"600","700","800","900"], 

});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({children,}) {

const params = usePathname();
const [updateCart,setUpdateCart]=useState(false);
const [updateWishlist,setUpdateWishlist]=useState(false);

const showHeader=params=='/SignIn'||params=='/SignUp'?false:true; 

  return (
    // <PayPalScriptProvider options={{ clientId: "test" }}>
    <html lang="en">
      <body className={raleway.className}>         <UpdateWishlistContext.Provider value={{ updateWishlist,setUpdateWishlist }}>

        <UpdateCartContext.Provider value={{ updateCart,setUpdateCart }}>
      {showHeader&&<Header />}
     
        {children}<Footer/><Toaster /> </UpdateCartContext.Provider> </UpdateWishlistContext.Provider></body>
    </html>
    // </PayPalScriptProvider>
  );
}
