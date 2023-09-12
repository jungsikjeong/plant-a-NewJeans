import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useTransition, animated } from '@react-spring/web';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState, setPostModalClose } from '../../store';

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 500;
  margin-bottom: -5px;

  .carousel-status {
    position: initial;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
`;

const ImageWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;

  h1 {
    color: #fff;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 27px;
    font-weight: 100;
    color: #fff;
  }

  .image-container {
    height: auto;
    max-height: 780px;
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 600px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
  }
`;

const BtnWrap = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
`;

const Close = styled.button`
  position: relative;
  cursor: pointer;
  z-index: 10;
  font-size: 1.4rem;
  margin: 0 auto;
  border-radius: 4px;
  color: #fff;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.normally};

  &:hover {
    opacity: 0.7;
  }
`;

const Contents = styled.p`
  max-width: 600px;
  margin-top: 1rem;
  color: #fff;
`;

const EditBtn = styled(Close)``;

interface ModalTypes {
  imageURL: any[];
  postTitle: string;
  postContents: string;
  currentImageIndex?: number;
  writer?: string;
  postId?: string;
}

const PostModal = ({
  writer,
  imageURL,
  postTitle,
  postContents,
  currentImageIndex,
  postId,
}: ModalTypes) => {
  const [defaultImage, setDefaultImage] = useState(
    imageURL.some(
      (image) => typeof image === 'string' && image.includes('/images/')
    )
  );
  const { user }: any = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const location = useLocation();

  const onModalClose = () => {
    dispatch(setPostModalClose());
  };

  const onEscapeBtnClose = (e: any) => {
    if (e.key === 'Escape') {
      // Escape 키 눌렀을 때 처리할 내용
      dispatch(setPostModalClose());
    }
  };

  const transition = useTransition(true, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  });

  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    right: 0,
    width: '30px',
    height: '22px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '1rem',
  };

  let nonEmptyImages: any[] = [];

  if (location.pathname === '/pages/post') {
    // 여러 사진들중 내가 선택한 이미지가 모달창에 먼저 보이게
    const displayedImages = [
      ...imageURL.slice(currentImageIndex),
      ...imageURL.slice(0, currentImageIndex),
    ];

    // 이미지 url:'' 이렇게된거를 제외해줌
    nonEmptyImages = displayedImages.filter((item) => item.url.length);
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => onEscapeBtnClose(e));

    return () => {
      document.removeEventListener('keydown', (e) => onEscapeBtnClose(e));
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setPostModalClose());
    };
  }, []);

  return (
    <Component>
      <Wrapper>
        {location.pathname === '/pages/post' && (
          <>
            {transition((style, item) =>
              item ? (
                <animated.div
                  style={{
                    ...style,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <ImageWrap>
                    <BtnWrap>
                      <Close onClick={onModalClose}>
                        <AiOutlineClose />
                      </Close>
                    </BtnWrap>

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
                                right: '7%',
                              } as React.CSSProperties
                            }
                            className='hide-button'
                          >
                            «
                          </button>
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
                                // transform: 'scaleX(-1)',
                              } as React.CSSProperties
                            }
                            className='hide-button'
                          >
                            »
                          </button>
                        )
                      }
                      swipeable={false}
                      showArrows={true}
                      showStatus={true}
                      autoPlay={false}
                      infiniteLoop={true}
                      animationHandler={'fade'}
                      showThumbs={false}
                    >
                      {nonEmptyImages.map((data, index) => (
                        <div className='image-container' key={index}>
                          <h1>{postTitle || '제목'}</h1>
                          <img src={data.url} alt={'이미지'} />
                        </div>
                      ))}
                    </Carousel>

                    {postContents.length === 0 ? (
                      <Contents>내용</Contents>
                    ) : (
                      <Contents
                        dangerouslySetInnerHTML={{
                          __html: postContents,
                        }}
                      />
                    )}
                  </ImageWrap>
                </animated.div>
              ) : null
            )}
          </>
        )}

        {location.pathname !== '/pages/post' && (
          <>
            {transition((style, item) =>
              item ? (
                <animated.div
                  style={{
                    ...style,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <ImageWrap>
                    <BtnWrap>
                      {writer === user?._id && (
                        <EditBtn>
                          <Link to={`/pages/edit/${postId}`}>
                            <BiEdit />
                          </Link>
                        </EditBtn>
                      )}

                      <Close onClick={onModalClose}>
                        <AiOutlineClose />
                      </Close>
                    </BtnWrap>

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
                                right: '7%',
                              } as React.CSSProperties
                            }
                            className='hide-button'
                          >
                            «
                          </button>
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
                                // transform: 'scaleX(-1)',
                              } as React.CSSProperties
                            }
                            className='hide-button'
                          >
                            »
                          </button>
                        )
                      }
                      autoFocus={true}
                      useKeyboardArrows={true}
                      swipeable={false}
                      showArrows={true}
                      showStatus={true}
                      autoPlay={false}
                      infiniteLoop={true}
                      animationHandler={'fade'}
                      showThumbs={false}
                    >
                      {imageURL.map((data, index) => (
                        <div className='image-container' key={index}>
                          <h1>{postTitle}</h1>

                          {defaultImage ? (
                            <img src={data} alt={'이미지'} />
                          ) : (
                            <img
                              src={`https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/gallery/${data}`}
                              alt={'이미지'}
                            />
                          )}
                        </div>
                      ))}
                    </Carousel>

                    <Contents
                      dangerouslySetInnerHTML={{
                        __html: postContents,
                      }}
                    />
                  </ImageWrap>
                </animated.div>
              ) : null
            )}
          </>
        )}
      </Wrapper>
    </Component>
  );
};

export default PostModal;
