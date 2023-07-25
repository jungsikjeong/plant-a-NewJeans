import React from 'react';
import Banner from './Banner';
import Section1 from './mainSection/Section1';
import Section2 from './mainSection/Section2';
import Section3 from './mainSection/Section3';
import { keyframes, styled } from 'styled-components';

// 페이지 전환효과
const ScreenFrames = keyframes`
 from{
  transform:translateY(-10px);
 }
 to{
  transform:translateY(0);
 }
`;

const Component = styled.div`
  animation: ${ScreenFrames} 0.75s;
`;

const Home = () => {
  return (
    <Component>
      <Banner />
      <Section1 />
      <Section2 />
      <Section3 />
    </Component>
  );
};

export default Home;
