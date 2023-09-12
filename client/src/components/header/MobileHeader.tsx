import { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import CustomLink from '../common/CustomLink';
import { fetchByKakaoLogout } from '../../store/authSlice';
import { logout } from '../../store';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

const OpenAnimation = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    visibility: hidden;
    margin-top: 0rem;
    padding: 0rem;
  }
  to {
    margin-top: 1rem;
    padding: 1rem;
    max-height: 150px;
    opacity: 1;
    visibility: visible;
  }
`;
const CloseAnimation = keyframes`
  from {
    margin-top: 1rem;
    padding: 1rem;
    max-height: 150px;
    opacity: 1;
    visibility: visible;
  }
  to {
    margin-top: 0rem;
    padding: 0rem;
    max-height: 0;
    opacity: 0;
    visibility: hidden;
  }
`;

const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Component = styled.section`
  max-width: 1280px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: auto;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 200;
  background-color: rgb(255, 255, 255);
  transition: all 0.3s ease;
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

const Menu = styled.div`
  flex: 1 1 auto;
  text-align: right;
`;

const SideOpenBtn = styled.button<{ ismenu: string }>`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 22px;

  &:hover {
    &::before {
      transform: translateY(-5px) rotate(45deg);
      width: 50%;
      right: -10%;
      transition-delay: 0s;
    }

    &::after {
      transform: translateY(5px) rotate(-45deg);
      width: 50%;
      right: -10%;
      transition-delay: 0s;
    }
  }

  &::before {
    content: '';
    display: block;
    font-size: 0;
    content: '';
    position: absolute;
    right: ${({ ismenu }) => (ismenu ? '-10%' : '0')};
    height: 2px;
    width: ${({ ismenu }) => (ismenu ? '50%' : '100%')};
    top: calc(50% - 1px);
    transform: ${({ ismenu }) =>
      ismenu
        ? 'translateY(-5px) rotate(45deg)'
        : 'translateY(-10px) rotate(0deg)'};
    transition:
      transform 0.2s,
      width 0.2s 0.2s,
      right 0.2s 0.2s;
    background: rgba(0, 0, 0, 0.6);
  }

  &::after {
    display: block;
    font-size: 0;
    content: '';
    position: absolute;
    right: ${({ ismenu }) => (ismenu ? '-10%' : '0')};
    height: 2px;
    width: ${({ ismenu }) => (ismenu ? '50%' : '100%')};
    background: rgba(0, 0, 0, 0.6);
    top: calc(50% - 1px);
    transform: translateY(10px) rotate(0deg);
    transform: ${({ ismenu }) =>
      ismenu
        ? ' translateY(5px) rotate(-45deg)'
        : 'translateY(10px) rotate(0deg)'};
    transition:
      transform 0.2s,
      width 0.2s 0.2s,
      right 0.2s 0.2s;
  }

  strong {
    display: block;
    font-size: 0;
    content: '';
    position: absolute;
    right: 0;
    height: 2px;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
`;

const SideMenu = styled.div<{ ismenu: string }>`
  position: relative;
  width: 340px;
  padding: 0 20px;
  background: #fff;
  position: fixed;
  top: 0;
  left: ${({ ismenu }) => (ismenu ? '0px' : '-500px')};
  transition: all 1s ease;
  bottom: 0;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  z-index: 100;
  visibility: ${({ ismenu }) => (ismenu ? 'visible' : 'hidden')};
`;

const SideMenuList = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  height: 25%;
  font-weight: bold;
  letter-spacing: -0.5px;
`;

const SideMenuItem = styled.li`
  position: relative;
  padding: 1rem 0;
`;

const SideMenuCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 33px;
  height: 33px;
`;

const AboutSubButton = styled.button`
  position: absolute;
  top: 5px;
  right: -10px;
  text-align: center;
  color: #999;
`;

const AboutSubMenuList = styled.ul`
  position: relative;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;

  background: #f3f3f3;
  color: #777;
  transition: all 0.3s ease;
  max-height: 0;

  &.open {
    display: block;
    opacity: 1;
    visibility: visible;
    animation: ${OpenAnimation} 0.5s ease-in-out forwards;
  }

  &.close {
    animation: ${CloseAnimation} 0.5s ease-in-out forwards;
  }
`;

const AboutSubMenuItem = styled.li`
  font-weight: 500;
`;

const User = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  cursor: pointer;

  .username {
    margin-left: 1rem;
  }

  .userSubMenu {
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    /* margin-top: 0.5rem; */
    width: 320px;
    max-height: 0;
    /* padding: 0.5rem 1rem; */
    position: relative;
    background-color: #f3f3f3;
    z-index: 10;

    &.open {
      display: block;
      opacity: 1;
      visibility: visible;
      animation: ${OpenAnimation} 0.5s ease-in-out forwards;
    }

    &.close {
      animation: ${CloseAnimation} 0.5s ease-in-out forwards;
    }

    li {
      padding: 0.5rem 0;
    }
  }
