'use client';

import React, { useState,useContext, useEffect } from 'react';
import { Menu, X, ShoppingCart, User2Icon, SearchIcon, Heart, ChevronDown } from 'lucide-react';
import ShoppingCartModal from './ShoppingCartModal';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlobalApi from '../_utils/GlobalApi.jsx';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import { UpdateWishlistContext } from '../_context/UpdateWishlistContext';
import { toast } from '@/components/ui/use-toast';
import { generateSlug } from '../_utils/slug';

const Header = () => {
  
  // const isLogin = sessionStorage.getItem('jwt') ? true : false;
  const [isLogin, setIsLogin] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClose, setisMenuClose] = useState(false);
//   const jwt = sessionStorage.getItem('jwt');
// const user = JSON.parse(sessionStorage.getItem('user'));
  const [isOpenSearch, setIsOpenSearch] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);
  const {updateWishlist,setUpdateWishlist}=useContext(UpdateWishlistContext);

const [cartItemsList,setCartItemsList]=useState([]);
  const [totalCartItems,setTotalCartItems] =  useState(0);
const [totalWishlistItems,setTotalWishlistItems] = useState();

  const fadeVariantsX = {
    hidden: { opacity: 0, x: '-100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' } // This will handle the fade out effect to the left
  };



  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    // Only run this code on the client
    if (typeof window !== 'undefined') {
      const storedJwt = sessionStorage.getItem('jwt');
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      if (storedJwt) {
        setIsLogin(true);
        setJwt(storedJwt);
        setUser(storedUser);
        getCartItems(storedUser.id, storedJwt);
        getWishlistItems(storedUser.id, storedJwt);
      }
    }
    getCategoryList();
  }, [updateCart, updateWishlist]);
// console.log("this is the user:",user.id)
    const getCategoryList = ()=>{
    GlobalApi.getCategory().then(resp=>{
    // console. log("CategoryList Resp:", resp.data.data);
setCategoryList(resp.data.data);
    });
  }
// Used to get Total Cart Items

  const getCartItems=async(userId, jwtToken)=>{
    const cartItemsList_=await GlobalApi.getCartItems(userId, jwtToken);
    // console.log(cartItemsList_);
    setTotalCartItems(cartItemsList_.length);
    setCartItemsList(cartItemsList_);
  }

  const getWishlistItems=async(userId, jwtToken)=>{
    const wishlistItemsList=await GlobalApi.getWishlistItems(userId, jwtToken);
    // console.log(wishlistItemsList);
    setTotalWishlistItems(wishlistItemsList.length);
    // setCartItemsList(cartItemsList_);
  }
  
  const fetchProducts = async (query) => {
    if (query) {
      const response = await GlobalApi.SearchItems(query); // Assuming you have a searchProducts method in GlobalApi
      setSearchResults(response.data.data); // Store the results in state
      // console.log("this is the search:",searchResults.data)
    } else {
      setSearchResults([]); // Clear results if search term is empty
    }
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(searchTerm);
    }, 300); // Debounce search input by 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  
