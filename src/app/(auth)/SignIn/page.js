'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import GlobalApi from '../../_utils/GlobalApi.jsx';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { LoaderIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { toast } = useToast();
  
  const redirectTo = searchParams?.get('redirectTo') || '/'; // Default to home page if no redirect

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const jwt = sessionStorage.getItem('jwt');
      if (jwt) {
        router.push(redirectTo);
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [redirectTo, router]);

  const onSignIn = () => {
    setLoading(true);
    GlobalApi.SignIn(email, password).then(resp => {
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);
      toast({ title: 'Signed In successfully' });
      router.push(redirectTo);
    }).catch(e => {
      toast({ title: `${e?.response?.data?.error?.message}` });
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center">
      <div className="m-20 w-full max-w-[500px] p-4 sm:p-14 bg-white border border-gray-200 rounded-3xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Image unoptimized={true} src={'/brand_logo_large.png'} width={200} height={150} className="pb-4" />
          </div>
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in </h1>
          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-neutral-400">
            Don't have an account yet?
            <Link
              className="text-blue-600 decoration-2 ml-1 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              href={`/SignUp?redirectTo=${redirectTo}`}
            >
              Sign up here
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
            Sign in with Google
          </button>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
            Or
          </div>

          <div className="grid gap-y-4">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 font-semibold text-gray-600 dark:text-white">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required
                  placeholder='Enter your email'
                  aria-describedby="email-error"
                />
              </div>
              <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                Please include a valid email address so we can get back to you
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm mb-2 font-semibold text-gray-600 dark:text-white">
                  Password
                </label>
                <a
                  className="inline-flex items-center gap-x-1 font-semibold text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required
                  placeholder='Enter your password'
                  aria-describedby="password-error"
                />
              </div>
              <p className="hidden text-xs text-red-600 mt-2" id="password-error">
                Your password must be at least 8 characters long
              </p>
            </div>
            <button
              type="button"
              onClick={onSignIn}
              disabled={!email && !password}
              className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-gray-700 text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-600 dark:border-transparent dark:hover:bg-blue-500 dark:focus:ring-blue-600 ${loading ? 'cursor-wait' : ''}`}
            >
              {loading && <LoaderIcon className="w-4 h-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SignIn />
  </Suspense>
);

export default SuspenseWrapper;
