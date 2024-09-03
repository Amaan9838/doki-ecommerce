'use client';

import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:1337/api/auth/forgot-password', { email });
      setMessage('An email has been sent with instructions to reset your password.');
      setError('');
    } catch (error) {
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='mt-[120px]'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
