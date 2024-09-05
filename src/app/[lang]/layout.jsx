// 'use client';
import { Raleway } from 'next/font/google';
import './globals.css';
// import { Toaster } from '@/components/ui/toaster';
// import Footer from  '@/app/_components/Footer';
// import Header from '@/app/_components/Header';
// import { UpdateCartContext } from '@/app/_context/UpdateCartContext';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import { UpdateWishlistContext } from '@/app/_context/UpdateWishlistContext';
import { getDictionary } from "./dictionaries";
import MainLayout from "./_components/main-layout";
import { GoogleAnalytics } from '@next/third-parties/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export default async function RootLayout({ children, params: { lang } }) {
  const dict = await getDictionary(lang);
  // const locale = params.locale;

  // if (!locale) {
  //   notFound();
  // }

  // const pathname = usePathname();
  // const [updateCart, setUpdateCart] = useState(false);
  // const [updateWishlist, setUpdateWishlist] = useState(false);

  // const showHeader = pathname !== '/SignIn' && pathname !== '/SignUp';
  // const messages =  getMessages();

  return (
    <html lang={lang}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://dokicollections.com" />
      </head>
      <body className={raleway.className}>
        {/* <NextIntlClientProvider locale={locale}> */}
      <MainLayout dict={dict} lang={lang}>
      {children}
      </MainLayout>
          {/* <UpdateWishlistContext.Provider value={{ updateWishlist, setUpdateWishlist }}>
            <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
              {showHeader && <Header />}
              {children}
              {showHeader && <Footer />}
              <Toaster /> */}
            {/* </UpdateCartContext.Provider> */}
          {/* </UpdateWishlistContext.Provider> */}
        {/* </NextIntlClientProvider> */}
        <GoogleAnalytics gaId="G-RERCB1HZDM" />
      </body>
    </html>
  );
}
