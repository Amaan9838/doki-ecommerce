"use client";

import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import GlobalApi from "../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { initGA, logEvent } from "@/lib/analytics"; 
import { UpdateCartContext } from "../_context/UpdateCartContext";

const CheckoutPage = ({ amount, cartItemsList }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    zip: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
   
    initGA(); // Initialize Google Analytics
    logEvent("Checkout", "Started"); // Log event when the user starts the checkout process
    gtag("event", "begin_checkout", {
      currency: "USD",  
      value: amount,
      items: [
        {
        item_id: `SKU_${cartItemsList[0].id}`,
        item_name: cartItemsList.name,
        price: cartItemsList.price,
        quantity: cartItemsList.quantity
      }
      ]
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username.trim()) errors.username = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.zip.trim()) errors.zip = "Postal Code is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    return errors;
  };

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await axios.post("/api/create-payment-intent", {
          amount: convertToSubcurrency(amount),
        });
        setClientSecret(response.data.clientSecret);
        setPaymentId(response.data.PaymentId);
      } catch (error) {
        console.error("Error fetching payment intent:", error);
        setErrorMessage("Failed to initialize payment. Please try again.");
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      // Form is valid, proceed with checkout
      console.log("Form is valid, proceed with checkout");
    }
  }, [formErrors, isSubmitting]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setFormErrors(validateForm());
    setIsSubmitting(true);

    const orderData = {
      data: 
        {
          paymentId: paymentId,
          totalOrderAmount: amount,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          zip: formData.zip,
          address: formData.address,
          userId: user.id,
          orderItemList:cartItemsList
        },
    };
    // alert(`Payment confirmed. Client Secret: ${clientSecret}, Payment ID: ${paymentId}, OrdedItem:${cartItemsList}, userId:${user.id}, address:${formData.address} ,zip: ${formData.zip} ,phone:${formData.phone}  ,email: ${formData.email}, username: ${formData.username}, jwt:${jwt}`);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error,paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: "if_required",
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}&payment_intent=${paymentId}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
    }
    // succeeded
    if(paymentIntent.status == 'succeeded'){
    await GlobalApi.createOrder(orderData, jwt).then(resp=>{
      cartItemsList.forEach((item,index) => {
        GlobalApi.deleteCartItems(item.id, jwt).then(resp=>{
        })
        setUpdateCart(!updateCart);
        toast({title:'Payment Successful'})
      })
      router.push('/order-confirmation')
      // logEvent("Purchase", "Completed", `Order ID: ${paymentId}`);
      gtag("event", "purchase", {
        transaction_id: paymentId,
        value: amount,
        shipping: 5.00,
        currency: "USD",  
        items: [
          {
          item_id: `SKU_${cartItemsList[0].id}`,
          item_name: cartItemsList.name,
          price: cartItemsList.price,
          quantity: cartItemsList.quantity
        }
        ]
      });
    })

    }else{
      alert("Payment not sucessfull")
    }
// alert("this is the sucess message:"+paymentIntent.status)
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {Object.keys(formData).map((key) => (
        <div key={key} className="grid gap-2">
          <label htmlFor={key} className="font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            id={key}
            name={key}
            type={key === "email" ? "email" : "text"}
            value={formData[key]}
            onChange={handleInputChange}
            placeholder={`Enter your ${key}`}
            className={`border rounded p-2 ${formErrors[key] ? "border-red-500" : ""}`}
          />
          {formErrors[key] && <p className="text-red-500 text-sm">{formErrors[key]}</p>}
        </div>
      ))}

      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full text-lg p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading? `Pay Now $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
