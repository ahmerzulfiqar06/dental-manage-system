import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiMessageCircle } from 'react-icons/fi';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log('Contact form data:', data);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    reset();
  };

  const contactInfo = [
    {
      icon: <FiPhone size={24} />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Emergency: +1 (555) 987-6543'],
      action: 'tel:+15551234567',
    },
    {
      icon: <FiMail size={24} />,
      title: 'Email',
      details: ['info@dentalcare.com', 'emergency@dentalcare.com'],
      action: 'mailto:info@dentalcare.com',
    },
    {
      icon: <FiMapPin size={24} />,
      title: 'Address',
      details: ['123 Dental Street', 'Health City, HC 12345'],
      action: '#',
    },
    {
      icon: <FiClock size={24} />,
      title: 'Hours',
      details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 3:00 PM', 'Sun: Emergency Only'],
      action: '#',
    },
  ];

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Contact Us</h1>
            <p>Get in touch with us for appointments, questions, or emergency care</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-info-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="contact-icon">
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex}>{detail}</p>
                  ))}
                </div>
                {info.action !== '#' && (
                  <a href={info.action} className="contact-action">
                    Contact Now
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="form-header">
                <FiMessageCircle size={32} />
                <h2>Send us a Message</h2>
                <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={errors.name ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      {...register('subject', { required: 'Please select a subject' })}
                      className={errors.subject ? 'error' : ''}
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Appointment Request</option>
                      <option value="emergency">Emergency</option>
                      <option value="insurance">Insurance Question</option>
                      <option value="billing">Billing Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {errors.subject && <span className="error-message">{errors.subject.message}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? 'error' : ''}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && <span className="error-message">{errors.message.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary form-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSend size={20} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              className="map-container"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Find Us</h3>
              <div className="map-placeholder">
                <FiMapPin size={48} />
                <p>Interactive Map</p>
                <span>123 Dental Street, Health City, HC 12345</span>
              </div>
              <div className="location-info">
                <h4>Easy to Find</h4>
                <p>
                  We're conveniently located in the heart of Health City, with easy access from 
                  major highways and public transportation. Plenty of parking available on-site.
                </p>
                <div className="location-features">
                  <div className="feature">
                    <span>🚗</span>
                    <span>Free Parking</span>
                  </div>
                  <div className="feature">
                    <span>🚌</span>
                    <span>Public Transport</span>
                  </div>
                  <div className="feature">
                    <span>♿</span>
                    <span>Wheelchair Accessible</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="emergency-section">
        <div className="container">
          <motion.div
            className="emergency-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Dental Emergency?</h2>
            <p>We provide 24/7 emergency dental care. Don't wait - call us immediately!</p>
            <div className="emergency-actions">
              <a href="tel:+15559876543" className="btn btn-accent emergency-btn">
                <FiPhone size={20} />
                Emergency Hotline
              </a>
              <span className="emergency-number">+1 (555) 987-6543</span>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
