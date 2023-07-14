import React from 'react';
import { styled } from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import bannerImageData from '../utils/banner';

const Component = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .image-container {
    width: 100%;
    height: auto;
    max-height: 780px;
  }

  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }
`;

const TextComponent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrap = styled.div`
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: -75px;
    left: 50%;
    height: 40px;
    border-left: 1px solid rgba(255, 255, 255, 0.6);
  }
`;

const TextMain = styled.div`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: calc(94px - (1280px - 100vw) * 0.0485326) !important;
  color: #fff;
  line-height: 1.3;
`;

const TextSub = styled.div`
  font-family: ${({ theme }) => theme.fonts.logo};
  text-align: center;
  font-size: calc(18px - (1280px - 100vw) * 0.0004622) !important;
  color: #fbb8a9;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: -85px;
    left: 50%;
    height: 40px;
    border-left: 1px solid rgba(255, 255, 255, 0.6);
  }
`;

const Banner = () => {
  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc( 50% - 25px )',
    width: '30px',
    height: '62px',
    backgroundImage: 'url(/images/arrow.png)',
    cursor: 'pointer',
  };

  return (
    <Component>
      <Carousel
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type='button'
              onClick={onClickHandler}
              title={label}
              style={
                {
                  ...arrowStyles,
                  left: '10%',
                } as React.CSSProperties
              }
              className='hide-button'
            ></button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type='button'
              onClick={onClickHandler}
              title={label}
              style={
                {
                  ...arrowStyles,
                  right: '10%',
                  transform: 'scaleX(-1)',
                } as React.CSSProperties
              }
              className='hide-button'
            ></button>
          )
        }
        showArrows={true}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        animationHandler={'fade'}
        showThumbs={false}
      >
        {bannerImageData.map((data, index) => (
          <div className='image-container' key={index}>
            <img src={data.url} alt={data.alt} />
            <TextComponent>
              <TextWrap>
                <TextMain>
                  <p>{data.textMain}</p>
                </TextMain>
                <TextSub>
                  <p>{data.textSub}</p>
                </TextSub>
              </TextWrap>
            </TextComponent>
          </div>
        ))}
      </Carousel>
    </Component>
  );
};

export default Banner;
