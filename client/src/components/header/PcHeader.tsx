import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CustomLink from '../common/CustomLink';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { logout } from '../../store';
import { fetchByKakaoLogout } from '../../store/authSlice';

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

const Logo = styled.h1<{ fontSize: string }>`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-weight: bolder;
  font-size: ${({ fontSize }) => (fontSize ? '50px' : '60px')};
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

const SubMenu = styled.div`
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
  font-family: ${({ theme }) => theme.fonts.logo};

  li {
    cursor: pointer;
    padding: 1rem;
  }
`;

const User = styled.span`
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.normally};
`;

const PcHeader = ({ user }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const comRef = useRef<any>();

  const aboutRef = useRef<any>();
  const userRef = useRef<any>();

  const aboutSubMenuRef = useRef<any>();
  const userSubMenuRef = useRef<any>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onLogout = () => {
    if (user && user.provider === 'kakao') {
      dispatch(fetchByKakaoLogout(user.snsId));
    }
    dispatch(logout());
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.screenY || document.documentElement.scrollTop;

      const scrollThreshold = 10; //

      if (scrollTop > scrollThreshold && comRef.current) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // subMenu 활성화
  useEffect(() => {
    const onMouseOver = (status: string) => {
      if (status === 'aboutSubMenu' && aboutSubMenuRef.current) {
        aboutSubMenuRef.current.style.visibility = 'visible';
        aboutSubMenuRef.current.style.opacity = '1';
        aboutSubMenuRef.current.style.transform = 'translateY(0px)';
      }
      if (status === 'userSubMenu' && userSubMenuRef.current) {
        userSubMenuRef.current.style.visibility = 'visible';
        userSubMenuRef.current.style.opacity = '1';
        userSubMenuRef.current.style.transform = 'translateY(0px)';
      }
    };

    const onMouseOut = (status: string) => {
      if (status === 'aboutSubMenu' && aboutSubMenuRef.current) {
        aboutSubMenuRef.current.style.visibility = 'hidden';
        aboutSubMenuRef.current.style.opacity = '0';
        aboutSubMenuRef.current.style.transform = 'translateY(-4px)';
      }
      if (status === 'userSubMenu' && userSubMenuRef.current) {
        userSubMenuRef.current.style.visibility = 'hidden';
        userSubMenuRef.current.style.opacity = '0';
        userSubMenuRef.current.style.transform = 'translateY(-4px)';
      }
    };

    const aboutRefCurrent = aboutRef.current;
    const userRefCurrent = userRef.current;

    aboutRefCurrent.addEventListener('mouseover', () =>
      onMouseOver('aboutSubMenu')
    );
    aboutRefCurrent.addEventListener('mouseout', () =>
      onMouseOut('aboutSubMenu')
    );

    userRefCurrent.addEventListener('mouseover', () =>
      onMouseOver('userSubMenu')
    );
    userRefCurrent.addEventListener('mouseout', () =>
      onMouseOut('userSubMenu')
    );

    return () => {
      aboutRefCurrent.removeEventListener('mouseover', () =>
        onMouseOver('aboutSubMenu')
      );
      aboutRefCurrent.removeEventListener('mouseout', () =>
        onMouseOut('aboutSubMenu')
      );

      userRefCurrent.addEventListener('mouseover', () =>
        onMouseOut('userSubMenu')
      );
      userRefCurrent.addEventListener('mouseout', () =>
        onMouseOut('userSubMenu')
      );
    };
  }, []);

  return (
    <Component ref={comRef} className={isScrolled ? 'header-shadow' : ''}>
      {/* <Logo className={isScrolled ? 'header-font-size' : ''}> */}
      <Logo fontSize={isScrolled ? 'true' : ''}>
        <CustomLink to='/'>Plant</CustomLink>
      </Logo>
      <Menu>
        <MenuItem ref={aboutRef}>
          <CustomLink to='/pages/about'>about glory</CustomLink>
          {/* About 서브메뉴 */}
          <SubMenu ref={aboutSubMenuRef}>
            <ul>
              <li>
                <CustomLink to='/pages/about'>ABOUT</CustomLink>
              </li>
              <li>
                <CustomLink to='/pages/history'>HISTORY</CustomLink>
              </li>
            </ul>
          </SubMenu>
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

        {user ? (
          <>
            {user.manager === 'admin' ? (
              <MenuItem ref={userRef}>
                <User>
                  <CustomLink to='/pages/adminpage'>
                    {user.username}'
                  </CustomLink>
                  {/* user 서브메뉴 */}
                  <SubMenu ref={userSubMenuRef}>
                    <ul>
                      <li>
                        <CustomLink to='/pages/newsPost'>NEWS'POST</CustomLink>
                      </li>
                      <li onClick={onLogout}>Logout</li>
                    </ul>
                  </SubMenu>
                </User>
              </MenuItem>
            ) : (
              <MenuItem ref={userRef}>
                <User>
                  <CustomLink to='/pages/mypage'>{user.username}'</CustomLink>
                  {/* user 서브메뉴 */}
                  <SubMenu ref={userSubMenuRef}>
                    <ul>
                      <li>
                        <CustomLink to='/pages/post'>POST</CustomLink>
                      </li>
                      <li onClick={onLogout}>Logout</li>
                    </ul>
                  </SubMenu>
                </User>
              </MenuItem>
            )}
          </>
        ) : (
          <MenuItem ref={userRef}>
            <CustomLink to='/pages/signin'>sign in</CustomLink>
          </MenuItem>
        )}
      </Menu>
    </Component>
  );
};

export default PcHeader;
