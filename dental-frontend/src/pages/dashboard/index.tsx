import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import PatientDashboard from './PatientDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;
  return user.role === 'admin' ? <AdminDashboard /> : <PatientDashboard />;
};

export default Dashboard;


