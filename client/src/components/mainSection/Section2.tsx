import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import members from '../../utils/members';

const Component = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  height: 100vh;
  padding: 100px 10px;
  @media (max-width: 640px) {
    padding: 50px 10px;
    height: auto;
  }
`;

const Wrapper = styled.div`
  margin-top: 6rem;
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;

  @media (max-width: 640px) {
    display: block;
    margin: 0;
    padding: 0;
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
    display: flex;
    align-items: center;
    justify-content: center;
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
    @media (max-width: 640px) {
      visibility: hidden;
      display: none;
    }
  }
`;

const MobileContents = styled.p`
  color: rgb(132, 132, 132);
  text-align: center;
  font-size: 15px;
  span {
    display: block;
    margin-top: 0.2rem;
  }
`;

const InfoBtn = styled.button`
  display: none;
  visibility: hidden;

  @media (max-width: 640px) {
    display: block;
    width: 20px;
    visibility: visible;
  }
`;

const Section2 = () => {
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState<any>(null);

  const onToggleContent = (index: number) => {
    setActiveIndex((prevIndex: number) => (prevIndex === index ? null : index));
    setShowContent(!showContent);
  };

  useEffect(() => {
    const onResize = () => {
      setActiveIndex(null);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
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
        {members.map((member, index) => (
          <Box key={index} height={'150px'}>
            <img src={member.image} alt={member.name} />
            <p className='name'>
              {member.name}
              <InfoBtn onClick={() => onToggleContent(index)}>🔽</InfoBtn>
            </p>
            {activeIndex === index && (
              <MobileContents>
                {member.mbti}
                <br />
                <span>{member.description}</span>
              </MobileContents>
            )}
            <p className='contents'>
              {member.mbti}
              <br />
              <span>{member.description}</span>
            </p>
          </Box>
        ))}
      </Wrapper>
    </Component>
  );
};

export default Section2;
