import React, { useState } from 'react';
import { styled } from 'styled-components';
import VideoModal from './VideoModal';
import albumData from '../utils/albumData';

const Component = styled.section`
  position: relative;
  padding: 8.5rem 0;
  background: #f2d9d9;

  h1 {
    margin-top: 3rem;
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(80px - (1280px - 100vw) * 0.0448272);
    color: #fff;
    @media (max-width: 1024px) {
      margin-top: 0rem;
    }
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(70px - (1280px - 100vw) * 0.0361632);
    color: #f781be;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.div`
  padding: 1.875rem;
  border: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;

  &:not(:first-child):hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  .title {
    font-family: ${({ theme }) => theme.fonts.logo};
    text-align: center;
    font-size: 20px;
  }

  img {
    padding: 1.875rem 0;
    object-fit: cover;
  }
`;

const Album = () => {
  const [modal, setModal] = useState(false);
  const [videoID, setVideoID] = useState('');

  const onModalActivate = (modalId: string) => {
    setModal(true);
    setVideoID(modalId);
  };

  const onModalClose = () => {
    setModal(false);
  };

  return (
    <Component>
      {modal && <VideoModal videoId={videoID} onModalClose={onModalClose} />}
      <Wrapper>
        <Item>
          <h1>Album.</h1>
          <h2>NewJeans</h2>

          <p style={{ paddingTop: '1rem' }}>
            뉴진스의 앨범들을
            <br />
            다양하게 즐겨보세요!
          </p>
        </Item>
        {albumData.map((item, index) => (
          <Item onClick={() => onModalActivate(item.videoId)} key={index}>
            <p className='title'>{item.title}</p>

            <img src={item.url} alt={item.alt} />
          </Item>
        ))}
      </Wrapper>
    </Component>
  );
};

export default Album;
