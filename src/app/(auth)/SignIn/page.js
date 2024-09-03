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
      <div className="m-10 lg:m-20 w-full lg:max-w-[500px] p-4 sm:p-14 bg-white border border-gray-200 rounded-3xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="text-center">
          <div className="flex items-center justify-center">
           <a href="/"><Image unoptimized={true} src={'/brand_logo_large.png'} width={200} height={150} className="pb-4" /></a> 
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
                  href="/forgot-password"
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
