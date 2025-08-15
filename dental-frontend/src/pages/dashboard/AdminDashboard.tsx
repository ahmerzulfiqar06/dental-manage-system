import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { appointmentsApi, handleApiError } from '../../services/api';
import { Appointment } from '../../types';

const AdminDashboard: React.FC = () => {
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

  const setStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await appointmentsApi.updateAppointment(id, { status });
      await fetchAppointments(); // Refresh the list
    } catch (err) {
      alert(`Failed to update appointment: ${handleApiError(err)}`);
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Admin Dashboard</motion.h2>
        <p>Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container section">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Admin Dashboard</motion.h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button className="btn btn-primary" onClick={fetchAppointments}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container section">
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Admin Dashboard</motion.h2>
      <p className="text-gradient" style={{ fontWeight: 600 }}>All Appointments</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Patient</th><th>Email</th><th>Date</th><th>Time</th><th>Service</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.patient?.name || 'Unknown'}</td>
                <td>{a.patient?.email || 'Unknown'}</td>
                <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                <td>{a.appointmentTime}</td>
                <td>{a.service}</td>
                <td style={{ textTransform: 'capitalize' }}>{a.status}</td>
                <td style={{ display: 'flex', gap: '.5rem' }}>
                  <button className="btn btn-primary" onClick={() => setStatus(a.id, 'confirmed')}>Confirm</button>
                  <button className="btn btn-secondary" onClick={() => setStatus(a.id, 'pending')}>Pending</button>
                  <button className="btn btn-secondary" onClick={() => setStatus(a.id, 'cancelled')}>Cancel</button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--gray-600)' }}>No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;


