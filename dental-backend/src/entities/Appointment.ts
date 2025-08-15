import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEnum, IsString, IsDate, IsOptional } from 'class-validator';
import { User } from './User';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum ServiceType {
  GENERAL_CHECKUP = 'General Checkup',
  TEETH_CLEANING = 'Teeth Cleaning',
  TEETH_WHITENING = 'Teeth Whitening',
  DENTAL_FILLING = 'Dental Filling',
  ROOT_CANAL = 'Root Canal',
  CROWN_BRIDGE = 'Crown & Bridge',
  DENTAL_IMPLANTS = 'Dental Implants',
  ORTHODONTICS = 'Orthodontics',
  EMERGENCY_CARE = 'Emergency Care'
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  patientId: string;

  @ManyToOne(() => User, user => user.appointments, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: User;

  @Column({ type: 'enum', enum: ServiceType })
  @IsEnum(ServiceType)
  service: ServiceType;

  @Column({ type: 'date' })
  @IsDate()
  appointmentDate: Date;

  @Column({ type: 'time' })
  @IsString()
  appointmentTime: string;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  doctorAssigned?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCost?: number;

  @Column({ type: 'int', default: 60 })
  durationMinutes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
