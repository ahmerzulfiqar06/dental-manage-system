import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Appointment', path: '/booking' },
  ];

  const services = [
    'General Checkup',
    'Teeth Cleaning',
    'Teeth Whitening',
    'Dental Implants',
    'Root Canal',
    'Emergency Care',
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Company Info */}
            <motion.div
              className="footer-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M50 10C65 10 75 20 75 35C75 50 65 60 50 60C35 60 25 50 25 35C25 20 35 10 50 10Z"
                      stroke="url(#footerGradient)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M35 35C35 30 40 25 50 25C60 25 65 30 65 35"
                      stroke="url(#footerGradient)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <defs>
                      <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span>DentalCare</span>
              </div>
              <p className="footer-description">
                Providing exceptional dental care with state-of-the-art technology and a compassionate approach. 
                Your smile is our priority.
              </p>
              <div className="social-links">
                <motion.a
                  href="#"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Facebook"
                >
                  📘
                </motion.a>
                <motion.a
                  href="#"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Twitter"
                >
                  🐦
                </motion.a>
                <motion.a
                  href="#"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  📷
                </motion.a>
                <motion.a
                  href="#"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  💼
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="footer-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>Quick Links</h3>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              className="footer-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Our Services</h3>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link to="/services" className="footer-link">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="footer-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3>Contact Info</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FiMapPin size={18} />
                  <span>123 Dental Street, Health City, HC 12345</span>
                </div>
                <div className="contact-item">
                  <FiPhone size={18} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <FiMail size={18} />
                  <span>info@dentalcare.com</span>
                </div>
                <div className="contact-item">
                  <FiClock size={18} />
                  <span>Mon-Fri: 8AM-6PM, Sat: 9AM-3PM</span>
                </div>
              </div>
              <Link to="/booking" className="btn btn-primary footer-cta">
                Book Appointment
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} DentalCare. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
