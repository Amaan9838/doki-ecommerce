// app/products/[id]/[slug]/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GlobalApi from '../../../_utils/GlobalApi.jsx';
import ProductDetailsPage from '../../../_components/ProductDetailsPage';
import Loader from '@/app/_components/Loader.js';
import { generateSlug } from '../../../_utils/slug';

const ProductDetails = () => {
  const { id, slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      GlobalApi.getProductById(id).then((resp) => {
        const fetchedProduct = resp.data.data;
        setProduct(fetchedProduct);

        // Check if the slug in the URL matches the generated slug from the product title
        const correctSlug = generateSlug(fetchedProduct.attributes.title);
        if (slug !== correctSlug) {
          // If the slug doesn't match, redirect to the correct URL
          router.replace(`/products/${id}/${correctSlug}`);
        }
      });
    }
  }, [id, slug, router]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return <ProductDetailsPage product={product} />;
};

export default ProductDetails;
