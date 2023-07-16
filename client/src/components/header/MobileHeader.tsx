import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

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
`;

const Logo = styled.h1`
  font-family: 'Chela One', cursive;
  font-weight: bolder;
  font-size: 60px;
  background: linear-gradient(to right bottom, #ffa69e, #507dff);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  flex: 1 1 auto;
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
  justify-content: space-around;
  height: 25%;
  font-weight: bold;
  letter-spacing: -0.5px;
`;

const SideMenuItem = styled.li``;

const SideMenuCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 33px;
  height: 33px;
`;

const MobileHeader = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const onMenuClick = () => {
    setIsMenu((prev) => !prev);
  };
  return (
    <>
      {isMenu && <ModalBG />}

      <Component>
        <SideMenu ismenu={isMenu ? 'true' : ''}>
          <SideMenuList>
            <SideMenuCloseBtn>
              <AiOutlineClose size={30} color={'#777'} onClick={onMenuClick} />
            </SideMenuCloseBtn>

            <SideMenuItem>
              <Link to={'/'}>about glory</Link>
            </SideMenuItem>
            <SideMenuItem>
              <Link to={'/'}>album</Link>
            </SideMenuItem>
            <SideMenuItem>
              <Link to={'/'}>gallery</Link>
            </SideMenuItem>
            <SideMenuItem>
              <Link to={'/'}>news</Link>
            </SideMenuItem>
            <SideMenuItem>
              <Link to={'/'}>store</Link>
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>

        <Logo>Plant</Logo>

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
