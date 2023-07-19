import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { Fade, Slide } from 'react-awesome-reveal';

const Component = styled.section`
  padding-top: 8rem;
  height: 100%;
  background: #f2d9d9;
  transition: all 0.3s ease;
  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const Wrapper = styled.div<{ bgUrl: string }>`
  position: relative;
  width: 100%;
  height: 1000vh;
  background-attachment: fixed;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)),
    url(${({ bgUrl }) => bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const Section = styled.div`
  display: flex;
  position: absolute;
  top: 10rem;
  left: calc(5rem - (1280px - 100vw) * 0.0485326);
`;

const Box = styled.div`
  border: 1px solid #eee;
  height: 100%;
`;

const Image = styled.img`
  width: 250px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  transform: rotate(-7deg);

  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;

  .title {
    font-size: calc(18px - (1280px - 100vw) * 0.0015638);
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .text {
    font-size: calc(14px - (1280px - 100vw) * 0.0015638);
    line-height: 1.3;
    font-weight: 300;
    word-break: keep-all;
  }
`;

const Continue = styled.div`
  width: 100%;
  height: 500px;
  color: #fff;
  font-size: 50px;
  text-align: center;
  div {
    position: sticky;
    top: 10rem;
    height: 100px;
  }
`;

const TopButton = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 50px;

  button {
    position: relative;
    animation: bounce 1s infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  img {
    width: 100px;
  }
`;

const PCHistory = () => {
  const [isContents, setIsContents] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const sectionRefs = useRef([null, null, null, null, null, null, null]);

  const onMouseOver = (index: number) => {
    setIsContents((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const onMouseOut = (index: number) => {
    setIsContents((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const onTopButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Component>
      <Wrapper
        bgUrl={
          'https://i.pinimg.com/originals/20/5e/44/205e44e31f73017ada8405351254fc77.jpg'
        }
      >
        <Section
          ref={sectionRefs.current[0]}
          onMouseOver={() => onMouseOver(0)}
          onMouseOut={() => onMouseOut(0)}
        >
          <Box>
            <Image src='/images/history/history1.jpg' alt='' />
          </Box>
          {isContents[0] && (
            <Contents>
              <Fade>
                <h1 className='title'>전설의 시작</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    새로운 청바지의 시대가 열렸다. 뉴진스(Newjeans) 이야기이다.
                  </Fade>
                  <br />
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    옷장에 청바지는 필수 아이템이다.
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    입고 싶은 티셔츠가 있을 때, 어떤 바지를 매치할지 고민이 될
                    때는
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    자연스레 청바지를 찾게된다. 뉴진스는,
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    언제든 그냥 들으면 무해하고 자연스러워 잘 어울리는 음악으로
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    자연스럽게 우리 곁으로 스며들었다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section
          style={{ top: '100vh' }}
          ref={sectionRefs.current[1]}
          onMouseOver={() => onMouseOver(1)}
          onMouseOut={() => onMouseOut(1)}
        >
          <Box style={{ height: '165px' }}>
            <Image
              src='/images/history/history2.jpg'
              style={{
                objectFit: 'contain',
                height: 'auto',
                transform: 'rotate(-10deg)',
              }}
              alt=''
            />
          </Box>
          {isContents[1] && (
            <Contents>
              <Fade>
                <h1 className='title'>Attention</h1>
                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    미국 차트쇼 1위 및 미국 스포티파이 차트 183위 진입,
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    멜론 차트 개편 이후 최초로 데뷔곡으로 1위 달성
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section
          style={{ top: '200vh' }}
          ref={sectionRefs.current[2]}
          onMouseOver={() => onMouseOver(2)}
          onMouseOut={() => onMouseOut(2)}
        >
          <Box>
            <Image src='/images/history/history3.jpg' alt='' />
          </Box>
          {isContents[2] && (
            <Contents>
              <Fade>
                <h1 className='title'>가장 많은 1위 차지</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    Ditto가 멜론 차트 역사상 일간 차트에서 가장 많이 1위를
                    차지한 곡이 되었다.
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    이 기록은 2023년 3월 27일까지 계속되어 99일 연속 일간차트
                    1위를
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    차지한 역대 최장기 1위 기록을 남겼다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section
          style={{ top: '300vh' }}
          ref={sectionRefs.current[3]}
          onMouseOver={() => onMouseOver(3)}
          onMouseOut={() => onMouseOut(3)}
        >
          <Box>
            <Image src='/images/history/history4.jpg' alt='' />
          </Box>
          {isContents[3] && (
            <Contents>
              <Fade>
                <h1 className='title'>코카콜라와 협업한 광고음악</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    코카콜라와 협업한 광고음악인 'Zero'가
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    지니 실시간차트 1위, 벅스 실시간 차트 3위,
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    멜론 '톱 100' 차트에서 4위, 한국 유트브 '인기 급상승'1위를
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    차지하면서 CM송으로써는 이례적인 음원성적을 거두었다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section
          style={{ top: '400vh' }}
          ref={sectionRefs.current[4]}
          onMouseOver={() => onMouseOver(4)}
          onMouseOut={() => onMouseOut(4)}
        >
          <Box>
            <Image
              src='/images/history/history5.jpg'
              alt=''
              style={{
                objectFit: 'contain',
                height: 'auto',
                transform: 'rotate(-10deg)',
              }}
            />
          </Box>
          {isContents[4] && (
            <Contents>
              <Fade>
                <h1 className='title'>Hype Boy,Ditto,OMG 초대박</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    세계 최대 음원 플랫폼 '스포티파이'에서 스트리밍 횟수 3억건을
                    돌파했다.
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    이로써 NewJeans는 4세대 케이팝 걸그룹 최초로 스포티파이에서
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    3억 스트리밍 곡을 보유하게 됐다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section
          style={{ top: '500vh' }}
          ref={sectionRefs.current[5]}
          onMouseOver={() => onMouseOver(5)}
          onMouseOut={() => onMouseOut(5)}
        >
          <Box>
            <Image
              src='/images/history/history6.jpg'
              alt=''
              style={{
                objectFit: 'contain',
                height: 'auto',
                transform: 'rotate(-10deg)',
              }}
            />
          </Box>
          {isContents[5] && (
            <Contents>
              <Fade>
                <h1 className='title'>미국에서 가장 영향력 있는 '100인'</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    NewJeans가 미국 비영리단체 골드하우스가 발표한
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    2023년 '미국에서 가장 영향력 있는 아시아인 100인'에
                    선정됐다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section
          style={{ top: '600vh' }}
          ref={sectionRefs.current[6]}
          onMouseOver={() => onMouseOver(6)}
          onMouseOut={() => onMouseOut(6)}
        >
          <Box>
            <Image
              src='/images/history/history7.jpg'
              alt=''
              style={{
                objectFit: 'contain',
                height: 'auto',
                transform: 'rotate(-10deg)',
              }}
            />
          </Box>
          {isContents[6] && (
            <Contents>
              <Fade>
                <h1 className='title'>'2023 차세대 리더'로 선정</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    미국 타임 '2023 차세대 리더'로 선정되었다.
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    NewJeans는 올해 차세대 리더 명단에서 K-팝 아티스트로는
                    유일하게 이름을 올렸다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section
          style={{ top: '700vh' }}
          ref={sectionRefs.current[7]}
          onMouseOver={() => onMouseOver(7)}
          onMouseOut={() => onMouseOut(7)}
        >
          <Box>
            <Image
              src='/images/history/history8.jpg'
              alt=''
              style={{
                objectFit: 'contain',
                height: 'auto',
                transform: 'rotate(-10deg)',
              }}
            />
          </Box>
          {isContents[7] && (
            <Contents>
              <Fade>
                <h1 className='title'>Super Shy 공개</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    2023년 7월 8일에 발매된, NewJeans의 두 번째
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    EP 《Get Up》의 선공개 싱글로 대중들에게
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1}>
                    뉴진스가 돌아왔음을 알렸다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          )}
        </Section>

        <Section style={{ top: '800vh', left: '0', width: '100%' }}>
          <Continue>
            <div>뉴진스는 계속 됩니다!</div>
          </Continue>
        </Section>
      </Wrapper>

      <TopButton>
        <button onClick={onTopButtonClick}>
          <img src='/images/arrow2.png' alt='' />
        </button>
      </TopButton>
    </Component>
  );
};

export default PCHistory;
