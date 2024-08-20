'use client';

import React, { useState, useRef, useContext, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Minus, Plus, Share2, Maximize, Heart } from 'lucide-react';
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

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300","400",'500',"700"] ,
    variable: '--font-ubuntu'
});


const sections = [
  {
    image: 'https://us.icon-amsterdam.com/cdn/shop/files/FUNNEL_DANTE_3.jpg?v=1718370637&width=1000',
    title: 'What Our Customers Say',
    quote: 'I am always impressed with the quality and the service',
    description: 'We pride ourselves in providing you with the most modern designs and premium quality. Therefore, we continuously work in improving our products to be able to deliver you the best experience.',
    reverse: false,
  },
  {
    image: 'https://us.icon-amsterdam.com/cdn/shop/files/FUNNEL_DANTE_2.jpg?v=1718369331&width=1000',
    title: 'So Versatile',
    quote: 'You can wear it casual or dressy',
    description: 'The Dante Overshirt is the perfect base for any outfit. Having a more casual day? No problem, just combine them with a pair of jeans for a laid-back fit. Pair it with more dressy trousers and you have the perfect outfit for a more sophisticated occasion.',
    reverse: true,
  },
];



const ProductDetailsPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sliderRef = useRef(null);
  const { addToCart } = useContext(CartContext);

  const [selectedColor, setSelectedColor] = useState(2);
  const [selectedSize, setSelectedSize] = useState('M');

  const [productList, setProductList] = useState([]);
  useEffect( ()=>{
    getProductList( ) ;
  },[]) 
  
    const getProductList = ()=>{
    GlobalApi.getProducts().then(resp=>{
    console. log("CategoryList Resp:", resp.data.data );
    setProductList(resp.data.data);
    });
  }


  const colors = [
    { id: 0, src: 'https://us.icon-amsterdam.com/cdn/shop/files/1_982e1ddc-2aaf-4c40-b185-b941af340938.jpg?v=1718733180&width=800', alt: 'Teal shirt' },
    { id: 1, src: 'https://us.icon-amsterdam.com/cdn/shop/files/2_7c30f712-829b-4865-822e-88d9e3164e84.jpg?v=1718733838&width=800', alt: 'Black shirt' },
    { id: 2, src: 'https://us.icon-amsterdam.com/cdn/shop/files/1_f7a18344-ce36-4de1-bb26-eae953f2e2d7.jpg?v=1718733547&width=800', alt: 'Blue shirt' },
    { id: 3, src: 'https://us.icon-amsterdam.com/cdn/shop/files/1_6ddc7cba-7b50-4739-95f8-78635cf8cadf.jpg?v=1718734164&width=800', alt: 'Gray shirt' },
    // { id: 4, src: '/shirt-red.jpg', alt: 'Red shirt' },
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  const settings = {
    dots: false,
    fade: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} has been added to the cart.`);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image Gallery */}
        <div className="md:w-1/2 relative mb-8">
          <div className={`relative ${isFullScreen ? 'fixed inset-0 z-10 bg-white' : ''}`}>
            <div className="aspect-w-16 aspect-h-9">
              <Slider {...settings} ref={sliderRef}>
                {product.images.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <InnerImageZoom
                      src={image}
                      zoomSrc={image}
                      fullscreenOnMobile={true}
                      zoomType="hover"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
               {/* {productList.id.map((product, index) => (
      // Create a single slide for each product
      <div key={index} className="w-full h-full">
 
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
      </div>
    ))} */}
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
              // onClick={toggleFullScreen}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow z-10 group-hover:bg-red-400"
            >
                          <div className='hover:text-red-400'><Heart/></div>

            </button>
          </div>
          <div className="flex overflow-x-auto mt-4">
            {/* {product.images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-1/5 px-2">
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-24 object-cover cursor-pointer transition-all duration-300 rounded-xl`}
                  onMouseEnter={() => sliderRef.current.slickGoTo(index)}
                />
              </div>
            ))} */}
             {product.images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-1/5 px-2">
                <img
                  src={image}
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
         <div className="flex justify-between items-center"> <h2 className={`${ubuntu.variable} font-sans text-2xl sm:text-3xl font-bold mb-2`}>{product.name}</h2>  </div>
          <div className={`${ubuntu.variable} font-sans flex items-center justify-center gap-1 bg-green-700 rounded-2xl w-[60px] mb-4`}>
          <span className='text-white font-semibold font-sans'>{product.rating}</span>
            <div className="flex text-white">
                <Star  size={15} fill='currentColor' />
            </div>
          </div>
          {/* <div className="text-xl sm:text-2xl font-bold mb-6">${product.price.toFixed(2)}</div> */}
          <div className={`${ubuntu.variable} font-sans flex flex-row gap-2 items-center mb-6`}>
                  {product.originalPrice && (
                    <p className="text-sm sm:text-lg line-through text-gray-700">${product.originalPrice}</p>
                  )}
                  <p className="text-xl sm:text-2xl font-bold text-black">${product.price}</p>
                </div>
          {/* <p className="text-gray-600 mb-8 text-lg">{product.description}</p> */}

          <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Color</h2>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`w-16 h-[84px] border-[2px] rounded-xl overflow-hidden cursor-pointer hover:border-black ${
                selectedColor === color.id ? 'border-black' : 'border-gray-300'
              } focus:outline-none`}
              onClick={() => setSelectedColor(color.id)}
            >
              <img
                src={color.src}
                alt={color.alt}
    
                className="object-cover h-[90px] w-[66px] rounded-lg mt-[-1px]"
              />
            </div>
          ))}
        </div>
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
      <div className={`${ubuntu.variable} font-sans`}>
        <h2 className="text-lg font-semibold mb-2 mt-4">Size</h2>
        <div className="flex space-x-2 items-center">
          {sizes.map((size) => (
            <div
              key={size}
              className={`px-3 py-1 border-2 rounded-xl text-sm cursor-pointer hover:border-black ${
                selectedSize === size
                  ? 'bg-gray-900 text-white border-black'
                  : 'bg-white text-gray-900  border-gray-300'
              } focus:outline-none`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          ))}
          <a href="#" className="text-blue-500 ml-4 text-sm">
            Size Chart
          </a>
        </div>
      </div>
    </div>
          {/* Add to Cart */}
          <div className={`${ubuntu.variable} font-sans flex flex-col items-start gap-6 mb-8 `}>
          <button
              onClick={handleAddToCart}
              className="bg-black text-white lg:py-4 lg:px-32 px-16 py-2 md:px-28 sm:px-20 rounded-2xl hover:bg-gray-800 transition-colors duration-300 text-xl"
            >
              Add to cart
            </button>
            <div className="flex items-center border rounded-md mr-4">
              <button onClick={() => handleQuantityChange(-1)} className="p-2">
                <Minus size={20} />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="p-2">
                <Plus size={20} />
              </button>
            </div>
           
          </div>

          {/* Additional Info */}
         

          {/* Product Metadata */}
        
          <div className=" mx-auto mt-8">
    
      <AccordionItem title="Product Description" >
        <div>
          <h4 className={` font-semibold`}>Manufacture, Care and Fit</h4>
          <p>Mens White & Blue Partner In Crime Tie & Dye Oversized T-shirt</p>
          <p><span className={` font-semibold`}>Country of Origin</span> - India</p>
          <p><span className={` font-semibold`}>Manufactured By</span> - Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5, BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302</p>
          <p><span className={` font-semibold`}>Packed By</span> - Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5, BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302</p>
          <p><span className={` font-semibold`}>Commodity</span> - Mens T-Shirt</p>
        </div>
      </AccordionItem>
      <AccordionItem title="Shipping Info">
      {/* {product.shipping_info.map((shipping, index) => ( */}
      <div  className="shipping-detail text-sm text-gray-600">
          <div className='mb-2'><p ><strong className='text-black'>United States :</strong>  $9.99 (Free for orders over $150)
          Delivery time: 4-8 business days</p></div>
          <span><strong className='text-black'>Canada :</strong>  $14.99 (Free for orders over $150)
          Delivery time: 4-8 business days</span>
          {/* <span>
            <strong>{shipping.country} :</strong> {shipping.price} (Free for orders over {shipping.freeShippingThreshold})
            <br />
            Delivery time: {shipping.deliveryTime}
          </span> */}
        </div>
      {/* ))} */}
      </AccordionItem>
      <AccordionItem title="Product Specifications">
        <div>
          <ul className="list-disc pl-5">
            <li>Oversized fit - Super Loose On Body Thoda Hawa Aane De</li>
            <li>Single Jersey - Classic, lightweight jersey fabric comprising 100% cotton.</li>
          </ul>
        </div>
      </AccordionItem>
    </div>
        </div>
      </div>

      {/* Description Tab */}
      {/* <div className="mt-16">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Description</h3>
        <p className="text-gray-600">{product.fullDescription}</p>
      </div> */}

      <div className="mx-auto my-6 px-4">
        <CustomerReviews/>
        {/* <h3 className='text-4xl font-bold pb-10'>Key Highlights</h3>
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${section.reverse ? 'md:flex-row-reverse' : ''} mb-12`}
        >
          <div className="md:w-1/2">
            <img src={section.image} alt={section.title} className="w-full h-auto" />
          </div>
          <div className="md:w-1/2 flex items-center">
            <div className="p-8">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">{section.title.toUpperCase()}</h3>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.quote}</h2>
              <p className="text-gray-700">{section.description}</p>
            </div>
          </div>
        </div>
      ))} */}
    </div>
    </div>
  );
};


 



export default ProductDetailsPage;
