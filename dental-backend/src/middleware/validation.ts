import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Validation schemas
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('patient', 'admin', 'doctor').default('patient'),
  phone: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  address: Joi.string().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const appointmentSchema = Joi.object({
  service: Joi.string().valid(
    'General Checkup',
    'Teeth Cleaning', 
    'Teeth Whitening',
    'Dental Filling',
    'Root Canal',
    'Crown & Bridge',
    'Dental Implants',
    'Orthodontics',
    'Emergency Care'
  ).required(),
  appointmentDate: Joi.date().min('now').required(),
  appointmentTime: Joi.string().required(),
  notes: Joi.string().optional(),
  symptoms: Joi.string().optional()
});

export const updateAppointmentSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'completed').optional(),
  appointmentDate: Joi.date().min('now').optional(),
  appointmentTime: Joi.string().optional(),
  notes: Joi.string().optional(),
  symptoms: Joi.string().optional(),
  doctorAssigned: Joi.string().optional(),
  estimatedCost: Joi.number().min(0).optional()
});
