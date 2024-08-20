// 'use client';
import React from 'react';
// import { notFound } from 'next/navigation';
// import ProductDetailsPage from '../../_components/ProductDetailsPage'; // Adjust the path accordingly

// Simulate product data
// const products = [
//   {
//     id: '1',
//     name: 'Product 1',
//     images: ['/images/product1.jpg', '/images/product1-2.jpg'],
//     rating: 4,
//     reviews: 24,
//     price: 199.99,
//     description: 'This is a great product.',
//     fullDescription: 'This is a more detailed description of the product.',
//     sku: '12345',
//     categories: ['Electronics', 'Gadgets'],
//     tags: ['new', 'sale'],
//   },
//   // Add more products as needed
// ];


const sampleProductData = {
  name: "Basic High-Neck Puff Jacket",
  images: [
    "/jacket.jpg",
    "/jeans.jpg",
    "/tshirt.jpg",
    "/sweater.jpg",
    "/jacket.jpg"
  ],
  price: 89.00,
  rating: 4,
  reviews: 1,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  fullDescription: "Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.",
  sku: "SUAJK74",
  categories: ["JACKETS & COATS", "OUTERWEAR", "WOMEN"],
  tags: ["puff", "jacket", "winter"],
  inStock: true
};



export default function ProductPage() {
  

  return  ( <ProductDetailsPage product={sampleProductData}/>)
  ;
}
