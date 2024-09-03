'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const query  = searchParams.get('code');
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
        console.log("this is the code",query);
      await axios.post('http://localhost:1337/api/auth/reset-password', {
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
    <div className='m-[250px]'>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResetPassword;
