import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
0%{
  opacity: 0;
}
100%{
  opacity: 1;
}
`;
const fadeOut = keyframes`
0%{
  opacity: 1;
}
100%{
  opacity: 0;
}
`;

const CustomAnimation = ({ children, isHover }: any) => {
  return (
    <Reveal keyframes={isHover ? fadeIn : fadeOut} triggerOnce={true}>
      {children}
    </Reveal>
  );
};

export default CustomAnimation;
