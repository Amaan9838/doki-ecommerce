// pages/order-success.js
'use client';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

export default function OrderSuccess() {
  const router = useRouter();


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Order Successful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
            <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Order Successful!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>
        {/* <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-t-md">
              <p className="text-sm font-medium text-gray-500">Order ID</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{orderId || 'N/A'}</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-b-md">
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">${amount || '0.00'}</p>
            </div>
          </div>
        </div> */}
        <div className="mt-6">
          <a href="/" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}