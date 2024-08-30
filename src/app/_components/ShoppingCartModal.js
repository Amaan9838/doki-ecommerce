'use client';

import React, { useEffect, useState } from 'react';
import { X, ShoppingCart, Lock, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalApi from '../_utils/GlobalApi';

const ShoppingCartModal = ({ isOpen, onClose, cartItemsList, onDeleteItem }) => {
  const jwt = sessionStorage.getItem('jwt');
  const user= JSON.parse(sessionStorage.getItem('user'));

  const [quantities, setQuantities] = useState({});
  const[subTotal,setSubTotal]=useState(0);
  const router =  useRouter();

  useEffect(()=>{
let total=0;
cartItemsList.forEach(element=>{
  total= total + element.amount * element.quantity;
});
setSubTotal(total)

const initialQuantities = {};
cartItemsList.forEach((item) => {
  initialQuantities[item.id] = item.quantity;
});
setQuantities(initialQuantities);
  },[cartItemsList])


  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    const updatedQuantities = {
        ...quantities,
        [id]: newQuantity,
    };
    setQuantities(updatedQuantities);

    // Find the item to update
    const itemToUpdate = cartItemsList.find((item) => item.id === id);

    if (itemToUpdate) {
        const updatedItem = {
            ...itemToUpdate,
            quantity: newQuantity,
            amount: itemToUpdate.amount * newQuantity,
        };

        // Call the API to update the cart item
        GlobalApi.updateCartItem(id, updatedItem, jwt)
            .then(() => {
                // Optionally, refetch the cart items or just update the subtotal locally
                const updatedSubTotal = cartItemsList.reduce((total, item) => {
                    const quantity = item.id === id ? newQuantity : item.quantity;
                    return total + item.amount * quantity;
                }, 0);
                setSubTotal(updatedSubTotal);
            })
            .catch(err => {
                console.error("Error updating cart item:", err);
                // Handle error (e.g., show a notification)
            });
    }
};
const Checkout=()=>{
  onClose()
  router.push(jwt?'/checkout':'/SignIn')
}
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div
        className={`bg-white w-full max-w-lg mx-auto rounded-lg shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="flex flex-col h-[90vh]">
          <div className="p-6 bg-gradient-to-r from-gray-700 to-black text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center">
                <ShoppingCart className="mr-2" />
                Your Cart
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-white text-purple-600 rounded-full text-sm font-semibold">
                {cartItemsList.length}
                </span>
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

          </div>

          <div className="flex-grow overflow-y-auto p-6">
           {cartItemsList.length==0?(
          <p className="text-center text-gray-500">Your cart is empty.</p>):(
              
      
              <div className="space-y-6">
              {cartItemsList.map((cart,index)=>(
              
                  <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <>
                    <img
                      src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image}
                      alt={cart.name}
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-700 text-lg">
                      {cart.name}
                      </h3>
                      <p className="text-gray-900 font-bold mt-1">
                        ${cart.amount}
                      </p>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <div className="flex items-center bg-white rounded-full shadow-md">
                        <button
                           onClick={() => handleQuantityChange(cart.id, quantities[cart.id] - 1)}
                          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 font-semibold text-gray-700">
                        {quantities[cart.id]}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(cart.id, quantities[cart.id] + 1)}
                          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={()=> onDeleteItem(cart.id)}
                        className="mt-2 text-red-500 hover:text-red-700 transition-colors p-2 rounded-full"
                      >
                        Remove
                      </button>
                    </div>
                     </>
                  </div>
                ))}
            
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ${subTotal.toFixed(2)} USD
              </span>
            </div>
                
            <button onClick={()=>Checkout()} className="w-full bg-black text-white py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
              <Lock size={20} className="mr-2" />
              CHECKOUT SECURELY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
// 'use client';

// import React, { useContext, useState } from 'react';
// import { X, ShoppingCart, Lock, Plus, Minus } from 'lucide-react';
// import { CartContext } from '../contexts/CartContext';
// import { useRouter } from 'next/navigation';
// import GlobalApi from '../_utils/GlobalApi';

// const ShoppingCartModal = ({ isOpen, onClose, product }) => {
// const jwt = sessionStorage.getItem('jwt');
// const user= JSON.parse(sessionStorage.getItem('user'));
//   // const {
//   //   cartItems,
//   //   updateQuantity,
//   //   removeFromCart,
//   //   getTotalItems,
//   //   getTotalPrice,
//   // } = useContext(CartContext);
//   // const {
//   //   cartItems,
//   //   updateQuantity,
//   //   removeFromCart,
//   //   getTotalItems,
//   //   getTotalPrice,
//   // } = useContext(CartContext);
//   const [quantity, updateQuantity]= useState(1);
// const router =  useRouter();
// const [totalPrice, setTotalPrice] = useState(
//   product?.attributes?.discount ?(product?.attributes?.price * (1 - product?.attributes?.discount / 100)).toFixed(2): product?.attributes?.price
// )
// const addToCart = ()=>{
//   if (!jwt){
//     router.push("/SignIn");
//     return;
//   }
//   const data={
//    data:{
//     quantity: quantity,
//     amount: (quantity*productTotalPrice).toFixed(2),
//     products: product.id,
//     users_permissions_user: user.id,
//    }
//   }
//   GlobalApi.addToCart(data,jwt).then(resp=>{
//   console.log(resp);  
//   })
// }
// // console.log("this is product information", product.id);

//   // const itemCount = getTotalItems();

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
//         isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//       }`}
//     >
//       <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
//       <div
//         className={`bg-white w-full max-w-lg mx-auto rounded-lg shadow-2xl transition-all duration-300 ${
//           isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
//         }`}
//       >
//         <div className="flex flex-col h-[90vh]">
//           <div className="p-6 bg-gradient-to-r from-gray-700 to-black text-white rounded-t-lg">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold flex items-center">
//                 <ShoppingCart className="mr-2" />
//                 Your Cart
//                 <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-white text-purple-600 rounded-full text-sm font-semibold">
//                   {quantity}
//                 </span>
//               </h2>
//               <button
//                 onClick={onClose}
//                 className="text-white hover:text-gray-200 transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="mt-4">
//               <p className="text-sm font-medium">
//                 Spend $0.10 more for free shipping!
//               </p>
//               <div className="w-full bg-white bg-opacity-30 h-2 mt-2 rounded-full overflow-hidden">
//                 <div className="w-3/4 bg-white h-full rounded-full"></div>
//               </div>
//             </div>
//           </div>

//           <div className="flex-grow overflow-y-auto p-6">
//             {product.id.length === 0 ? (
//               <p className="text-center text-gray-500">Your cart is empty.</p>
//             ) : (
//               <div className="space-y-6">
//                 {product.id.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
//                   >
//                     <img
//                       src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + item?.attributes?.image?.data[0]?.attributes?.url}
//                       alt={item?.attributes?.title}
//                       className="w-24 h-24 object-cover rounded-md mr-4"
//                     />
//                     <div className="flex-grow">
//                       <h3 className="font-semibold text-gray-700 text-lg">
//                         {item.name.length > 30
//                           ? `${item?.attributes?.title.slice(0, 30)}...`
//                           : item?.attributes?.title}
//                       </h3>
//                       <p className="text-gray-600 font-bold mt-1">
//                         ${item?.attributes?.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="flex flex-col items-center ml-4">
//                       <div className="flex items-center bg-white rounded-full shadow-md">
//                         <button
//                         disabled={quantity==1}
//                           onClick={() =>
//                             updateQuantity(quantity - 1)
//                           }
//                           className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-3 py-1 font-semibold text-gray-700">
//                           {quantity}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateQuantity(quantity + 1)
//                           }
//                           className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                       <button
//                         onClick={() => removeFromCart(item)}
//                         className="mt-2 text-red-500 hover:text-red-700 transition-colors p-2 rounded-full"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="p-6 bg-gray-50 rounded-b-lg">
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-xl font-bold text-gray-800">Total</span>
//               <span className="text-2xl font-bold text-gray-900">
//                 ${totalPrice} USD
//               </span>
//             </div>
//             <button className="w-full bg-black text-white py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
//               <Lock size={20} className="mr-2" />
//               CHECKOUT SECURELY
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCartModal;
