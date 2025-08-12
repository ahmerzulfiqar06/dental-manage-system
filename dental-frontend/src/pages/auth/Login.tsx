import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) return setError('Invalid credentials');
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrap">
      <motion.div className="auth-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Welcome back</h1>
        <p className="muted">Log in to manage appointments and your profile.</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={onSubmit} className="auth-form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
        <div className="auth-foot">
          <span>New here?</span> <Link to="/register">Create an account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;


