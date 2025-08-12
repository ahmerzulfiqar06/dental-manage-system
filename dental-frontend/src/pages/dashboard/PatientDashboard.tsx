import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getAppointments } from '../../services/storage';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const my = getAppointments().filter((a) => a.userId === user?.id || a.email === user?.email);

  return (
    <div className="container section">
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Welcome, {user?.name}</motion.h2>
      <p className="text-gradient" style={{ fontWeight: 600 }}>Your Appointments</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Date</th><th>Time</th><th>Service</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {my.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.service}</td>
                <td>{a.status}</td>
              </tr>
            ))}
            {my.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--gray-600)' }}>No appointments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientDashboard;


