import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupData, useSignUp } from '../hooks/pb/useSignUp';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, loading, error } = useSignUp()
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const signupData: SignupData = {
      email,
      password,
      passwordConfirm: password,
    }

    await signup(signupData)
    if (!error) {
      navigate("/dashboard")
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password" // Changed from text to password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <div>Password must be at least 8 characters long.</div>
        <br />
        <button type="submit" disabled={loading}>Signup</button>
        {loading && <p style={{ color: 'blue' }}>Loading .....</p>}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
      <Link to={'/auth-with-otp'}>Auth with OTP</Link>
    </div>
  );
};

export default Signup;
