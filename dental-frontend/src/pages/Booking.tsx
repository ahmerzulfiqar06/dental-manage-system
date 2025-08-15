import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { appointmentsApi, handleApiError } from '../services/api';
// Icons replaced with emojis for TypeScript compatibility
import './Booking.css';

interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const Booking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<BookingForm>();

  const services = [
    'General Checkup',
    'Teeth Cleaning',
    'Teeth Whitening',
    'Dental Filling',
    'Root Canal',
    'Crown & Bridge',
    'Dental Implants',
    'Orthodontics',
    'Emergency Care',
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const onSubmit = async (data: BookingForm) => {
    try {
      await appointmentsApi.createAppointment({
        service: data.service,
        appointmentDate: data.date,
        appointmentTime: data.time,
        notes: data.message,
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to create appointment:', error);
      // You can add error handling UI here
      alert(`Failed to create appointment: ${handleApiError(error)}`);
    }
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      const isValid = await trigger(['service', 'date', 'time']);
      if (!isValid) return;
    }
    if (currentStep === 2) {
      // Validate step 2 fields
      const isValid = await trigger(['firstName', 'lastName', 'email', 'phone']);
      if (!isValid) return;
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="booking-success"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="success-content">
            <motion.div
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
✅
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Appointment Booked Successfully!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Thank you for choosing DentalCare. We've sent a confirmation email with your appointment details.
              Our team will contact you shortly to confirm your appointment.
            </motion.p>
            <motion.div
              className="success-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
              >
                Book Another Appointment
              </button>
              <a href="/" className="btn btn-secondary">
                Back to Home
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="booking-hero">
        <div className="container">
          <motion.div
            className="booking-header"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Book Your Appointment</h1>
            <p>Schedule your visit in just a few simple steps</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="booking-container">
          {/* Progress Bar */}
          <motion.div
            className="progress-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="progress-steps">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                >
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 && 'Service & Date'}
                    {step === 2 && 'Personal Info'}
                    {step === 3 && 'Confirmation'}
                  </div>
                </div>
              ))}
            </div>
            <div className="progress-line">
              <motion.div
                className="progress-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
            {/* Step 1: Service & Date */}
            {currentStep === 1 && (
              <motion.div
                className="form-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2>Select Service & Date</h2>
                
                <div className="form-group">
                  <                  label>
                    👤
                    Choose Service
                  </label>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className={errors.service ? 'error' : ''}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && <span className="error-message">{errors.service.message}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      📅
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      {...register('date', { required: 'Please select a date' })}
                      min={new Date().toISOString().split('T')[0]}
                      className={errors.date ? 'error' : ''}
                    />
                    {errors.date && <span className="error-message">{errors.date.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      🕐
                      Preferred Time
                    </label>
                    <select
                      {...register('time', { required: 'Please select a time' })}
                      className={errors.time ? 'error' : ''}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && <span className="error-message">{errors.time.message}</span>}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={nextStep} className="btn btn-primary">
                    Next Step
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                className="form-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2>Personal Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      👤
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      👤
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      ✉️
                      Email Address
                    </label>
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

                  <div className="form-group">
                    <label>
                      📞
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    💬
                    Additional Message (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Any specific concerns or requirements?"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="btn btn-secondary">
                    Previous
                  </button>
                  <button type="button" onClick={nextStep} className="btn btn-primary">
                    Review Booking
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <motion.div
                className="form-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2>Confirm Your Appointment</h2>
                
                <div className="booking-summary">
                  <div className="summary-item">
                    <strong>Service:</strong>
                    <span>{watch('service')}</span>
                  </div>
                  <div className="summary-item">
                    <strong>Date:</strong>
                    <span>{watch('date')}</span>
                  </div>
                  <div className="summary-item">
                    <strong>Time:</strong>
                    <span>{watch('time')}</span>
                  </div>
                  <div className="summary-item">
                    <strong>Name:</strong>
                    <span>{watch('firstName')} {watch('lastName')}</span>
                  </div>
                  <div className="summary-item">
                    <strong>Email:</strong>
                    <span>{watch('email')}</span>
                  </div>
                  <div className="summary-item">
                    <strong>Phone:</strong>
                    <span>{watch('phone')}</span>
                  </div>
                  {watch('message') && (
                    <div className="summary-item">
                      <strong>Message:</strong>
                      <span>{watch('message')}</span>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="btn btn-secondary">
                    Previous
                  </button>
                  <button type="submit" className="btn btn-accent">
                    Confirm Appointment
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Booking;
