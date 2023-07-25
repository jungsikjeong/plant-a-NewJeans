import React from 'react';
import { keyframes, styled } from 'styled-components';
import { Fade, Slide } from 'react-awesome-reveal';

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
  padding-top: 8rem;
  height: 100%;
  background: #f2d9d9;
  transition: all 0.3s ease;
  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  overflow-x: hidden;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin-top: 5rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 640px) {
    /* width: 150px; */
    height: 200px;
  }
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

const MobileHistory = () => {
  return (
    <Component>
      <Wrapper>
        <Section style={{ marginTop: '1rem' }}>
          <Box>
            <Image src='/images/history/history1.jpg' alt='' />

            <Contents>
              <Fade>
                <h1 className='title'>전설의 시작</h1>

                <div className='text'>
                  <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                    새로운 청바지의 시대가 열렸다.
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                    뉴진스(Newjeans) 이야기이다.
                  </Fade>
                  <br />
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                    옷장에 청바지는 필수 아이템이다.
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                    입고 싶은 티셔츠가 있을 때, 어떤 바지를 매치할지
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                    고민이 될 때는 자연스레 청바지를 찾게된다.
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                    뉴진스는, 언제든 그냥 들으면 무해하고 자연스러워
                  </Fade>
                  <br />
                  <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                    잘 어울리는 음악으로 자연스럽게 우리 곁으로 스며들었다.
                  </Fade>
                </div>
              </Fade>
            </Contents>
          </Box>
        </Section>

        <Slide triggerOnce>
          <Section>
            <Box>
              <Image src='/images/history/history2.jpg' alt='' />

              <Contents>
                <Fade>
                  <h1 className='title'>Attention</h1>
                  <div className='text'>
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      미국 차트쇼 1위 및 미국 스포티파이 차트 183위 진입,
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      멜론 차트 개편 이후 최초로 데뷔곡으로 1위 달성
                    </Fade>
                  </div>
                </Fade>
              </Contents>
            </Box>
          </Section>
        </Slide>

        <Slide triggerOnce>
          <Section>
            <Box>
              <Image src='/images/history/history3.jpg' alt='' />

              <Contents>
                <Fade>
                  <h1 className='title'>가장 많은 1위 차지</h1>

                  <div className='text'>
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      Ditto가 멜론 차트 역사상 일간 차트에서
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      가장 많이 1위를 차지한 곡이 되었다.
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      이 기록은 2023년 3월 27일까지 계속되어 99일
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      연속 일간차트 1위를 차지한 역대 최장기 1위
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      기록을 남겼다.
                    </Fade>
                  </div>
                </Fade>
              </Contents>
            </Box>
          </Section>
        </Slide>

        <Slide triggerOnce>
          <Section>
            <Box>
              <Image src='/images/history/history4.jpg' alt='' />

              <Contents>
                <Fade>
                  <h1 className='title'>코카콜라와 협업한 광고음악</h1>

                  <div className='text'>
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      코카콜라와 협업한 광고음악인 'Zero'가
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      지니 실시간차트 1위, 벅스 실시간 차트 3위,
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      멜론 '톱 100' 차트에서 4위, 한국 유트브 '인기 급상승'1위를
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      차지하면서 CM송으로써는 이례적인 음원성적을 거두었다.
                    </Fade>
                  </div>
                </Fade>
              </Contents>
            </Box>
          </Section>
        </Slide>

        <Slide triggerOnce>
          <Section>
            <Box>
              <Image src='/images/history/history5.jpg' alt='' />

              <Contents>
                <Fade>
                  <h1 className='title'>Hype Boy,Ditto,OMG 초대박</h1>

                  <div className='text'>
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      세계 최대 음원 플랫폼 '스포티파이'에서
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      스트리밍 횟수 3억건을 돌파했다.
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      이로써 NewJeans는 4세대 케이팝 걸그룹 최초로
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      스포티파이에서 3억 스트리밍 곡을 보유하게 됐다.
                    </Fade>
                  </div>
                </Fade>
              </Contents>
            </Box>
          </Section>
        </Slide>

        <Slide triggerOnce>
          <Section>
            <Box>
              <Image src='/images/history/history6.jpg' alt='' />

              <Contents>
                <Fade>
                  <h1 className='title'>미국에서 가장 영향력 있는 '100인'</h1>

                  <div className='text'>
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      NewJeans가 미국 비영리단체 골드하우스가 발표한
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      2023년 '미국에서 가장 영향력 있는 아시아인
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      100인'에 선정됐다.
                    </Fade>
                  </div>
                </Fade>
              </Contents>
            </Box>
          </Section>
        </Slide>

        <Slide triggerOnce>
          <Section>
            <Box>
              <Image src='/images/history/history7.jpg' alt='' />

              <Contents>
                <Fade>
                  <h1 className='title'>'2023 차세대 리더'로 선정</h1>

                  <div className='text'>
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      미국 타임 '2023 차세대 리더'로 선정되었다.
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      NewJeans는 올해 차세대 리더 명단에서 K-팝 아티스트로는
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      유일하게 이름을 올렸다.
                    </Fade>
                  </div>
                </Fade>
              </Contents>
            </Box>
          </Section>
        </Slide>

        <Slide triggerOnce>
          <Section style={{ paddingBottom: '6rem' }}>
            <Box>
              <Image src='/images/history/history8.jpg' alt='' />

              <Contents>
                <Fade>
                  <h1 className='title'>Super Shy 공개</h1>

                  <div className='text'>
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      2023년 7월 8일에 발매된, NewJeans의 두 번째
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      EP 《Get Up》의 선공개 싱글로 대중들에게
                    </Fade>
                    <br />
                    <Fade delay={1e3} cascade damping={0.3e-1} triggerOnce>
                      뉴진스가 돌아왔음을 알렸다.
                    </Fade>
                  </div>
                </Fade>
              </Contents>
            </Box>
          </Section>
        </Slide>
      </Wrapper>
    </Component>
  );
};

export default MobileHistory;
