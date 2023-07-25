import React, { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { keyframes, styled } from 'styled-components';
import Nothing from './Nothing';
import ImageModal from './ImageModal';
// 페이지 전환효과
const ScreenFrames = keyframes`
 from{
  transform:translateY(-10px);
 }
 to{
  transform:translateY(0);
 }
`;
const Component = styled.section`
  animation: ${ScreenFrames} 0.75s;
  position: relative;
  padding: 8.5rem 0;
  min-height: 100vh;
  background: #f2d9d9;

  .title {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(60px - (1280px - 100vw) * 0.0214047);
    color: #f781be;
  }

  .subTitle {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(50px - (1280px - 100vw) * 0.0214047);
    color: #fff;
  }

  p {
    line-height: 1.3;
    font-weight: 300;
    font-size: calc(18px - (1280px - 100vw) * 0.002166);
  }

  @media (max-width: 1024px) {
    padding-top: 5rem;
  }
`;

const Wrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 720px) {
    margin-top: 3rem;
  }
`;

const List = styled.ul`
  display: grid;
  gap: 1rem;
  margin-top: 5rem;
  padding: 1rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 720px) {
    margin-top: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.li`
  width: 100%;
  height: 500px;
  cursor: pointer;
  img {
    object-fit: cover;
  }

  @media (max-width: 720px) {
    height: 180px;
  }
`;

const Gallery = () => {
  const [modal, setModal] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const onModalActivate = (url: string) => {
    setModal(true);
    setImageURL(url);
  };

  const onModalClose = () => {
    setModal(false);
  };

  // 더미데이터
  const dummy = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    url: 'https://i.pinimg.com/564x/14/f4/6b/14f46b30ca9362cf8e39300333da709c.jpg',
    name: `Item ${index + 1}`,
  }));

  return (
    <Component>
      {modal && <ImageModal imageURL={imageURL} onModalClose={onModalClose} />}

      <Wrapper>
        <div>
          <span className='title'>Gallery.</span>&nbsp;&nbsp;&nbsp;
          <span className='subTitle'>NewJeans</span>
        </div>
        {/* 
TODO: 등록된 포스트없을때 이거 표시하게끔
        <Nothing /> */}

        <List>
          {dummy.map((item, index) => (
            <Zoom triggerOnce key={index}>
              <Item onClick={() => onModalActivate(item.url)}>
                <img
                  src='https://i.pinimg.com/564x/14/f4/6b/14f46b30ca9362cf8e39300333da709c.jpg'
                  alt=''
                />
              </Item>
            </Zoom>
          ))}
        </List>
      </Wrapper>
    </Component>
  );
};

export default Gallery;
