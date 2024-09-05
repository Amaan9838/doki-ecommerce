import Slideshow from './_components/Slideshow';
import ProductCarousel from './_components/ProductCarousel';
import PopularCategories from './_components/PopularCategories';
import MiddleNav from './_components/MiddleNav';
import { getDictionary } from "./dictionaries";

import FeatureSection from './_components/FeatureSection';
import LimitedOffer from './_components/LimitedOffer';
import TopCategories from './_components/TopCategories';
import Testimonials from './_components/Testimonials';
import GridSection from './_components/GridSection';
import GlobalApi from './_utils/GlobalApi';


export default async function Home({ params: { lang } }) {
  const categoryList=await GlobalApi.getCategoryList(lang);
  const productList=await GlobalApi.getProductList(lang);
  const dict = await getDictionary(lang);
console.log("lang:",lang);
  return (
    <>
       
        <Slideshow dict={dict} lang={lang}/>
        <div className="lg:mx-5 mx-2.5  py-6">
  
  <GridSection lang={lang} />
  <PopularCategories lang={lang} />

  {/* <Slowshow/> */}
  <div className="mt-6 flex justify-center items-center">
  <MiddleNav categoryList={categoryList} lang={lang} />
  </div>
  <h2 className="text-2xl font-semibold mt-14 pt-6 px-6">
    {/* Featured Collections */}
{dict.products.title}
  </h2>
   <h3 className="text-4xl font-bold mt-2 pt-4 pb-10 px-6">
    {/* Our Top Seller Products */}
{dict.products.sub_title}
    
    </h3>
  <ProductCarousel productList={productList}  lang={lang} />
  <LimitedOffer dict={dict} lang={lang} />
  <TopCategories dict={dict} lang={lang} />
  <FeatureSection dict={dict} lang={lang} />

  <Testimonials dict={dict} />
  </div>
  {/* <ProductDetailsPage product={sampleProductData}/> */}
</>
  );
}