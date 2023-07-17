import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Component = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
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
  margin-bottom: 1rem;
`;

const Author = styled.div`
  color: #666;
  font-size: 13px;

  span {
    display: inline-block;
    position: relative;
    border-bottom: 1px solid #eee;
  }
`;

const Footer = () => {
  return (
    <Component>
      <Wrapper>
        <Logo>
          <Link to='/'>Plant</Link>
        </Logo>
        <Author>
          © 2023 Created by
          <Link to='https://github.com/jungsikjeong'>
            <span> Joongshik Jung</span>
          </Link>
        </Author>
      </Wrapper>
    </Component>
  );
};

export default Footer;
