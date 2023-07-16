import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Component = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  margin: auto;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 200;
  background-color: rgb(255, 255, 255);
`;

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-weight: bolder;
  font-size: 60px;
  background: linear-gradient(to right bottom, #ffa69e, #507dff);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  flex: 1 1 auto;
  transition: all 0.3s ease;
`;

const Menu = styled.ul`
  width: 100%;
  padding-bottom: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  color: rgb(255, 153, 204);
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.logo};
`;

const MenuItem = styled.li`
  font-weight: 400;
  padding: 0 2.5rem;
`;

const PcHeader = () => {
  const comRef = useRef<any>();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.screenY || document.documentElement.scrollTop;

      const scrollThreshold = 10; //

      if (scrollTop > scrollThreshold && comRef.current) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Component ref={comRef} className={isScrolled ? 'header-shadow' : ''}>
      <Logo className={isScrolled ? 'header-font-size' : ''}>
        <Link to='/'>Plant</Link>
      </Logo>
      <Menu>
        <MenuItem>
          <Link to={'/'}>about glory</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/'}>album</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/'}>gallery</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/'}>news</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/'}>store</Link>
        </MenuItem>
      </Menu>
    </Component>
  );
};

export default PcHeader;
