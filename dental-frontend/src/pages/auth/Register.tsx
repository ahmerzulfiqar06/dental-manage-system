import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import './auth.css';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register(name, email, password, role);
    if (!ok) return setError('User already exists');
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrap">
      <motion.div className="auth-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Create account</h1>
        <p className="muted">Register to book and manage your appointments.</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={onSubmit} className="auth-form">
          <label>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="John Doe" required />
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn btn-primary" type="submit">Create account</button>
        </form>
        <div className="auth-foot">
          <span>Have an account?</span> <Link to="/login">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;


