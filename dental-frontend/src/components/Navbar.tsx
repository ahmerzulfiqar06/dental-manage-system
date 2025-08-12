import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-left">
              <a href="tel:+15551234567" className="top-link" aria-label="Phone">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </a>
              <a href="mailto:info@dentalcare.com" className="top-link" aria-label="Email">
                <span>✉️</span>
                <span>info@dentalcare.com</span>
              </a>
            </div>
            <div className="top-right">
              <a href="tel:+15559876543" className="top-cta">Emergency? Call us 24/7</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <motion.div
                className="logo-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 10C65 10 75 20 75 35C75 50 65 60 50 60C35 60 25 50 25 35C25 20 35 10 50 10Z"
                    stroke="url(#logoGradient)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M35 35C35 30 40 25 50 25C60 25 65 30 65 35"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              <span className="logo-text">DentalCare</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/booking" className="btn btn-primary nav-cta">
                Book Appointment
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
{isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mobile-cta"
              >
                <Link to="/booking" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                  Book Appointment
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
