'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('code');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/reset-password`, {
        code: query, // Code from the reset password link
        password,
        passwordConfirmation,
      });
      setMessage('Your password has been reset successfully.');
      setError('');
      router.push('/SignIn'); // Redirect to login page
    } catch (error) {
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
        <form onSubmit={handleResetPassword} className='space-y-4'>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>New Password</label>
            <input
              id='password'
              type='password'
              placeholder='Enter your new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label htmlFor='passwordConfirmation' className='block text-sm font-medium text-gray-700'>Confirm New Password</label>
            <input
              id='passwordConfirmation'
              type='password'
              placeholder='Confirm your new password'
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Reset Password
          </button>
          {message && <p className='text-green-500 text-center'>{message}</p>}
          {error && <p className='text-red-500 text-center'>{error}</p>}
        </form>
      </div>
    </div>
  );
};

const ResetPassword = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPasswordForm />
  </Suspense>
);

export default ResetPassword;
