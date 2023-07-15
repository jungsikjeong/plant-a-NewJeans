import React from 'react';
import { styled } from 'styled-components';

const Component = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 10px;
  @media (max-width: 640px) {
    padding: 50px 10px;
  }
`;

const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;
  @media (max-width: 640px) {
    display: block;
    padding: 1rem 0;
  }
`;

const Box = styled.div<{ height?: string }>`
  width: 100%;
  text-align: center;

  @media (min-width: 640px) {
    height: ${({ height }) => (height ? height : '')};
  }
  @media (max-width: 640px) {
    padding: 1rem 0;
  }

  h2 {
    line-height: 1.3;
    color: rgb(246, 206, 227);
    font-size: calc(34px - (1280px - 100vw) * 0.0100723);
    font-weight: bold;
  }

  h1 {
    line-height: 1.3;
    color: rgb(0, 0, 0);
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(64px - (1280px - 100vw) * 0.0240823) !important;
  }

  .x-mark {
    line-height: 1.3;
    color: #bbb;
    font-size: 22px;
  }

  img {
    object-fit: contain;
    @media (max-width: 640px) {
      height: 150px;
    }
  }

  p {
    word-break: keep-all;
    padding: 0.1rem 0;
    font-family: ${({ theme }) => theme.fonts.normally};
  }

  .name {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 0.4rem;
  }

  .contents {
    font-size: 15px;
    color: rgb(132, 132, 132);
    text-align: center;

    span {
      display: block;
      margin-top: 0.2rem;
    }
  }
`;

const Section2 = () => {
  return (
    <Component>
      <Box>
        <h2>a b o u t</h2>
      </Box>
      <Box>
        <h1>p l a n t</h1>
      </Box>

      <Box style={{ margin: '10px 0px' }}>
        <span className='x-mark'>X X X</span>
      </Box>

      <Wrapper>
        <Box height={'150px'}>
          <img src='/images/민지.jpg' alt='민지' />
          <p className='name'>민지</p>
          <p className='contents'>
            ESTJ
            <br />
            <span>엄격한 관리자</span>
          </p>
        </Box>
        <Box height={'150px'}>
          <img src='/images/하니.jpg' alt='하니' />
          <p className='name'>하니</p>
          <p className='contents'>
            INFP
            <br />
            <span>중재자 잔다르크</span>
          </p>
        </Box>
        <Box height={'150px'}>
          <img src='/images/다니.jpg' alt='다니' />
          <p className='name'>다니엘</p>
          <p className='contents'>
            ENFP
            <br />
            <span>재기발랄한 활동가</span>
          </p>
        </Box>
        <Box height={'150px'}>
          <img src='/images/해린.jpg' alt='해린' />
          <p className='name'>해린</p>
          <p className='contents'>
            ISTP
            <br />
            <span>만능 재주꾼 장인</span>
          </p>
        </Box>
        <Box height={'150px'}>
          <img src='/images/혜인.jpg' alt='혜인' />
          <p className='name'>혜인</p>
          <p className='contents'>
            INFP
            <br />
            <span>중재자 잔다르크</span>
          </p>
        </Box>
      </Wrapper>
    </Component>
  );
};

export default Section2;
