import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CustomLink from '../common/CustomLink';

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
  max-width: 1260px;
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
  position: relative;
  font-weight: 400;
  padding: 0 2.5rem;
`;

const AboutSubMenu = styled.div`
  min-width: 160px;
  position: absolute;
  border-top: 1px solid #777;
  background: #fff;
  color: #777777;
  box-shadow: 0 0 2px #ddd;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.2s linear;

  li {
    padding: 1rem;
  }
`;

const PcHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const comRef = useRef<any>();
  const aboutRef = useRef<any>();
  const aboutSubMenuRef = useRef<any>();

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

  // About subMenu 활성화
  useEffect(() => {
    const handleMouseOver = () => {
      if (aboutSubMenuRef.current) {
        aboutSubMenuRef.current.style.visibility = 'visible';
        aboutSubMenuRef.current.style.opacity = '1';
        aboutSubMenuRef.current.style.transform = 'translateY(0px)';
      }
    };

    const handleMouseOut = () => {
      if (aboutSubMenuRef.current) {
        aboutSubMenuRef.current.style.visibility = 'hidden';
        aboutSubMenuRef.current.style.opacity = '0';
        aboutSubMenuRef.current.style.transform = 'translateY(-4px)';
      }
    };

    const aboutRefCurrent = aboutRef.current;

    aboutRefCurrent.addEventListener('mouseover', handleMouseOver);
    aboutRefCurrent.addEventListener('mouseout', handleMouseOut);

    return () => {
      aboutRefCurrent.removeEventListener('mouseover', handleMouseOver);
      aboutRefCurrent.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <Component ref={comRef} className={isScrolled ? 'header-shadow' : ''}>
      <Logo className={isScrolled ? 'header-font-size' : ''}>
        <CustomLink to='/'>Plant</CustomLink>
      </Logo>
      <Menu>
        <MenuItem ref={aboutRef}>
          <CustomLink to='/pages/about'>about glory</CustomLink>
          {/* About 서브메뉴 */}
          <AboutSubMenu ref={aboutSubMenuRef}>
            <ul>
              <li>
                <CustomLink to='/pages/about'>ABOUT</CustomLink>
              </li>
              <li>
                <CustomLink to='/pages/history'>HISTORY</CustomLink>
              </li>
            </ul>
          </AboutSubMenu>
        </MenuItem>

        <MenuItem>
          <CustomLink to='/pages/album'>album</CustomLink>
        </MenuItem>
        <MenuItem>
          <CustomLink to='/pages/gallery'>gallery</CustomLink>
        </MenuItem>
        <MenuItem>
          <CustomLink to='/pages/news'>news</CustomLink>
        </MenuItem>
        <MenuItem>
          <CustomLink to='/pages/store'>store</CustomLink>
        </MenuItem>
      </Menu>
    </Component>
  );
};

export default PcHeader;
