import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function ProtectRoutes({ role }) {
  const token = 'lfdskfjjwlerjewkrjwkj';
  const roleFromBackend = 'customer';

  console.log(role);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!role.includes(roleFromBackend)) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default ProtectRoutes;
