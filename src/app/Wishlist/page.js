'use client'; // Ensure this is a client-side component
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Loader2Icon, ShoppingCartIcon } from "lucide-react";
import GlobalApi from '../_utils/GlobalApi';
import Loader from "../_components/Loader";
import { UpdateWishlistContext } from '../_context/UpdateWishlistContext';
import { useRouter } from 'next/navigation';
import { generateSlug } from "../_utils/slug";

export default function Wishlist() {
  const router = useRouter();
  const [wishlistItemsList, setWishlistItemsList] = useState([]);
  const { updateWishlist, setUpdateWishlist } = useContext(UpdateWishlistContext);

  const [loading, setLoading] = useState(false); // Add loading state
  const [wishlistLoading, setWishlistLoading] = useState(false); // Add loading state

  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Access sessionStorage only on the client side
    if (typeof window !== 'undefined') {
      setJwt(sessionStorage.getItem('jwt'));
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }
  }, []);

  const getWishlistItems =()=> {
    if (!jwt || !user) return;
    
    setLoading(true);
    GlobalApi.getWishlistItems(user.id, jwt).then(resp => {
      // console.log("Wishlist Items Resp:", resp);
      setWishlistItemsList(resp);
      setUpdateWishlist(!updateWishlist);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (jwt && user) {
      getWishlistItems();
    }
  }, [jwt, user]);

  const onDeleteWishlistItem = (id) => {
    setWishlistLoading(true);
    GlobalApi.deleteWishlistItems(id, jwt).then(resp => {
      setWishlistLoading(false);
      getWishlistItems();
    });
  }

  const addToCart = (item) => {
    // Implement add to cart logic here
    console.log("Add to cart", item);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-background py-12 mt-[65px]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:gap-8">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Your Wishlist</h2>
            <p className="text-muted-foreground">
              Items you've saved to your wishlist
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItemsList.map((item) => (
              // <a href={`/products/${item.productId}/${generateSlug(item.name)}`}>
              <div
                key={item.id}
                className="bg-card rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={800}
                    className="w-full h-64 object-cover"
                    style={{ aspectRatio: "600/500", objectFit: "cover" }}
                  />
                  <div onClick={() => onDeleteWishlistItem(item.id)} className="absolute top-[12%] right-3 sm:right-6 transform -translate-y-1/2 flex flex-col gap-2 transition-colors cursor-pointer">
                    <Heart className="text-red-500" fill="red" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-primary font-medium">${item.price}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => onDeleteWishlistItem(item.id)}
                      className="mt-4 bg-gray-200 text-gray-700 border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-300"
                    >
                      <TrashIcon className="w-4 h-4 mr-2" />
                      {wishlistLoading ? <Loader2Icon className="w-4 h-4 ml-2 animate-spin" /> : "Remove from Wishlist"}
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-4 bg-blue-600 text-white border border-blue-700 rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-700"
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              // </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
