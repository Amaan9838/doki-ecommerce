'use client';
import React, { useContext,useState,useEffect } from "react";
// import { WishlistContext } from "../contexts/WishlistContext";
import Image from "next/image";
import { Heart, Loader2Icon } from "lucide-react";
import GlobalApi from '../_utils/GlobalApi';
import Loader from "../_components/Loader";
import { UpdateWishlistContext } from '../_context/UpdateWishlistContext';


export default function Component() {
  // const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const jwt = sessionStorage.getItem('jwt');
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [wishlistItemsList,setwishlistItemsList]=useState([]);
  const {updateWishlist,setUpdateWishlist}=useContext(UpdateWishlistContext);

  const [loading, setLoading] = useState(false); // Add loading state
  const [Wishlistloading, setWishlistloading] = useState(false); // Add loading state

  
  const getWishlistItems = ()=>{
    setLoading(true);
    GlobalApi.getWishlistItems(user.id,jwt).then(resp=>{
    console. log("WishlIst Items Resp:", resp);
    setwishlistItemsList(resp);
    setUpdateWishlist(!updateWishlist);
    setLoading(false);

    });
  }

  useEffect(()=>{
    if(jwt){
      getWishlistItems();
}
  },[]);

  const OnDeleteWishlistItem =(id)=>{
    setWishlistloading(true);
    GlobalApi.deleteWishlistItems(id,jwt).then(resp=>{
      // alert("Item removed !");
      setWishlistloading(false);
      getWishlistItems();
    })
  }
  if (loading) {
    return  <div className="flex justify-center items-center h-screen">
   <Loader/>
  </div>;
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
          <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItemsList.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative">
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+item.image} // Assuming you want to use the first image from the `images` array
                  alt={item.name}
                  width={500}
                  height={800}
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/500", objectFit: "cover" }}
                />
                <div className={`absolute top-[12%] right-3 sm:right-6 transform -translate-y-1/2 flex flex-col gap-2  transition-colors`}><Heart className="text-red-500" fill="red"/></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-primary font-medium">${item.price}</p>
                  <button
                    onClick={() => OnDeleteWishlistItem(item.id)}
                    className="mt-4 w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-300"
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Remove from Wishlist
                    {Wishlistloading ? <Loader2Icon className="w-4 h-4 ml-2 animate-spin"/>: ""}
                  </button>
                </div>
              </div>
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
