import React from 'react';
import { styled } from 'styled-components';
import { useTransition, animated } from '@react-spring/web';

const Component = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 20;
  margin-bottom: -5px;
`;

const Wrapper = styled.div`
  width: 50rem;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #fff;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 27px;
    font-weight: 100;
    color: #fff;
  }

  img {
    max-width: 600px;
  }

  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
  }
`;

const Close = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3rem;
  background: #777;
  width: 50%;
  padding: 0.5rem;
  margin: 0 auto;
  border-radius: 4px;
  color: #fff;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.normally};

  &:hover {
    background: #888;
  }
`;

interface ModalTypes {
  onModalClose: () => void;
  imageURL: string;
}

const ImageModal = ({ onModalClose, imageURL }: ModalTypes) => {
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

  return (
    <Component>
      <Wrapper>
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
                <Close onClick={onModalClose}>닫기</Close>
                <h1>어텐션</h1>

                <img src={imageURL} alt='' />
              </ImageWrap>
            </animated.div>
          ) : null
        )}
      </Wrapper>
    </Component>
  );
};

export default ImageModal;
