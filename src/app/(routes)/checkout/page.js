'use client';
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import CheckoutPage from "@/app/_components/CheckoutPage.jsx";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "@/app/_components/Loader";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const jwt = sessionStorage.getItem('jwt');
  const [cartItemsList, setCartItemsList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState(null);
  const shippingFee = 5.00;

  useEffect(() => {
    if (!jwt) {
      router.push('/SignIn'); 
    }
    getCartItems();
  }, []);

  useEffect(() => {
    if (cartItemsList.length > 0) {
      let total = 0;
      cartItemsList.forEach(element => {
        total += element.amount * element.quantity;
      });
      const calculatedSubTotal = parseFloat(total.toFixed(2));
      setSubTotal(calculatedSubTotal);
      setTotalAmount((calculatedSubTotal + shippingFee).toFixed(2));
    }
  }, [cartItemsList]);

  const getCartItems = async () => {
    setLoading(true);
    const cartItemsList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItems(cartItemsList_.length);
    setCartItemsList(cartItemsList_);
    setLoading(false);
  };

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen mt-[70px]">
      <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-12">
        <div className="bg-background rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Delivery</h2>
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Payment</h2>
              {totalAmount !== null && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: "payment",
                    amount: convertToSubcurrency(totalAmount),
                    currency: "usd",
                  }}
                >
                  <CheckoutPage amount={totalAmount} cartItemsList={cartItemsList}/>
                </Elements>
              )}
            </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="grid gap-4">
            {cartItemsList.map((cart, index) => (
              <div key={index} className="grid grid-cols-[80px_1fr_80px] items-center gap-4">
                <img
                  src={cart.image}
                  alt={cart.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-medium">{cart.name}</h3>
                  <div className="flex">
                    <p className="text-muted-foreground">Black / M</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">${cart.amount}</p>
                  <p className="text-muted-foreground">Qty: {cart.quantity}</p>
                </div>
              </div>
            ))}
            <hr className="my-4" />
            <div className="grid grid-cols-2 items-center">
              <p className="text-muted-foreground">Subtotal:</p>
              <p className="text-right font-medium">${subTotal}</p>
              <p className="text-muted-foreground">Shipping:</p>
              <p className="text-right font-medium">${shippingFee.toFixed(2)}</p>
              <p className="text-lg font-bold">Total:</p>
              <p className="text-right text-lg font-bold">${totalAmount}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}