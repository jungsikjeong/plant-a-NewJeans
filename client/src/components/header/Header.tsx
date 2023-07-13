import React, { useState, useEffect } from 'react';
import PcHeader from './PcHeader';
import MobileHeader from './MobileHeader';

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  const handleResize = () => {
    setIsMobile(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{isMobile < 1024 ? <MobileHeader /> : <PcHeader />}</>;
};

export default Header;
