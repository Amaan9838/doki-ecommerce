'use client';

import React, { useState,useContext,useEffect } from 'react';
import { Menu, X, ShoppingCart, User2Icon, SearchIcon, Heart, ChevronDown } from 'lucide-react';
import ShoppingCartModal from './ShoppingCartModal';
import { CartContext } from '../contexts/CartContext';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi.jsx';

const Header = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useContext(CartContext);


  const [categoryList, setCategoryList] = useState([]);
  useEffect( ()=>{
    getCategoryList( ) ;
  },[]) 
  
    const getCategoryList = ()=>{
    GlobalApi.getCategory().then(resp=>{
    // console. log("CategoryList Resp:", resp.data.data);
setCategoryList(resp.data.data);
    });
  }

  const products = [
    { name: 'Tupac California Love T-Shirt', price: '9.99', originalPrice: '12.99', img: '/jacket.jpg' },
    { name: 'Basic Colored Sweatpants With Elastic Hems', price: '19.90', originalPrice: '25.90', img: '/jeans.jpg' },
    { name: 'Basic High-Neck Puff Jacket', price: '89.00', img: '/tshirt.jpg' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="bg-white text-gray-800 shadow-2xl rounded-3xl mx-2.5 lg:mx-5 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Hamburger menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/"><img src="/brand_logo.png" alt="Logo" className="h-6" /></Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 justify-center items-center">
            <div className="relative">
              <div className="flex items-center gap-1 hover:text-gray-900 hover:rounded-xl hover:bg-gray-200 px-2 py-2">
                <button
                  onMouseEnter={() => setIsOpenCategory(true)}
                  className="text-sm font-semibold text-gray-700"
                >
                  Categories
                </button>
                <ChevronDown className="text-gray-700 h-4 w-4" />
              </div>

              {isOpenCategory && (
                <div
                  onMouseEnter={() => setIsOpenCategory(true)}
                  onMouseLeave={() => setIsOpenCategory(false)}
                  className="fixed top-[12.5%] left-0 lg:w-[96%] bg-white shadow-2xl rounded-3xl ml-6 p-6 h-[95vh] z-50"
                >
                  {/* Category Content */}
                  <div className="flex justify-between items-start">
                    <div className="w-1/3 px-6">
                      <img
                        src="/sweater.jpg"
                        alt="Accessories"
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-2/3 grid grid-cols-4 gap-4">
                      {/* Category Links */}
                      <div>
                        <h4 className="font-medium text-gray-900">Trending</h4>
                        <ul>
                          {/* {categoryList.map((category, index)=>(
                          <li key={index}><a href="#" className="text-sm text-gray-700 hover:text-gray-900">{category.attributes.name}</a></li>

                          ))} */}
                          {/* <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Boots</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Sandals</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Socks</a></li>
                        */}
                        </ul>
                      </div>
                      {/* Other Category Sections */}
                      <div>
                        <h4 className="font-medium text-gray-900">Shop Collection</h4>
                        <ul>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Everything</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Core</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">New Arrivals</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Sale</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">All Clothing</h4>
                        <ul>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Basic Tees</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Artwork Tees</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Pants</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Hoodies</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Swimsuits</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Brands</h4>
                        <ul>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Re-Arranged</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Counterfeit</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Full Nelson</a></li>
                          <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">My Way</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-900 py-1 lg:pr-2">About</a>
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-900 py-1">Contact</a>
          </div>

          {/* Icons */}
          <div className="flex items-center">
            <button onClick={() => setIsOpenSearch(true)} aria-label="Search" className="text-gray-700 items-center hidden lg:flex">
              <SearchIcon className="h-5 m-2" />
            </button>
            {isOpenSearch && (
              <div className="fixed top-[0] lg:top-[12.5%] lg:ml-6 lg:rounded-3xl left-0 w-full lg:w-[96%] bg-white lg:h-[80vh]  p-6 h-[95vh] z-50">
                <div className="flex flex-col justify-between p-4">
                  
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">What are you looking for?</h2>
                      <button className="text-xl font-bold" onClick={() => setIsOpenSearch(false)}><X /></button>
                    </div>
                    <div>
                    <div className="relative mx-auto my-3 ">
  <input
    type="text"
    placeholder="Search your favorite product..."
    className="text-lg w-full border-0 border-b-2 border-gray-300 py-1 bg-transparent outline-none focus:ring-0 focus:border-black"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  
  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black scale-x-0 transition-transform ease-in-out duration-300"></div>
</div>

                    <ul className="space-y-2">
                      {filteredProducts.map((product, index) => (
                        <li key={index} className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-100">
                          <div className="flex items-center">
                            <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded mr-4" />
                            <span>{product.name}</span>
                          </div>
                          <div className="text-right">
                            {product.originalPrice && (
                              <span className="text-gray-400 line-through mr-2">${product.originalPrice}</span>
                            )}
                            <span className="text-red-500">${product.price}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    </div>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative text-gray-700 flex items-center"
            >
              <ShoppingCart className="h-5 m-2" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full"> {getTotalItems()}</span>
            </button>
            <ShoppingCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <Link href={'/SignIn'}>
            <button aria-label="User" className="text-gray-700 hidden lg:flex items-center">
              <User2Icon className="h-5 m-2" />
            </button>
            </Link>
            <button aria-label="Favorites" className="text-gray-700 hidden lg:flex items-center">
              <Heart className="h-5 m-2" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50">
            <div className="flex flex-col p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 flex items-center mb-4"
              >
                <X className="h-6 w-6" />
              </button>
              <a href="#" className="text-gray-800 text-lg py-2">Home</a>
              <a href="#" className="text-gray-800 text-lg py-2">Shop</a>
              <a href="#" className="text-gray-800 text-lg py-2">About</a>
              <a href="#" className="text-gray-800 text-lg py-2">Contact</a>
              <div className="mt-4">
                <button
                  onClick={() => setIsOpenCategory(!isOpenCategory)}
                  className="text-gray-800 text-lg py-2 flex items-center"
                >
                  Categories
                  <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${isOpenCategory ? 'rotate-180' : ''}`} />
                </button>
                {isOpenCategory && (
                  <div className="flex flex-col mt-2 space-y-2">
                    <a href="#" className="text-gray-700 text-sm py-1">Sneakers</a>
                    <a href="#" className="text-gray-700 text-sm py-1">Boots</a>
                    <a href="#" className="text-gray-700 text-sm py-1">Sandals</a>
                    <a href="#" className="text-gray-700 text-sm py-1">Socks</a>
                    {/* Other Categories */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Menu for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <button aria-label="Wishlist" className="text-gray-700 flex flex-col items-center">
            <Heart className="h-6" />
            <span className="text-xs">Wishlist</span>
          </button>
          <button aria-label="Search" className="text-gray-700 flex flex-col items-center" onClick={() => setIsOpenSearch(true)}>
            <SearchIcon className="h-6" />
            <span className="text-xs">Search</span>
          </button>
          <button aria-label="Categories" className="text-gray-700 flex flex-col items-center" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6" />
            <span className="text-xs">Categories</span>
          </button>
          <button aria-label="Account" className="text-gray-700 flex flex-col items-center">
            <User2Icon className="h-6" />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;




// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const menuRef = useRef(null);

//   const handleDropdownToggle = (index) => {
//     setActiveDropdown(activeDropdown === index ? null : index);
//   };

//   const handleOutsideClick = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setIsMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.addEventListener('mousedown', handleOutsideClick);
//     } else {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [isMenuOpen]);

//   return (
//     <>
//       <header className="bg-white shadow-md py-4 px-6">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Hamburger and Cart for Mobile */}
//           <div className="lg:hidden flex items-center justify-between w-full">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu" className="text-gray-700 hover:text-gray-900">
//               <Menu className="h-6 w-6" />
//             </button>

//             {/* Centered Logo on Mobile */}
//             <div className="flex-grow text-center transition-transform duration-300 ease-in-out">
//               <a href="/" className="text-xl font-bold text-gray-800">
//                 YourLogo
//               </a>
//             </div>

//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Cart" className="text-gray-700 hover:text-gray-900 relative">
//               <ShoppingCart className="h-6 w-6" />
//               <div className="h-3 w-3 rounded-full absolute top-[-2px] right-[-2px] bg-red-600 text-white text-[8px] flex items-center justify-center">
//                 2
//               </div>
//             </button>
//           </div>

//           {/* Full Menu for Larger Screens */}
//           <div className="hidden lg:flex items-center justify-between w-full">
//             {/* Left-aligned Logo on Large Screens */}
//             <a href="/" className="text-xl font-bold text-gray-800 transition-transform duration-300 ease-in-out">YourLogo</a>

//             <div className="flex items-center space-x-4">
//               <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Categories</a>
//               <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Company</a>
//               <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Stores</a>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button aria-label="Search" className="text-gray-700 hover:text-gray-900">
//                 <span className="sr-only">Search</span>
//                 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.4-5.65A7.75 7.75 0 1112 4.25a7.75 7.75 0 015.65 11.15z"></path>
//                 </svg>
//               </button>
//               <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Cart" className="text-gray-700 hover:text-gray-900 relative">
//                 <ShoppingCart className="h-6 w-6" />
//                 <div className="h-3 w-3 rounded-full absolute top-[-2px] right-[-2px] bg-red-600 text-white text-[8px] flex items-center justify-center">
//                   2
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hamburger Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 lg:hidden">
//           <div ref={menuRef} className="fixed top-0 left-0 w-64 bg-white shadow-lg p-4 h-full z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
//             {/* Close Button */}
//             <button onClick={() => setIsMenuOpen(false)} aria-label="Close" className="text-gray-700 hover:text-gray-900 mb-4">
//               <X className="h-6 w-6" />
//             </button>

//             {/* Brand Name on Top */}
//             <div className="mb-4 text-center">
//               <h2 className="text-xl font-semibold text-gray-900">Your Brand</h2>
//             </div>
//             {/* Menu Items */}
//             <ul className="space-y-2">
//               <li>
//                 <button
//                   onClick={() => handleDropdownToggle(1)}
//                   className="text-sm text-gray-700 hover:text-gray-900 w-full flex justify-between items-center focus:outline-none"
//                 >
//                   Categories
//                   <ChevronDown className={`h-4 w-4 transition-transform duration-300 ease-in-out ${activeDropdown === 1 ? 'transform rotate-180' : ''}`} />
//                 </button>
//                 {activeDropdown === 1 && (
//                   <ul className="pl-4 mt-2 space-y-1 transition-all duration-300 ease-in-out">
//                     <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Subcategory 1</a></li>
//                     <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Subcategory 2</a></li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleDropdownToggle(2)}
//                   className="text-sm text-gray-700 hover:text-gray-900 w-full flex justify-between items-center focus:outline-none"
//                 >
//                   Company
//                   <ChevronDown className={`h-4 w-4 transition-transform duration-300 ease-in-out ${activeDropdown === 2 ? 'transform rotate-180' : ''}`} />
//                 </button>
//                 {activeDropdown === 2 && (
//                   <ul className="pl-4 mt-2 space-y-1 transition-all duration-500 ease-in-out">
//                     <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">About Us</a></li>
//                     <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Careers</a></li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleDropdownToggle(3)}
//                   className="text-sm text-gray-700 hover:text-gray-900 w-full flex justify-between items-center focus:outline-none"
//                 >
//                   Stores
//                   <ChevronDown className={`h-4 w-4 transition-transform duration-300 ease-in-out ${activeDropdown === 3 ? 'transform rotate-180' : ''}`} />
//                 </button>
//                 {activeDropdown === 3 && (
//                   <ul className="pl-4 mt-2 space-y-1 transition-all duration-300 ease-in-out">
//                     <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Store 1</a></li>
//                     <li><a href="#" className="text-sm text-gray-700 hover:text-gray-900">Store 2</a></li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;