const MenuClose =()=>{
setisMenuClose(true);
setIsMenuOpen(false);
}
const onDeleteItem=(id)=>{
GlobalApi.deleteCartItems(id,jwt).then(resp=>{
  toast({title: "Item removed !"})
  getCartItems(user.id,jwt);
  gtag("event", "remove_from_cart", {
    currency: "USD",
    value: cartItemsList.amount,
    items: [
      {
        item_id: `SKU_${cartItemsList.id}`,
        item_name: cartItemsList.name, 
        price: cartItemsList.price,
        quantity: cartItemsList.quantity
      }]
  })
})
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
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/"><img src="/brand_logo.png" alt="Logo" className="h-6" /></Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 justify-center items-center">
            <div className="relative" >
              <div   
              className="flex items-center gap-1 hover:text-gray-900 hover:rounded-xl hover:bg-gray-200 px-2 py-2">
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
                        src="/model.png"
                        alt="Accessories"
                        className="w-full h-[500px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-[100%] grid grid-cols-2 ">
                      {/* Category Links */}
                      <div>
                        <h4 className="font-black text-4xl text-gray-900 px-12 my-2.5">Trending</h4>
                        <ul className='flex flex-row '>
                          {/* {categoryList.map((category, index)=>(
                          <li key={index}><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">{category.attributes.name}</a></li>

                          ))} */}
                          <div>                 
                            {categoryList.slice(0,4).map((category,index)=>(
                                     <li key={index} className="py-4"><a href={"/category/"+category.attributes.name} className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">{category.attributes.name}</a></li>
                          ))}
                                     {/* <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">BEST SELLERS</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">SUITS</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">PANTS</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">DENIM JEANS</a></li> */}
                          </div>
<div>
{categoryList.slice(4).map((category,index)=>(
                                     <li key={index} className="py-4" ><a href={"/category/"+category.attributes.name} className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">{category.attributes.name}</a></li>
                          ))}
{/* <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">NEW ARRIVALS</a></li>

                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">SHORTS</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">Sandals</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">Socks</a></li> */}
                          </div>
                        </ul>
                      </div>
                      {/* Other Category Sections */}
                      {/* <div>
                        <h4 className="font-medium text-gray-900">Shop Collection</h4>
                        <ul>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Everything</a></li>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Core</a></li>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">New Arrivals</a></li>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Sale</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">All Clothing</h4>
                        <ul>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Basic Tees</a></li>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Artwork Tees</a></li>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Pants</a></li>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Hoodies</a></li>
                          <li><a href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Swimsuits</a></li>
                        </ul>
                      </div> */}
                      {/* <div>
                        <h4 className="font-black text-4xl text-gray-900 my-2.5">Buy without ocassion</h4>
                        <ul>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">Casual Wears</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">Dresses</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">Suits</a></li>
                          <li className="py-4"><a href="/categories" className="text-xl font-medium px-12 text-gray-700 hover:text-gray-900">Other Accessories</a></li>
                        </ul>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="/categories" className="text-sm font-semibold text-gray-700 hover:text-gray-900 py-1 lg:pr-2">About</a>
            <a href="/categories" className="text-sm font-semibold text-gray-700 hover:text-gray-900 py-1">Contact</a>
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

                    <ul className="space-y-2 h-[300px] overflow-y-scroll">
                      {searchResults.map((product, index) => (
                         <a key={index} href={`/products/${product.id}/${generateSlug(product.attributes.title)}`}>
                
                <li  className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-100">
                          <div className="flex items-center">
                            {product.attributes.images.data.slice(0,1).map((image,index)=> (
                            <img key={index} src={image.attributes.url} alt={product.attributes.title} className="w-12 h-12 object-cover rounded mr-4" />

                            ))}
                            <span>{product.attributes.title}</span>
                          </div>
                          <div className="text-right">
                            {product.attributes.discount !=null ? (
                              <div className='flex flex-col justify-center items-center'>
                              <span className="text-gray-400 text-xs line-through mr-2">${product.attributes.price}</span>
                              <span className="text-red-500 font-semibold">${(product.attributes.price * (1 - product.attributes.discount / 100)).toFixed(2)}</span>
                              </div>
                           ) :
                           <span className="text-gray-900 font-semibold mr-2">${product.attributes.price}</span>
                          }
                          </div>
                          
                        </li>
                        </a>
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
              {totalCartItems >= 1 ? 
              <span className="absolute -top-[0.25rem] -right-[0.25rem] bg-red-600 text-white text-[0.65rem] leading-[0.8rem] px-2 py-1 rounded-full"> {totalCartItems}</span>
              : ''}
              </button>
            <ShoppingCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItemsList={cartItemsList} onDeleteItem={onDeleteItem}/>
          
            <Link href={`${!isLogin ?'/SignIn': '/profile'}`}>
            <button aria-label="User" className="text-gray-700 hidden lg:flex items-center">
              <User2Icon className="h-5 m-2" />
            </button>
            </Link>
            <Link href={'/Wishlist'} aria-label="Favorites" className="relative text-gray-700 hidden lg:flex items-center">
              <Heart className="h-5 m-2"/>
              {totalWishlistItems >= 1 ? 
              <span className="absolute -top-[0.25rem] -right-[0.25rem] bg-red-600 text-white text-[0.65rem] leading-[0.8rem] px-2 py-1 rounded-full"> {totalWishlistItems}</span>
              : ''}
             
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
 
  
      {isMenuOpen && (
        <motion.div
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50`}
          initial="hidden"
          animate="visible"
          exit="exit" // This triggers the exit animation
          variants={ isMenuOpen ? fadeVariantsX  : ''}
          transition={{ duration: 0.3 }} // Duration of the fade animation
        >
          <div className="">
            <div className="flex flex-col p-4">
              <div className="flex justify-between items-center py-4 border-b">
                <Link href="/">
                  <img src="/brand_logo.png" alt="Logo" className="h-6" />
                </Link>

                <button
                  onClick={() => MenuClose()}
                  className="text-gray-700 flex items-center mb-4"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <a href="/categories" className="text-gray-800 text-lg pt-2">Home</a>

              <div className="">
                <button
                  onClick={() => setIsOpenCategory(!isOpenCategory)}
                  className="text-gray-800 text-lg py-2 flex items-center"
                >
                  Shop by Category
                  <ChevronDown
                    className={`h-5 w-5 ml-2 transition-transform ${
                      isOpenCategory ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpenCategory && (
                  <motion.div
                    className={`flex flex-col mt-2 space-y-2`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {categoryList.map((category,index)=>(
                                     <a key={index} className="text-gray-700 text-sm py-1" href={"/category/"+category.attributes.name}>{category.attributes.name}</a>
                          ))}
                    {/* <a href="/categories" className="text-gray-700 text-sm py-1">Denim Jeans</a>
                    <a href="/categories" className="text-gray-700 text-sm py-1">Casual Shirts</a>
                    <a href="/categories" className="text-gray-700 text-sm py-1">Suits</a>
                    <a href="/categories" className="text-gray-700 text-sm py-1">Jackets</a> */}
                  </motion.div>
                )}
              </div>

              <a href="/categories" className="text-gray-800 text-lg py-2">About</a>
              <a href="/categories" className="text-gray-800 text-lg py-2">Contact</a>
            </div>
          </div>
        </motion.div>
      )}
  

      </header>

      {/* Bottom Menu for Mobile */}
     
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <Link href={'/Wishlist'} aria-label="Wishlist" className="text-gray-700 flex flex-col items-center">
            <Heart className="h-6" />
            <span className="text-xs">Wishlist</span>
          </Link>
          <button aria-label="Search" className="text-gray-700 flex flex-col items-center" onClick={() => setIsOpenSearch(true)}>
            <SearchIcon className="h-6" />
            <span className="text-xs">Search</span>
          </button>
          <button aria-label="Categories" className="text-gray-700 flex flex-col items-center" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6" />
            <span className="text-xs">Categories</span>
          </button>
          <Link href={`${!isLogin ?'/SignIn': '/profile'}`} aria-label="Account" className="text-gray-700 flex flex-col items-center">
            <User2Icon className="h-6" />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
     
    </>
  );
};

export default Header;



