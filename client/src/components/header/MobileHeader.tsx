import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

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
  position: static;
  left: 0;
  top: 0;
  right: 0;
  z-index: 200;
  background-color: rgb(255, 255, 255);
  transition: all 0.3s ease;
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
    transition: transform 0.2s, width 0.2s 0.2s, right 0.2s 0.2s;
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
    transition: transform 0.2s, width 0.2s 0.2s, right 0.2s 0.2s;
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

const AboutSubMenuList = styled.ul<{ visibility?: string }>`
  display: ${({ visibility }) => visibility};
  margin-top: 1rem;
  background: #f3f3f3;
  padding: 1rem;
  color: #777;
  overflow: hidden;

  transition: all 0.3s ease;
`;

const AboutSubMenuItem = styled.li`
  font-weight: 500;
`;

const MobileHeader = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isAboutSubMenu, setIsAboutSubMenu] = useState<boolean>(false);
  const [visibility, setVisibility] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const comRef = useRef<any>();

  const onMenuClick = () => {
    setIsMenu((prev) => !prev);
  };

  const onAboutSubMenuClick = () => {
    if (isAboutSubMenu) {
      setIsAboutSubMenu(false);
    } else {
      setIsAboutSubMenu((prev) => !prev);
      setVisibility(true);
    }
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

  useEffect(() => {
    if (!isAboutSubMenu) {
      setTimeout(() => {
        setVisibility(false);
      }, 400);
    }
  }, [isAboutSubMenu]);

  return (
    <>
      {isMenu && <ModalBG />}

      <Component ref={comRef} className={isScrolled ? 'header-shadow' : ''}>
        <SideMenu ismenu={isMenu ? 'true' : ''}>
          <SideMenuList>
            <SideMenuCloseBtn>
              <AiOutlineClose size={30} color={'#777'} onClick={onMenuClick} />
            </SideMenuCloseBtn>

            <SideMenuItem>
              <Link to={'/pages/about'}>about glory</Link>

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
              <AboutSubMenuList
                className={
                  isAboutSubMenu ? 'fadeInDropdown' : 'fadeOutDropdown'
                }
                visibility={visibility ? 'block' : 'none'}
              >
                <AboutSubMenuItem>about</AboutSubMenuItem>
                <AboutSubMenuItem style={{ marginTop: '.7rem' }}>
                  history
                </AboutSubMenuItem>
              </AboutSubMenuList>
            </SideMenuItem>

            <SideMenuItem>
              <Link to={'/pages/album'}>album</Link>
            </SideMenuItem>
            <SideMenuItem>
              <Link to={'/pages/gallery'}>gallery</Link>
            </SideMenuItem>
            <SideMenuItem>
              <Link to={'/pages/news'}>news</Link>
            </SideMenuItem>
            <SideMenuItem>
              <Link to={'/pages/store'}>store</Link>
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>

        <Logo className={isScrolled ? 'header-font-size' : ''}>
          <Link to='/'>Plant</Link>
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
