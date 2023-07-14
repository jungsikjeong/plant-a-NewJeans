import React from 'react';
import { styled } from 'styled-components';

const Component = styled.section`
  padding-top: 8rem;
  background-color: #f2d9d9;
  @media (max-width: 640px) {
    padding-top: 4rem;
  }
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin: 0 auto;
  padding-bottom: 120px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Contents = styled.div`
  width: 100%;
  font-weight: 100;
  padding-top: 40px;
  text-align: left;

  h1 {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(60px - (1280px - 100vw) * 0.0214047) !important;
    color: rgb(247, 129, 190);
    padding: 0 1rem;
  }

  p {
    width: 90%;
    line-height: 1.5;
    color: rgb(195, 88, 123);
    font-weight: 300;
    text-align: left;
    font-size: calc(18px - (1280px - 100vw) * 0.0015638) !important;
    padding: 3rem 0;
    padding-left: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 640px) {
      padding: 0 1rem;
    }
  }

  span {
    font-size: calc(100px - (1280px - 100vw) * 0.0543477) !important;
    color: #fff;
  }
`;

const Image = styled.div<{ maxwith: string }>`
  margin: 0 auto;
  width: 100%;
  height: 600px;
  max-width: ${({ maxwith }) => maxwith};
  perspective: 1000px;

  @media (max-width: 640px) {
    padding: 0 1rem;
    max-width: 100%;
    height: 450px;
    perspective: 0px;
  }

  &:hover img {
    transform: none;
  }

  img {
    border-radius: 10px;
    object-fit: cover;

    transform: rotateY(10deg) rotateX(-10deg);
    transition: transform 0.3s ease-in-out;

    @media (max-width: 640px) {
      transform: rotateY(0deg) rotateX(0deg);
    }
  }
`;

const Section1 = () => {
  return (
    <Component>
      <Wrapper>
        <Contents>
          <h1>
            newjeans&nbsp;
            <span>plant</span>
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit
          </p>

          <Image maxwith={'527px'}>
            <img src='/images/section01-2.jpg' alt='이미지2' />
          </Image>
        </Contents>

        <Image maxwith={'468px'}>
          <img src='/images/section01-1.jpg' alt='이미지1' />
        </Image>
      </Wrapper>
    </Component>
  );
};

export default Section1;
