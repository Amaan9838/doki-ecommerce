'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Input = ({ label, id, type = 'text', defaultValue }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      defaultValue={defaultValue}
      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    readOnly
    />
  </div>
);

export default function Profile() {
  const router = useRouter();
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Only run this code on the client
    if (typeof window !== 'undefined') {
      const storedJwt = sessionStorage.getItem('jwt');
      const storedUser = JSON.parse(sessionStorage.getItem('user'));

      if (storedJwt && storedUser) {
        setJwt(storedJwt);
        setUser(storedUser);
      } else {
        router.push('/SignIn');
      }
    }
  }, [router]);

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/SignIn');
  };

  return (
    <div className="mt-[65px] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 shadow-xl rounded-lg overflow-hidden lg:flex">
          <div className="lg:w-1/3 bg-gray-800 p-8 text-white">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Orders</h3>
                <div className="flex items-center justify-between">
                  <Link href="/my-order" className="text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out">
                    View
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={onSignOut}
                className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="lg:w-2/3 p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Update Profile</h2>
            <form>
              <div className="grid sm:grid-cols-2 gap-4">
                {user && <Input label="User Name" id="username" defaultValue={user.username} />}
                {/* Uncomment and update the fields as necessary */}
                {/* <Input label="Last Name" id="lastName" defaultValue="Doe" /> */}
              </div>
              {user && <Input label="Email" id="email" type="email" defaultValue={user.email} />}
              {/* Uncomment to enable form submission */}
              {/* <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Update Changes
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
