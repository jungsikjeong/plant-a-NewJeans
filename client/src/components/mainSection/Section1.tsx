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
  /* padding-bottom: 120px; */
  padding-bottom: calc(
    (100vw * 0.0078125 + (1280px - 100vw) * 0.0023777) * 12
  ) !important;

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
    line-height: 1.3;
    color: rgb(195, 88, 123);
    font-weight: 300;
    text-align: left;
    font-size: calc(18px - (1280px - 100vw) * 0.0015638) !important;
    padding: 3rem 0;
    padding-left: 1rem;
    font-family: ${({ theme }) => theme.fonts.sentence};

    @media (max-width: 640px) {
      padding: 1rem;

      .mr {
        margin-left: 0.3rem;
      }
    }
  }

  .title {
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

  @media (max-width: 1000px) {
    padding: 0 1rem;
  }

  @media (max-width: 640px) {
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
    //원본
    /* transform: rotateY(10deg) rotateX(-10deg); */
    transform: rotateY(-4deg) rotateX(1deg);
    transition: transform 0.3s linear;

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
            <span className='title'>plant</span>&nbsp; newjeans
          </h1>

          <p>
            <span className='mr'>영</span>원한 젊음의 대명사인 청바지처럼
            <br />
            질리지 않는 음악을 하겠다는 그들의 각오처럼
            <br />
            오리진의 유전자를 계속 지켜가며 건강한 그룹으로 성장해가는
            뉴진스라는 이름처럼..
            {/* 새로운 시대, 새로운 세대를 대변하는 음악을 앞으로도 계속 들려줬으면
            좋겠습니다. */}
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
