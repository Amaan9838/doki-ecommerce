// components/Footer.js
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Shop from "./logos/Shop";
import Visa from "./logos/Visa";
import IDeal from "./logos/IDeal";
import MasterCard from "./logos/MasterCard";
import Bank  from "./logos/Bank";
import Image from "next/image";


export default function Footer({dict}) {
  return (
    <footer className="bg-[#181818] text-white py-12 px-8 rounded-3xl my-14 mx-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Us Section */}
        <div>
          <Image src={'https://res.cloudinary.com/duuj30a0s/image/upload/v1725542694/fbyzuaav56pbanzrlu7k.png'} width={150} height={50} className="pb-4"/>
          <h2 className="text-lg font-bold mb-4">
            {/* About us */}
            {dict.about_us}
            </h2>
          <p className="text-sm mb-4">
            {/* Established in 2024, DOKI is all about standing out from the crowd
            and staying unique. */}
            {dict.footer_content1}
          </p>
          <p className="text-sm mb-4">
             {/* DOKI is now part of the American streetwear
            scene and a leading global destination for the latest menswear.
           */}
            {dict.footer_content2}

          </p>
          <button className="transition duration-300 ease-in-out transform hover:scale-105 bg-blue-600 text-white px-4 py-2 rounded-full mt-2">
            {/* Follow on Shop */}
            {dict.follow_shop}
          </button>
          <div className="flex space-x-4 mt-4">
            <FaFacebook className="text-2xl hover:text-gray-400 transition duration-300" />
            <FaInstagram className="text-2xl hover:text-gray-400 transition duration-300" />
          </div>
        </div>
        
        {/* Shop Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Shop</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-400 transition duration-300">Summer Sale</li>
            <li className="hover:text-gray-400 transition duration-300">Best Sellers</li>
            <li className="hover:text-gray-400 transition duration-300">New Arrivals</li>
            <li className="hover:text-gray-400 transition duration-300">Pants</li>
            <li className="hover:text-gray-400 transition duration-300">Denim Jeans</li>
            <li className="hover:text-gray-400 transition duration-300">Shorts</li>
            <li className="hover:text-gray-400 transition duration-300">Polos & T-Shirts</li>
            <li className="hover:text-gray-400 transition duration-300">Tops</li>
            <li className="hover:text-gray-400 transition duration-300">Sweaters</li>
            <li className="hover:text-gray-400 transition duration-300">Jackets</li>
          </ul>
        </div>
        
        {/* Customer Support Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            {/* Customer Support */}
             {dict.c_support}
          </h2>
          <ul className="space-y-2 text-sm">
            {/* <li className="hover:text-gray-400 transition duration-300">Shipping</li> */}
            <li className="hover:text-gray-400 transition duration-300">
              {/* Track Your Order */}
              {dict.t_order}
              </li>
            {/* <li className="hover:text-gray-400 transition duration-300">Request a return / exchange</li>
            <li className="hover:text-gray-400 transition duration-300">Returns & Refunds</li> */}
            <li className="hover:text-gray-400 transition duration-300">
              {/* Privacy Policy */}
              {dict.p_policy}
              </li>
            <li className="hover:text-gray-400 transition duration-300">{dict.t_conditions}</li>
            <li className="hover:text-gray-400 transition duration-300">{dict.about_us}</li>
            {/* <li className="hover:text-gray-400 transition duration-300">FAQ</li> */}
          </ul>
        </div>
        
        {/* Join the Club Section */}
        {/* <div>
          <h2 className="text-lg font-bold mb-4">JOIN THE CLUB</h2>
          <p className="text-sm mb-4">
            Get exclusive access to new product releases, special offers, and
            restocks. Join the DOKI Club.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-2 pl-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="absolute right-0 top-0 p-2 bg-gray-700 rounded-r hover:bg-gray-600 transition duration-300">
              →
            </button>
          </div>
        </div> */}
      </div>
      
      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs">&copy; 2024, DOKI</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* Add logos here */}
          <Shop/>
         <Visa/>
         <IDeal/>
         <MasterCard/>
         <Bank/>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <span className="text-xs">UNITED STATES (USD $)</span>
        </div>
      </div>
    </footer>
  );
}
