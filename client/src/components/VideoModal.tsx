import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import YouTube from 'react-youtube';

const Component = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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

const VideoWrap = styled.div`
  position: relative;

  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
  }
`;

const Error = styled.div`
  margin: 0 auto;
  position: relative;
  font-size: 20px;
  color: #fff;
  text-align: center;
  width: 20rem;
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
  videoId: string;
  onModalClose: () => void;
}

const VideoModal = ({ videoId, onModalClose }: ModalTypes) => {
  const [videoData, setVideoData] = useState<any>(null);
  const [videoID, setVideoID] = useState('');

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API;
    setVideoID(videoId);

    if (videoID) {
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${API_KEY}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setVideoData(data.items[0].snippet);
          //   setVideoData('error');
        })
        .catch((err) => {
          console.log(err);
          setVideoData('error');
        });
    }
  }, [videoID, videoId]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Component>
      <Wrapper>
        {videoData === 'error' ? (
          <Error>
            <Close onClick={onModalClose}>닫기</Close>
            에러가 발생했습니다.
            <br />
            다시 시도해주세요!
          </Error>
        ) : (
          <VideoWrap>
            <Close onClick={onModalClose}>닫기</Close>
            <YouTube videoId={videoID} opts={opts} />
          </VideoWrap>
        )}
      </Wrapper>
    </Component>
  );
};

export default VideoModal;
