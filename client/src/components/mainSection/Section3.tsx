import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import Galleries from '../Galleries';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchGetPosts } from '../../store/postsSlice';
import { RootState } from '../../store';

const Component = styled.section`
  background-image: linear-gradient(to bottom right, #fdcec4, #ddc5d1, #c3c1d9);
`;

const Wrapper = styled.div`
  padding-top: 50px;
  padding-bottom: calc((100vw * 0.0078125 + (1280px - 100vw) * 0.0023777) * 14);
`;

const Text = styled.div`
  max-width: 1260px;
  margin: 0 auto -40px;
  padding: 0 100px 0 10px;
  color: #fff;

  h1 {
    color: #f781be;
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(80px - (1280px - 100vw) * 0.0543477) !important;
    padding-bottom: 1rem;
    span {
      color: #fff;
    }
  }

  h2 {
    margin-top: 1rem;
    font-size: calc(23px - (1280px - 100vw) * 0.0002082);
    color: #999999;
    font-family: ${({ theme }) => theme.fonts.sentence};
  }

  p {
    padding: 1rem;
    padding-left: 1.2rem;
    color: #999999;
    font-size: calc(20px - (1280px - 100vw) * 0.0002082);
    font-family: ${({ theme }) => theme.fonts.sentence};
    @media (max-width: 640px) {
      letter-spacing: -1.2px;
    }
  }
`;

const Section3 = () => {
  let page = 1;

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { posts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchGetPosts(page));
  }, []);

  return (
    <Component>
      <Wrapper>
        <Text>
          <h1>
            Newjeans.<span>Gallery</span>
          </h1>

          <h2>내가 고른 사진이 갤러리에'</h2>

          <p>
            제가 고른 이 사진에 대해 말씀드려 볼게요
            <br />이 사진은 말이죠...
          </p>
        </Text>

        <Galleries posts={posts} />
      </Wrapper>
    </Component>
  );
};

export default Section3;
