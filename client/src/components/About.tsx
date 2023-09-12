import React, { useState } from 'react';
import { styled, keyframes } from 'styled-components';

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
  padding: 8.5rem 0;
  background: #f2d9d9;
  animation: ${ScreenFrames} 0.75s;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: none;
  @media (max-width: 1024px) {
    display: block;
    background-image: url('/images/history/history1.jpg');
  }
`;

const Wrapper = styled.div`
  max-width: 1280px;
  display: flex;
  padding: 3rem 1rem;
  margin: 0 auto;

  h1 {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(90px - (1280px - 100vw) * 0.0448272);
    color: #fff;
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(80px - (1280px - 100vw) * 0.0361632);
    color: #f781be;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: rgb(195, 88, 123);
    padding: 1rem 0;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Contents = styled.div`
  flex: 1;
  text-align: center;
`;

const Text = styled.div`
  padding: 1rem 0;
  p {
    padding-top: 1rem;
    line-height: 1.5;
    font-weight: 300;
    color: rgb(195, 88, 123);
    font-size: calc(18px - (1280px - 100vw) * 0.0015638);
  }

  span {
    font-weight: 600;
  }
`;

const Figure = styled.figure`
  padding-top: 1.5rem;
  flex: 1;
  max-width: 680px;
  margin: 0 auto;

  figcaption {
    padding: 7px 15px 8px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.01rem;
    color: #777;
    border-bottom: 1px solid #ececec;
  }
`;

const ImageArea = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 51.6129%;
  /* width: 20%; */
  left: 25%;
  left: 15%;
  &::after {
    content: '';
    width: 100%;
    height: calc(100% - 15px);
    position: absolute;
    left: -15px;
    top: -15px;
    z-index: 0;
    border: 1px solid #333;
  }

  .img-box {
    display: flex;
    position: relative;
    z-index: 1;
    border: 1px solid #333;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const About = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Component>
      <Banner />

      <Wrapper>
        <Contents>
          <h1
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            About.
          </h1>
          <h2>NewJeans</h2>

          <Text>
            <p>
              온 세상이 뉴진스이다.
              <br /> 통신, 패션, 의류, 교육, 금융 등 다양한 분야의 기업들이
              뉴진스를 광고모델로 섭외하고 있다. 뉴진스와 컬래버한 한정판 노트북
              에디션도 등장했다.
              <br />
              온라인에는 뉴진스의 노래를 활용한 '밈'도 자리잡고 있다.
              <br />
              그럼에도 불구하고 아직 뉴진스에 대해 많이 알지 못하는 사람도 분명
              존재한다. 그런 사람을 위해 준비했다.
              <br />
              <br />
              <span>'알쓸뉴잡'(알고보면 쓸데 있는 뉴진스 잡학사전)</span>
            </p>
          </Text>

          <Figure>
            <img src='/images/about/about1.jpg' alt='views' />
            <figcaption>
              뉴진스 다니엘, 하니, 혜인, 혜린, 민지(왼쪽 위부터 시계방향으로).
              사진제공=ADOR
            </figcaption>
          </Figure>

          <Text>
            <h3>뉴진스(New Jeans)가 누군데?</h3>

            <p>
              5인조 걸그룹 뉴진스는 2022년 7월 22일 데뷔했다.
              <br />
              그룹명에는 시대를 불문하고 남녀노소에게 사랑받은 청바지(Jean)처럼
              매일 찾게 되고 언제 입어도 질리지 않는 시대의 아이콘이 되겠다는
              뜻을 담았다.
              <br /> 또한 뉴진스의 진을 'Jean'이 아닌 'Gene'(유전자)으로 풀이해
              'K팝의 새로운 유전자'라는 해석도 가능하다.
            </p>
          </Text>

          <Text>
            <h3 style={{ letterSpacing: '-0.14rem' }}>
              {/* <h3> */}
              같은 듯 다른 매력, 민지·하니·다니엘·해린·혜인
            </h3>

            <p>
              뉴진스의 멤버는 민지, 하니, 다니엘, 해린, 혜인 총 다섯 명이다.
              <br />
              민지와 하니가 2004년생으로 가장 맏언니이며 다니엘(2005년생),
              해린(2006년생), 혜인(2008년생)이 뒤를 잇는다.
              <br /> 요즘 데뷔한 많은 아이돌이 그렇듯 딱히 보컬, 랩, 댄스 등의
              포지션이 구별되지 않는다.
              <br />
              뉴진스가 추구하는 음악 자체가 포지션별로 파트를 구분하던 기존
              아이돌 음악과는 차이가 있기 때문이다.
              <br />
              다만 팬덤 사이에서는 하니와 다니엘을 메인 보컬로 보고 있기는 하다.
            </p>
          </Text>

          <Text>
            <h3>"뉴진스의 하입 보이요"</h3>

            <p>
              뉴진스의 인기가 치솟으며 "뉴진스의 하입 보이요"라는 밈(meme)도
              유행하기 시작했다. 지난해 하반기에는 길거리에 지나다니는 사람들이
              듣고 있는 음악을 물어보는 유튜브 콘텐츠가 유행했다.
              <br /> 해당 콘텐츠가 인기를 얻자 다양한 패러디 영상이 등장했다.
              <br />
              길을 물어보는 사람에게도 "뉴진스의 하입보이요"라고 대답하고
              지나치는 것이다. 왜 하필 뉴진스의 '하입 보이'냐는 의문에는 '당시
              가장 유명한 곡이기 때문'이라는 답변이 가장 적절해보인다.
              <br /> 패러디는 점차 발전했고 모든 질문에 "뉴진스의
              하입보이요"라고 동문서답격의 대답을 하고 안무를 추며 지나가는
              밈으로 퍼졌다.
            </p>
          </Text>
        </Contents>

        <Contents>
          <ImageArea>
            <div className='img-box'>
              <img src='/images/about/about2.jpg' alt='' />
            </div>
          </ImageArea>
          <ImageArea style={{ left: '10rem' }}>
            <div className='img-box'>
              <img src='/images/about/about3.jpg' alt='' />
            </div>
          </ImageArea>
          <ImageArea>
            <div className='img-box'>
              <img src='/images/about/about4.jpg' alt='' />
            </div>
          </ImageArea>
          <ImageArea style={{ left: '10rem' }}>
            <div className='img-box'>
              <img src='/images/about/about5.jpg' alt='' />
            </div>
          </ImageArea>
          <ImageArea>
            <div className='img-box'>
              <img src='/images/about/about6.jpg' alt='' />
            </div>
          </ImageArea>
        </Contents>
      </Wrapper>
    </Component>
  );
};

export default About;
