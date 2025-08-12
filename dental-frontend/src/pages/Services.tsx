import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiHeart, FiAward, FiStar, FiClock, FiDollarSign } from 'react-icons/fi';
import './Services.css';

const Services: React.FC = () => {
  const services = [
    {
      icon: <FiShield size={40} />,
      title: 'General Checkup',
      description: 'Comprehensive oral health examination and preventive care to maintain your dental wellness.',
      features: ['Oral examination', 'X-rays', 'Cleaning', 'Fluoride treatment'],
      price: 'From $150',
      duration: '60 min',
    },
    {
      icon: <FiHeart size={40} />,
      title: 'Teeth Whitening',
      description: 'Professional whitening treatment to brighten your smile and boost your confidence.',
      features: ['Professional grade', 'Safe procedure', 'Immediate results', 'Long-lasting'],
      price: 'From $300',
      duration: '90 min',
    },
    {
      icon: <FiAward size={40} />,
      title: 'Dental Implants',
      description: 'Permanent solution for missing teeth using state-of-the-art implant technology.',
      features: ['Titanium implants', 'Natural appearance', 'Permanent solution', 'Bone preservation'],
      price: 'From $2000',
      duration: '2-3 visits',
    },
    {
      icon: <FiStar size={40} />,
      title: 'Root Canal',
      description: 'Advanced endodontic treatment to save your natural tooth and eliminate pain.',
      features: ['Pain relief', 'Tooth preservation', 'Advanced technology', 'High success rate'],
      price: 'From $800',
      duration: '90-120 min',
    },
    {
      icon: <FiHeart size={40} />,
      title: 'Crown & Bridge',
      description: 'Restore damaged teeth or replace missing ones with custom-made crowns and bridges.',
      features: ['Custom made', 'Natural appearance', 'Durable materials', 'Perfect fit'],
      price: 'From $1200',
      duration: '2 visits',
    },
    {
      icon: <FiShield size={40} />,
      title: 'Emergency Care',
      description: '24/7 emergency dental services for urgent dental problems and pain relief.',
      features: ['24/7 availability', 'Immediate relief', 'Same day treatment', 'Pain management'],
      price: 'From $200',
      duration: 'As needed',
    },
  ];

  return (
    <motion.div
      className="services-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div
            className="services-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Dental Services</h1>
            <p>Comprehensive dental care tailored to your needs with the latest technology and techniques</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card-detailed"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon-large">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                
                <div className="service-meta">
                  <div className="service-price">
                    <FiDollarSign size={16} />
                    <span>{service.price}</span>
                  </div>
                  <div className="service-duration">
                    <FiClock size={16} />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <Link to="/booking" className="btn btn-primary service-cta">
                  Book Appointment
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose DentalCare?</h2>
            <p>Experience the difference with our patient-centered approach</p>
          </motion.div>
          
          <div className="benefits-grid">
            {[
              {
                icon: <FiAward size={32} />,
                title: 'Expert Team',
                description: 'Board-certified dentists with years of experience'
              },
              {
                icon: <FiStar size={32} />,
                title: 'Latest Technology',
                description: 'State-of-the-art equipment for precise treatment'
              },
              {
                icon: <FiShield size={32} />,
                title: 'Safety First',
                description: 'Strict sterilization and safety protocols'
              },
              {
                icon: <FiHeart size={32} />,
                title: 'Patient Comfort',
                description: 'Comfortable environment with sedation options'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            className="cta-content text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Get Started?</h2>
            <p>Book your appointment today and take the first step towards a healthier smile</p>
            <Link to="/booking" className="btn btn-accent btn-large">
              Schedule Your Visit
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
