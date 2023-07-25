import React from 'react';
import { styled } from 'styled-components';

const Component = styled.div`
  border: none;
  border-radius: 4px;
  padding: 40px 5px;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::before {
    display: block;
    content: '';
    height: 60px;
    background: url('https://designskin19.clickn.co.kr/images/img_no_data.png')
      50% 0 no-repeat;
  }
`;

const Nothing = () => {
  return <Component>등록된 컨텐츠가 없습니다.</Component>;
};

export default Nothing;