`;

const MobileHeader = ({ user }: any) => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isAboutSubMenu, setIsAboutSubMenu] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const comRef = useRef<any>();
  const aboutSubMenuRef = useRef<any>();
  const userSubMenuRef = useRef<any>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onMenuClick = () => {
    setIsMenu((prev) => !prev);
  };

  const onUserClick = () => {
    const item = userSubMenuRef.current;

    if (item.classList.contains('open')) {
      item.classList.remove('open');
      item.classList.add('close');
    } else {
      item.classList.remove('close');
      item.classList.add('open');
    }
  };

  const onAboutSubMenuClick = () => {
    const item = aboutSubMenuRef.current;
    setIsAboutSubMenu((prev) => !prev);

    if (item.classList.contains('open')) {
      item.classList.remove('open');
      item.classList.add('close');
    } else {
      item.classList.remove('close');
      item.classList.add('open');
    }
  };

  const onLogout = () => {
    if (user && user.provider === 'kakao') {
      dispatch(fetchByKakaoLogout(user.snsId));
    }
    dispatch(logout());
    setIsMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.screenY || document.documentElement.scrollTop;
      const scrollThreshold = 10;

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
    <>
      {isMenu && <ModalBG />}

      <Component ref={comRef} className={isScrolled ? 'header-shadow' : ''}>
        <SideMenu ismenu={isMenu ? 'true' : ''}>
          <SideMenuList>
            {user && (
              <User onClick={onUserClick}>
                <span className='username'>{user.username}</span>

                <ul className='userSubMenu' ref={userSubMenuRef}>
                  {user.manager === 'admin' ? (
                    <CustomLink to='/pages/adminpage' onMenuClick={onMenuClick}>
                      <li>AdminPage</li>
                    </CustomLink>
                  ) : (
                    <CustomLink to='/pages/mypage' onMenuClick={onMenuClick}>
                      <li>MyPage</li>
                    </CustomLink>
                  )}
                  <CustomLink to='/pages/post' onMenuClick={onMenuClick}>
                    <li>POST</li>
                  </CustomLink>
                  <li onClick={onLogout}>LOGOUT</li>
                </ul>
              </User>
            )}
            <SideMenuCloseBtn>
              <AiOutlineClose size={30} color={'#777'} onClick={onMenuClick} />
            </SideMenuCloseBtn>

            <SideMenuItem>
              <CustomLink to='/pages/about' onMenuClick={onMenuClick}>
                about plant
              </CustomLink>

              <AboutSubButton onClick={onAboutSubMenuClick}>
                {isAboutSubMenu ? (
                  // 위
                  <RiArrowDropUpLine size={35} />
                ) : (
                  // 아래
                  <RiArrowDropDownLine size={35} />
                )}
              </AboutSubButton>

              {/* About 서브 메뉴 */}
              <AboutSubMenuList ref={aboutSubMenuRef}>
                <AboutSubMenuItem>
                  <CustomLink to='/pages/about' onMenuClick={onMenuClick}>
                    about
                  </CustomLink>
                </AboutSubMenuItem>
                <AboutSubMenuItem style={{ marginTop: '.7rem' }}>
                  <CustomLink to='/pages/history' onMenuClick={onMenuClick}>
                    history
                  </CustomLink>
                </AboutSubMenuItem>
              </AboutSubMenuList>
            </SideMenuItem>

            <SideMenuItem>
              <CustomLink to='/pages/album' onMenuClick={onMenuClick}>
                album
              </CustomLink>
            </SideMenuItem>
            <SideMenuItem>
              <CustomLink to='/pages/gallery' onMenuClick={onMenuClick}>
                gallery
              </CustomLink>
            </SideMenuItem>
            <SideMenuItem>
              <CustomLink to='/pages/news' onMenuClick={onMenuClick}>
                news
              </CustomLink>
            </SideMenuItem>
            {!user && (
              <SideMenuItem>
                <CustomLink to='/pages/signin' onMenuClick={onMenuClick}>
                  sign in
                </CustomLink>
              </SideMenuItem>
            )}
          </SideMenuList>
        </SideMenu>

        <Logo fontSize={isScrolled ? 'true' : ''}>
          <CustomLink to='/' onMenuClick={onMenuClick}>
            Plant
          </CustomLink>
        </Logo>

        <Menu>
          <SideOpenBtn ismenu={isMenu ? 'true' : ''} onClick={onMenuClick}>
            <strong>Aside open</strong>
          </SideOpenBtn>
        </Menu>
      </Component>
    </>
  );
};

export default MobileHeader;
