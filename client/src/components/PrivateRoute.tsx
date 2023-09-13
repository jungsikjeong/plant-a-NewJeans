import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface IPrivateRoute {
  isAdmin?: boolean;
}

const PrivateRoute = ({ isAdmin }: IPrivateRoute) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token') as string)
  );
  const [adminToken, setAdminToken] = useState(
    JSON.parse(localStorage.getItem('adminToken') as string)
  );

  // 로그인 유저만 접근 가능
  if (!token) {
    alert('로그인이 필요합니다.');
    return <Navigate to='/pages/signin' />;
  }

  // 관리자만 접근 가능
  if (isAdmin && !adminToken) {
    alert('관리자만 접근 가능합니다.');
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default PrivateRoute;
