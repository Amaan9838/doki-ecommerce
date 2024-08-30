import Slideshow from './_components/Slideshow';
import ProductCarousel from './_components/ProductCarousel';
import PopularCategories from './_components/PopularCategories';
import MiddleNav from './_components/MiddleNav';

import FeatureSection from './_components/FeatureSection';
import LimitedOffer from './_components/LimitedOffer';
import TopCategories from './_components/TopCategories';
import Testimonials from './_components/Testimonials';
import GridSection from './_components/GridSection';
import GlobalApi from './_utils/GlobalApi';


export default async function Home() {
  const categoryList=await GlobalApi.getCategoryList();
  const productList=await GlobalApi.getProductList();


  return (
    <>
       
        <Slideshow/>
        <div className="lg:mx-5 mx-2.5  py-6">
  
  <GridSection/>
  <PopularCategories/>

  {/* <Slowshow/> */}
  <div className="mt-6 flex justify-center items-center">
  <MiddleNav categoryList={categoryList}/>
  </div>
  <h2 className="text-2xl font-semibold mt-14 pt-6 px-6">Featured Collections</h2>
   <h3 className="text-4xl font-bold mt-2 pt-4 pb-10 px-6">Our Top Seller Products</h3>
  <ProductCarousel productList={productList} />
  <LimitedOffer/>
  <TopCategories/>
  <FeatureSection/>

  <Testimonials/>
  </div>
  {/* <ProductDetailsPage product={sampleProductData}/> */}
</>
  );
}
