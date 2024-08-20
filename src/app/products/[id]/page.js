// 'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import ProductDetailsPage from '../../_components/ProductDetailsPage'; // Adjust the path accordingly
import products from '../../data/productsData.json'; // Import the static product data

// Simulate product data
// const products = [
//   {
//     id: '1',
//     name: 'THE DANTE OVERSHIRT - NAVY BLUE',
//     images: [
//       'https://754969b0.rocketcdn.me/clotya/wp-content/uploads/2022/04/overshirt1.jpg'
//     ],
//     rating: 4.5,
//     reviews: 32,
//     price: 59.99,
//     description: 'The Dante overshirt is the perfect mix of a jacket and a shirt and is a great item for a smart casual look.',
//     fullDescription: 'This classic overshirt is crafted from high-quality materials for a comfortable fit. Its versatile design makes it ideal for layering over t-shirts or under jackets.',
//     sku: 'COS123',
//     categories: ['Clothing', 'Outerwear'],
//     tags: ['new', 'trending'],
  
//   },
//   {
//     id: '2',
//     name: 'Ceramic Coffee Cup',
//     images: [
//       'https://klbtheme.com/clotya/wp-content/uploads/2022/04/cup1.jpeg'
//     ],
//     rating: 4,
//     reviews: 18,
//     price: 15.95,
//     description: 'Enjoy your favorite beverage in this sleek ceramic coffee cup.',
//     fullDescription: 'This ceramic coffee cup features a modern design and durable build, making it perfect for everyday use. Its minimalist aesthetic complements any kitchen decor.',
//     sku: 'CCC456',
//     categories: ['Kitchenware', 'Drinkware'],
//     tags: ['bestseller', 'eco-friendly'],
//   },
//   {
//     id: '3',
//     name: 'Zipped Jacket',
//     images: [
//       'https://754969b0.rocketcdn.me/clotya/wp-content/uploads/2022/04/zipped1.jpeg'
//     ],
//     rating: 5,
//     reviews: 45,
//     price: 89.95,
//     description: 'A sleek and modern zipped jacket, perfect for cool weather.',
//     fullDescription: 'This zipped jacket is made from premium materials to keep you warm and stylish. Its modern cut and design make it a must-have for any wardrobe.',
//     sku: 'ZJ789',
//     categories: ['Clothing', 'Outerwear'],
//     tags: ['limited edition', 'premium'],
//   },
//   {
//     id: '4',
//     name: 'Pocket Men\'s Shirt',
//     images: [
//       'https://klbtheme.com/clotya/wp-content/uploads/2022/04/pocketmen1.jpeg'
//     ],
//     rating: 4.2,
//     reviews: 27,
//     price: 49.99,
//     description: 'A comfortable and stylish men\'s shirt with convenient pockets.',
//     fullDescription: 'This men\'s shirt combines style and functionality with its comfortable fit and practical pockets. Perfect for both casual and formal occasions.',
//     sku: 'PMS321',
//     categories: ['Clothing', 'Shirts'],
//     tags: ['classic', 'versatile'],
//   },
//   {
//     id: '5',
//     name: 'Icon Denim Jacket',
//     images: [
//       'https://us.icon-amsterdam.com/cdn/shop/files/1_f7a18344-ce36-4de1-bb26-eae953f2e2d7.jpg?v=1718733547&width=800'
//     ],
//     rating: 4.8,
//     reviews: 40,
//     price: 99.99,
//     description: 'A classic denim jacket that never goes out of style.',
//     fullDescription: 'This Icon Denim Jacket is a timeless piece, perfect for layering over any outfit. Made with durable denim, it offers both comfort and long-lasting wear.',
//     sku: 'IDJ654',
//     categories: ['Clothing', 'Jackets'],
//     tags: ['denim', 'timeless'],
//   }
// ];

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }) {
  const { id } = params;
  const product = products.find((product) => product.id === id);

  if (!product) {
    return notFound();
  }

  return   (<ProductDetailsPage product={product}/>)
;
}
