import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { styled } from 'styled-components';
import bannerImageData from '../../utils/banner';

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
  return (
    <Component>
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
          <Wrapper key={index}>
            <img src={item.url} alt='' />
          </Wrapper>
        ))}
      </Carousel>
    </Component>
  );
};

export default Section3Gallery;
