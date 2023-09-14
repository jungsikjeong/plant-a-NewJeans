import React, { useState, useEffect } from 'react';
import PcHeader from './PcHeader';
import MobileHeader from './MobileHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loading from '../Loading';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  const { pathname } = useLocation();

  const onResize = () => {
    setIsMobile(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (
    pathname === '/pages/post' ||
    pathname === '/pages/mypage' ||
    pathname === '/pages/newsPost' ||
    pathname === '/pages/adminpage' ||
    pathname.startsWith('/pages/edit/') ||
    pathname.startsWith('/pages/newsPost/edit')
  ) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {isMobile < 1024 ? (
        <MobileHeader user={user} />
      ) : (
        <PcHeader user={user} />
      )}
    </>
  );
};

export default Header;
