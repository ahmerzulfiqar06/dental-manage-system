import React from 'react';
import { motion } from 'framer-motion';
// Icons replaced with emojis for TypeScript compatibility
import './About.css';

const About: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Dental Officer',
      specialization: 'General Dentistry & Cosmetic',
      experience: '15+ years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Dr. Johnson specializes in cosmetic dentistry and has transformed thousands of smiles with her gentle approach.',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Senior Dentist',
      specialization: 'Oral Surgery & Implants',
      experience: '12+ years',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Dr. Chen is an expert in dental implants and oral surgery, known for his precision and patient care.',
    },
    {
      name: 'Dr. Emily Davis',
      role: 'Orthodontist',
      specialization: 'Orthodontics & Braces',
      experience: '10+ years',
      image: 'https://images.unsplash.com/photo-1594824694996-dd4b64f6fe9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Dr. Davis specializes in creating beautiful, straight smiles using the latest orthodontic techniques.',
    },
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Patient-Centered Care',
      description: 'We put our patients first, ensuring comfort and satisfaction in every treatment.',
    },
    {
      icon: '🛡️',
      title: 'Quality & Safety',
      description: 'We maintain the highest standards of quality and safety in all our procedures.',
    },
    {
      icon: '🏆',
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from treatment to patient experience.',
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'We are committed to serving our community and building lasting relationships.',
    },
  ];

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About DentalCare</h1>
            <p>Dedicated to providing exceptional dental care with compassion, expertise, and state-of-the-art technology</p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <motion.div
              className="story-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Our Story</h2>
              <p>
                Founded in 2008, DentalCare has been serving the community for over 15 years with a commitment 
                to providing exceptional dental care. What started as a small practice has grown into a 
                comprehensive dental center, equipped with the latest technology and staffed by experienced professionals.
              </p>
              <p>
                Our mission is simple: to help our patients achieve and maintain optimal oral health while 
                providing a comfortable, stress-free experience. We believe that everyone deserves a healthy, 
                beautiful smile, and we're here to make that a reality.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Happy Patients</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern dental office"
                className="story-img"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </motion.div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="value-icon">
                  <span style={{ fontSize: '2rem' }}>{value.icon}</span>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="our-team">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Meet Our Team</h2>
            <p>Experienced professionals dedicated to your dental health</p>
          </motion.div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <div className="team-meta">
                    <span className="specialization">{member.specialization}</span>
                    <span className="experience">{member.experience}</span>
                  </div>
                  <p>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="our-mission">
        <div className="container">
          <motion.div
            className="mission-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Mission</h2>
            <p>
              To provide comprehensive, high-quality dental care in a comfortable, welcoming environment. 
              We are committed to helping our patients achieve optimal oral health through preventive care, 
              education, and personalized treatment plans tailored to their individual needs.
            </p>
            <div className="mission-points">
              <div className="mission-point">
                <span style={{ fontSize: '1.5rem' }}>❤️</span>
                <span>Compassionate Care</span>
              </div>
              <div className="mission-point">
                <span style={{ fontSize: '1.5rem' }}>🏆</span>
                <span>Excellence in Treatment</span>
              </div>
              <div className="mission-point">
                <span style={{ fontSize: '1.5rem' }}>👥</span>
                <span>Patient Education</span>
              </div>
              <div className="mission-point">
                <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                <span>Advanced Technology</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
