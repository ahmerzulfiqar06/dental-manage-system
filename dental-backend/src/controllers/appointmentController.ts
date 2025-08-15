import { Request, Response } from 'express';
import AppDataSource from '../config/database';
import { Appointment, AppointmentStatus, ServiceType } from '../entities/Appointment';
import { User, UserRole } from '../entities/User';
import { AuthRequest } from '../middleware/auth';

const appointmentRepository = AppDataSource.getRepository(Appointment);
const userRepository = AppDataSource.getRepository(User);

export const createAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { service, appointmentDate, appointmentTime, notes, symptoms } = req.body;
    const patientId = req.user!.userId;

    // Check if user exists
    const patient = await userRepository.findOne({ where: { id: patientId } });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Check for conflicting appointments
    const existingAppointment = await appointmentRepository.findOne({
      where: {
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        status: AppointmentStatus.CONFIRMED
      }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create new appointment
    const appointment = new Appointment();
    appointment.patientId = patientId;
    appointment.service = service as ServiceType;
    appointment.appointmentDate = new Date(appointmentDate);
    appointment.appointmentTime = appointmentTime;
    appointment.status = AppointmentStatus.PENDING;
    appointment.notes = notes;
    appointment.symptoms = symptoms;

    const savedAppointment = await appointmentRepository.save(appointment);

    // Fetch the saved appointment with patient details
    const appointmentWithPatient = await appointmentRepository.findOne({
      where: { id: savedAppointment.id },
      relations: ['patient']
    });

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointmentWithPatient
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const { role, userId } = req.user!;
    let appointments;

    if (role === UserRole.ADMIN || role === UserRole.DOCTOR) {
      // Admin/Doctor can see all appointments
      appointments = await appointmentRepository.find({
        relations: ['patient'],
        order: { appointmentDate: 'ASC', appointmentTime: 'ASC' }
      });
    } else {
      // Patients can only see their own appointments
      appointments = await appointmentRepository.find({
        where: { patientId: userId },
        relations: ['patient'],
        order: { appointmentDate: 'ASC', appointmentTime: 'ASC' }
      });
    }

    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getAppointmentById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.user!;

    const appointment = await appointmentRepository.findOne({
      where: { id },
      relations: ['patient']
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check permissions
    if (role === UserRole.PATIENT && appointment.patientId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.user!;
    const updateData = req.body;

    const appointment = await appointmentRepository.findOne({
      where: { id },
      relations: ['patient']
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check permissions
    if (role === UserRole.PATIENT) {
      // Patients can only update their own appointments and limited fields
      if (appointment.patientId !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
      
      // Patients can only update notes and symptoms
      const allowedFields = ['notes', 'symptoms'];
      const hasUnallowedFields = Object.keys(updateData).some(key => !allowedFields.includes(key));
      
      if (hasUnallowedFields) {
        return res.status(403).json({
          success: false,
          message: 'Patients can only update notes and symptoms'
        });
      }
    }

    // Update appointment
    Object.assign(appointment, updateData);
    
    if (updateData.appointmentDate) {
      appointment.appointmentDate = new Date(updateData.appointmentDate);
    }

    const updatedAppointment = await appointmentRepository.save(appointment);

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: updatedAppointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.user!;

    const appointment = await appointmentRepository.findOne({
      where: { id }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check permissions
    if (role === UserRole.PATIENT && appointment.patientId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await appointmentRepository.remove(appointment);

    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    // Get all booked appointments for the specified date
    const bookedAppointments = await appointmentRepository.find({
      where: {
        appointmentDate: new Date(date as string),
        status: AppointmentStatus.CONFIRMED
      },
      select: ['appointmentTime']
    });

    const bookedTimes = bookedAppointments.map(apt => apt.appointmentTime);

    // Define available time slots
    const allTimeSlots = [
      '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30'
    ];

    const availableSlots = allTimeSlots.filter(time => !bookedTimes.includes(time));

    res.json({
      success: true,
      data: {
        date,
        availableSlots
      }
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
