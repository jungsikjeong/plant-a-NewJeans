import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';

const Component = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
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
`;

const Author = styled.div`
  color: #666;
  padding: 0 1rem;
  font-size: 11px;
  text-align: right;
  flex: 1;

  span {
    display: inline-block;
    position: relative;
    border-bottom: 1px solid #eee;
  }
  @media (min-width: 1024px) {
    font-size: 13px;
  }
`;

const Footer = () => {
  const location = useLocation();

  return (
    <Component>
      <Wrapper>
        <Logo>
          <Link to='/'>Plant</Link>
        </Logo>

        {location.pathname === '/pages/about' ? (
          <Author>
            © copy from :&nbsp;
            <Link
              to='https://news.mt.co.kr/mtview.php?no=2023020308307266406'
              target='_blank'
            >
              <span>머니투데이 이덕행 기자</span>
            </Link>
          </Author>
        ) : (
          <Author>
            © 2023 Created by
            <Link to='https://github.com/jungsikjeong' target='_blank'>
              <span> Joongshik Jung</span>
            </Link>
          </Author>
        )}
      </Wrapper>
    </Component>
  );
};

export default Footer;
