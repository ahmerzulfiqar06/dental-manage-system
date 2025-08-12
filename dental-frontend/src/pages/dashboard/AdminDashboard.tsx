import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAppointments, updateAppointment } from '../../services/storage';

const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState(getAppointments());

  const setStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    updateAppointment(id, { status });
    setAppointments(getAppointments());
  };

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
                <td>{a.firstName} {a.lastName}</td>
                <td>{a.email}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.service}</td>
                <td>{a.status}</td>
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


