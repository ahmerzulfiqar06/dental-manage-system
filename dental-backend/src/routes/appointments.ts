import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAvailableSlots
} from '../controllers/appointmentController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, appointmentSchema, updateAppointmentSchema } from '../middleware/validation';
import { UserRole } from '../entities/User';

const router = Router();

// Public routes
router.get('/available-slots', getAvailableSlots);

// Protected routes - All users
router.post('/', authenticate, validate(appointmentSchema), createAppointment);
router.get('/', authenticate, getAppointments);
router.get('/:id', authenticate, getAppointmentById);

// Protected routes - Patients can update limited fields, Admin/Doctor can update all
router.put('/:id', authenticate, validate(updateAppointmentSchema), updateAppointment);

// Protected routes - Admin/Doctor only
router.delete('/:id', authenticate, authorize(UserRole.ADMIN, UserRole.DOCTOR), deleteAppointment);

export default router;
