import React, { useState, useEffect } from 'react';
import MobileHistory from './MobileHistory';
import PCHistory from './PCHistory';

const History = () => {
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

  return <>{isMobile < 764 ? <MobileHistory /> : <PCHistory />}</>;
};

export default History;
