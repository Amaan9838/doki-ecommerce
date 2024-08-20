import Image from "next/image";
import ProductDetailsPage from './_components/ProductDetailsPage';
import Header from './_components/Header';
import Slideshow from './_components/Slideshow';
import ProductCarousel from './_components/ProductCarousel';
import PopularCategories from './_components/PopularCategories';
import MiddleNav from './_components/MiddleNav';
import Slowshow from './_components/Slowshow';
import FeatureSection from './_components/FeatureSection';
import LimitedOffer from './_components/LimitedOffer';
import TopCategories from './_components/TopCategories';
import Testimonials from './_components/Testimonials';
import GridSection from './_components/GridSection';

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


export default function Home() {
  return (
    <>
       
        <Slideshow/>
        <div className="lg:mx-5 mx-2.5  py-6">
  
  <GridSection/>
  <PopularCategories/>

  {/* <Slowshow/> */}
  <div className="mt-6 flex justify-center items-center">
  <MiddleNav/>
  </div>
  <h2 className="text-2xl font-semibold mt-14 pt-6 px-6">Featured Collections</h2>
   <h3 className="text-4xl font-bold mt-2 pt-4 pb-10 px-6">Our Top Seller Products</h3>
  <ProductCarousel />
  <LimitedOffer/>
  <TopCategories/>
  <FeatureSection/>

  <Testimonials/>
  </div>
  {/* <ProductDetailsPage product={sampleProductData}/> */}
</>
  );
}
