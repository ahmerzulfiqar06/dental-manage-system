import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { appointmentsApi, handleApiError } from '../../services/api';
import { Appointment } from '../../types';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsApi.getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Welcome, {user?.name}</motion.h2>
        <p>Loading your appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container section">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Welcome, {user?.name}</motion.h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button className="btn btn-primary" onClick={fetchAppointments}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container section">
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Welcome, {user?.name}</motion.h2>
      <p className="text-gradient" style={{ fontWeight: 600 }}>Your Appointments</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Date</th><th>Time</th><th>Service</th><th>Status</th><th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                <td>{a.appointmentTime}</td>
                <td>{a.service}</td>
                <td style={{ textTransform: 'capitalize' }}>{a.status}</td>
                <td>{a.notes || '-'}</td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray-600)' }}>No appointments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientDashboard;


