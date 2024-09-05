// Server Component (PopularCategories.tsx)
import { getDictionary } from "@/app/[lang]/dictionaries";
import PopularCategoriesClient from './PopularCategoriesClient'; // The client component

const PopularCategories = async ({ lang }) => {
  const dict = await getDictionary(lang);
console.log("this is the lang:", lang)
  return <PopularCategoriesClient dict={dict} lang={lang} />;
};

export default PopularCategories;
