'use client';

import React, { useState, useRef, useContext } from 'react';
import { Star, ChevronLeft, ChevronRight, Minus, Plus, Heart, LoaderIcon } from 'lucide-react';
import InnerImageZoom from 'react-inner-image-zoom';
import Slider from 'react-slick';
import { CartContext } from '../contexts/CartContext';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AccordionItem from './AccordionItem';
import { Ubuntu } from "next/font/google";
import GlobalApi from '../_utils/GlobalApi.jsx';
import CustomerReviews from './CustomerReviews';
import { WishlistContext } from '../contexts/WishlistContext';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import { UpdateWishlistContext } from '../_context/UpdateWishlistContext';

import ReviewSystem from './ReviewSystem.js';


const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300","400",'500',"700"] ,
  variable: '--font-ubuntu'
});

const ProductDetailsPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router =  useRouter();

  const jwt = sessionStorage.getItem('jwt');
  const user= JSON.parse(sessionStorage.getItem('user'));
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);
  const {updateWishlist,setUpdateWishlist}=useContext(UpdateWishlistContext);

  const [totalPrice, setTotalPrice] = useState(
    product?.attributes?.discount ?(product?.attributes?.price * (1 - product?.attributes?.discount / 100)).toFixed(2): product?.attributes?.price
  )
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(false); // Add loading state
 

  const [selectedColor, setSelectedColor] = useState(2);
  const [selectedSize, setSelectedSize] = useState('M');

  // const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  // console.log("this is the product detaisl:",product);

  // const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };


  
  const settings = {
    dots: false,
    fade: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };


  const addToCart = ()=>{
    setLoading(true);
    if (!jwt){
      router.push("/SignIn");
      setLoading(false);
      return;
    }
    const data={
     data:{
      products: product.id,
      quantity: quantity,
      amount: (quantity*totalPrice).toFixed(2),
      users_permissions_users: user.id,
      userId:user.id,
     }
    }
    console.log(data);
    GlobalApi.addToCart(data,jwt).then(resp=>{
    console.log("this is the data",resp);
    setUpdateCart(!updateCart);
    setLoading(false);

    },(e)=>{
      alert("got error while add to cart");
      setLoading(false);

    }
  )
  }

  const addToWishList = ()=>{
    setLoading(true);
    if (!jwt){
      router.push("/SignIn");
      setLoading(false);
      return;
    }
    const data={
     data:{
      products: product.id,
      users_permissions_users: user.id,
      userId:user.id,
     }
    }
    console.log(data);
    GlobalApi.addToWishList(data,jwt).then(resp=>{
    console.log("this is the data",resp);
    setUpdateWishlist(!updateWishlist);
    setLoading(false);

    },(e)=>{
      alert("got error while add to cart");
      setLoading(false);

    }
  )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image Gallery */}
        <div className="md:w-1/2 relative mb-8">
          <div className={`relative ${isFullScreen ? 'fixed inset-0 z-10 bg-white' : ''}`}>
            <div className="aspect-w-16 aspect-h-9">
              <Slider {...settings} ref={sliderRef}>

        {product.attributes.images.data.map((image, imgIndex) => (
          <div key={imgIndex} className="w-full h-full">
            <InnerImageZoom
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + image.attributes.url}
              zoomSrc={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + image.attributes.url}
              fullscreenOnMobile={true}
              zoomType="hover"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
              </Slider>
            </div>
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={() => addToWishList()}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow z-10 group-hover:bg-red-400"
            >
                          <div className={`hover:text-red-400 transition-colors `}><Heart/></div>

            </button>
          </div>
          <div className="flex overflow-x-auto mt-4">
         
             {product.attributes.images.data.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-1/5 px-2">
                <img
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + image.attributes.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-24 object-cover cursor-pointer transition-all duration-300 rounded-xl`}
                  onMouseEnter={() => sliderRef.current.slickGoTo(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className={` md:w-1/2 px-4 `}>
         <div className="flex justify-between items-center"> <h2 className={`${ubuntu.variable} font-sans text-2xl sm:text-3xl font-bold mb-2`}>{product.attributes.title}</h2>  </div>
          <div className={`${ubuntu.variable} font-sans flex items-center justify-center gap-1 bg-green-700 rounded-2xl w-[60px] mb-4`}>
          <span className='text-white font-semibold font-sans'>{product.rating}</span>
            <div className="flex text-white">
                <Star  size={15} fill='currentColor' />
            </div>
          </div>
          {/* <div className="text-xl sm:text-2xl font-bold mb-6">${product.price.toFixed(2)}</div> */}
          <div className={`${ubuntu.variable} font-sans flex flex-row gap-2 items-center mb-6`}>
          {product.attributes.discount !== null ? (
      <>
                  <p className="text-xl sm:text-2xl font-bold text-black">${(product.attributes.price * (1 - product.attributes.discount / 100)).toFixed(2)}</p>
                  {product.attributes.price && (
                    <p className="text-sm sm:text-lg line-through text-gray-700">${product.attributes.price}</p>
                 )} 
                  <div className="flex items-center justify-between text-green-700"><p className="text-xl sm:text-[16px] font-medium text-green-700"> {product.attributes.discount}% off</p> </div>
                
                </>
    ) : (
                 <p className="text-xl sm:text-2xl font-bold text-black">${product.attributes.price}</p>
                  
          )}
                </div>
          <div className="mb-6">
            {product.attributes.colors.data.legnth > 0 ? (
              <>
        <h2 className="text-lg font-semibold mb-2">Color</h2>
        <div className="flex space-x-2">
          {product.attributes.colors.data.map((color) => (
            <div
              key={color.id}
              className={`h-[20px] w-[20px] outline rounded-xl overflow-hidden cursor-pointer hover:border-black ${
                selectedColor === color.id ? 'outline-black outline-offset-2' : 'outline-gray-100 outline-offset-1'
              } focus:outline-none`}
              onClick={() => setSelectedColor(color.id)}
            >
              <div
               
                alt={color.attributes.color}
    
                className={` h-[20px] w-[20px] rounded-full `}
                style={{backgroundColor: color.attributes.Hex_Value}}
              />
            </div>
          ))}
        </div>
        </>
        ):("")}
      <div className='my-4'>
        <span
  className="inline-flex text-sm font-medium items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="-ms-1 me-1.5 size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  <p className="whitespace-nowrap text-sm">In stock</p>
</span>
<span
  className="inline-flex text-lg font-medium items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="-ms-1 me-1.5 size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  <p className="whitespace-nowrap text-sm">Out of stock</p>
</span>
</div>  
{product.attributes.sizes.data.length > 0 ? (
      <div className={`${ubuntu.variable} font-sans`}>
        <h2 className="text-lg font-semibold mb-2 mt-4">Size</h2>
        <div className="flex space-x-2 items-center">
          {product.attributes.sizes.data.map((size) => (
            <div
              key={size}
              className={`px-3 py-1 border-2 rounded-xl text-sm cursor-pointer hover:border-black ${
                selectedSize === size.attributes.size
                  ? 'bg-gray-900 text-white border-black'
                  : 'bg-white text-gray-900  border-gray-300'
              } focus:outline-none`}
              onClick={() => setSelectedSize(size.attributes.size)}
            >
              {size.attributes.size}
            </div>
          ))}
          <a href="#" className="text-blue-500 ml-4 text-sm">
            Size Chart
          </a>
        </div>

      </div>
      ):("")}
    </div>
          {/* Add to Cart */}
          <div className={`${ubuntu.variable} font-sans flex flex-col items-start gap-6 mb-8 `}>
          <button
              onClick={() => addToCart()}
              className="bg-black text-white lg:py-4 lg:px-32 px-16 py-2 md:px-28 sm:px-20 rounded-2xl hover:bg-gray-800 transition-colors duration-300 text-xl"
           disabled={loading}
           >
             {loading ? <LoaderIcon className='animate-spin'/>:  " Add to cart"}
            </button>
            {/* <ShoppingCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}  product={product.id}/> */}

            <div className="flex items-center border rounded-md mr-4">
              <button onClick={() => setQuantity(quantity - 1)} className="p-2">
                <Minus size={20} />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2">
                <Plus size={20} />
              </button>
            </div>
           
          </div>

          {/* Additional Info */}
         

          {/* Product Metadata */}
        
          <div className=" mx-auto mt-8">
    
      <AccordionItem title="Product Description" >
        <div>
          <p>{product.attributes.description}</p>
                  </div>
      </AccordionItem>
      <AccordionItem title="Shipping Info">

      <div  className="shipping-detail text-sm text-gray-600">
          <div className='mb-2'><p ><strong className='text-black'>United States :</strong>  $9.99 (Free for orders over $150)
          Delivery time: 4-8 business days</p></div>
          <span><strong className='text-black'>Canada :</strong>  $14.99 (Free for orders over $150)
          Delivery time: 4-8 business days</span>
         
        </div>
      {/* ))} */}
      </AccordionItem>
    
    </div>
        </div>
      </div>

      

      <div className="mx-auto my-6 px-4">
        <ReviewSystem itemId={product.id} reviewData={product.attributes.reviews.data}/>
        {/* <CustomerReviews/> */}
  
    </div>
    </div>
  );
};


 



export default ProductDetailsPage;
