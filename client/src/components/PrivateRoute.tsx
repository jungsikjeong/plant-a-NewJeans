import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token') as string)
  );

  if (!token) {
    alert('로그인이 필요합니다.');
    return <Navigate to='/pages/signin' />;
  }

  return <Outlet />;
};

export default PrivateRoute;
