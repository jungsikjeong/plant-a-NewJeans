import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { styled } from 'styled-components';
import bannerImageData from '../../utils/banner';
import ImageModal from '../ImageModal';

const Component = styled.div`
  width: 100%;
  margin-top: 5rem;

  @media (max-width: 640px) {
    margin-top: 3rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  cursor: pointer;

  img {
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Section3Gallery = () => {
  const [modal, setModal] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const onModalActivate = (url: string) => {
    setModal(true);
    setImageURL(url);
  };

  const onModalClose = () => {
    setModal(false);
  };

  return (
    <Component>
      {modal && <ImageModal imageURL={imageURL} onModalClose={onModalClose} />}

      <Carousel
        showArrows={true}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        swipeable={true}
        centerMode={true}
        centerSlidePercentage={50}
        transitionTime={1600}
        showThumbs={false}
        interval={3500}
      >
        {bannerImageData.map((item, index) => (
          <Wrapper key={index} onClick={() => onModalActivate(item.url)}>
            <img src={item.url} alt='' />
          </Wrapper>
        ))}
      </Carousel>
    </Component>
  );
};

export default Section3Gallery;
