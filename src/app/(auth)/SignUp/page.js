'use client';
import React, { useState,useEffect } from 'react';
import Link from "next/link";
import GlobalApi from '../../_utils/GlobalApi.jsx';
import { useRouter } from 'next/navigation';
import Image from 'next/image.js';
import { LoaderIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"



const SignUp = () => {
  const router = useRouter();
const { toast } = useToast()
  
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(); // Add loading state


  useEffect(()=>{
    const jwt = sessionStorage.getItem('jwt');
    if (jwt){
      router.push("/");
    }
      },[])

  const onCreateAccount = () => {
    setLoading(true);

    GlobalApi.registerUser(
      // firstName, lastName,
      username,
       email, password).then(resp => {
      console.log(resp.data.user);
      console.log(resp.data.jwt);
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt',resp.data.jwt);
      toast({title:'Account created sucessfully'});
      router.push('/');
      setLoading(false);
    },(e)=>{
      toast({title:`${e?.response?.data?.error?.message}`});
      setLoading(false);
    }
  
  );
  };

  return (
    <div className="flex justify-center">
      <div className="m-20 w-full max-w-[500px] p-4 sm:p-14 bg-white border border-gray-200 rounded-3xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <>
          <div className="text-center">
      <div className="flex items-center justify-center">  <Image unoptimized={true} src={'/brand_logo_large.png'} width={200} height={150} className="pb-4"/>
      </div>
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account?
              <Link
                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                href="/SignIn"
              >
                Sign in here
              </Link>
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
            <svg
              className="w-4 h-auto"
              width="46"
              height="47"
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
              Sign up with Google
            </button>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>
            {/* Form */}
            <>
              <div className="grid gap-y-4">
                {/* First Name Field */}
                {/* <div>
                  <label htmlFor="firstName" className="block text-sm mb-2 font-semibold text-gray-600 dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      aria-describedby="firstName-error"
                    />
                  </div>
                </div> */}

                {/* Last Name Field */}
                {/* <div>
                  <label htmlFor="lastName" className="block text-sm mb-2 font-semibold text-gray-600 dark:text-white">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      aria-describedby="lastName-error"
                    />
                  </div>
                </div> */}
       
     <div>
                  <label htmlFor="Username" className="block text-sm mb-2 font-semibold text-gray-600 dark:text-white">
                    User Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="Username"
                      name="Username"
                      className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(e) => setusername(e.target.value)}
                      placeholder="Enter your Username"
                      aria-describedby="firstName-error"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 font-semibold text-gray-600 dark:text-white">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      aria-describedby="email-error"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2 font-semibold text-gray-600 dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="password-error"
                    />
                  </div>
                </div><button
                onClick={()=>onCreateAccount()}
                disabled={!(username && email && password)}
              
                className="w-full uppercase py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-gray-800 text-gray-100 shadow-sm hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                {loading ? <LoaderIcon className='animate-spin'/>:  <span> Create your account</span>} 
              </button>
              </div>
            </>
          </div>
        </>
      </div>
    </div>
  );
};

export default SignUp;
