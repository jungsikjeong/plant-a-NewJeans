import React from 'react';
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
`;

const Menu = styled.ul`
  font-family: ${({ theme }) => theme.fonts.logo};
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  color: rgb(255, 153, 204);
  text-transform: uppercase;
`;

const MenuItem = styled.li`
  font-weight: 400;
  padding: 0 2.5rem;
`;

const PcHeader = () => {
  return (
    <Component>
      <Logo>
        <Link to='/'>Plant</Link>
      </Logo>
      <Menu>
        <MenuItem>about glory</MenuItem>
        <MenuItem>menu</MenuItem>
        <MenuItem>gallery</MenuItem>
        <MenuItem>news</MenuItem>
        <MenuItem>store</MenuItem>
      </Menu>
    </Component>
  );
};

export default PcHeader;
