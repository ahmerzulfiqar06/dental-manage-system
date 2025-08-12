import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Icons replaced with emojis for TypeScript compatibility
import './Home.css';

const Home: React.FC = () => {
  const services = [
    {
      icon: '🛡️',
      title: 'Preventive Care',
      description: 'Regular checkups and cleanings to keep your teeth healthy and prevent dental problems.',
    },
    {
      icon: '❤️',
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with veneers, whitening, and other cosmetic treatments.',
    },
    {
      icon: '🏆',
      title: 'Restorative Care',
      description: 'Repair damaged teeth with crowns, bridges, and advanced restoration techniques.',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Happy Patients' },
    { number: '15+', label: 'Years Experience' },
    { number: '99%', label: 'Success Rate' },
    { number: '24/7', label: 'Emergency Care' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'The best dental experience I\'ve ever had. Professional, caring, and pain-free treatment.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      text: 'Amazing results with my smile makeover. The team exceeded all my expectations.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      text: 'Gentle care and modern technology. My family and I are patients for life.',
      rating: 5,
    },
  ];

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-shapes">
            <motion.div
              className="shape shape-1"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="shape shape-2"
              animate={{
                y: [0, 20, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Perfect Smile
                <span className="text-gradient"> Starts Here</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-description"
              >
                Experience world-class dental care with our state-of-the-art technology and compassionate team. 
                We're committed to making your dental health journey comfortable and effective.
              </motion.p>
              
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/booking" className="btn btn-primary btn-large">
                  Book Appointment
                </Link>
                <Link to="/services" className="btn btn-secondary btn-large">
                  Our Services
                </Link>
              </motion.div>
              
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="stat-item">
                  <span style={{ marginRight: 6 }}>👥</span>
                  <span>5000+ Happy Patients</span>
                </div>
                <div className="stat-item">
                  <span style={{ marginRight: 6 }}>🕐</span>
                  <span>Same Day Appointments</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="image-container">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1600&auto=format&fit=crop"
                  alt="Modern dental care - patient smile treatment"
                  className="hero-img"
                />
                <div className="image-overlay">
                  <motion.div
                    className="floating-card"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span style={{ marginRight: 6 }}>⭐</span>
                    <span>5.0 Rating</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Services</h2>
            <p>Comprehensive dental care tailored to your needs</p>
          </motion.div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon">
                  <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/services" className="service-link">
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="stat-number"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>What Our Patients Say</h2>
            <p>Real stories from real patients</p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Transform Your Smile?</h2>
            <p>Book your consultation today and take the first step towards better oral health.</p>
            <Link to="/booking" className="btn btn-accent btn-large">
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
