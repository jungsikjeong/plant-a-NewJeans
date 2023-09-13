import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { Button } from '../common/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Navigate, useNavigate } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { fetchGetPosts } from '../../store/postsSlice';
import AllPosts from './AllPosts';

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
  height: 120vh;
  background: #f2d9d9;
  animation: ${ScreenFrames} 0.75s;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  /* margin-top: 5rem; */
  max-width: 960px;
`;

const Title = styled.h1`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.logo};
  font-weight: bolder;
  font-size: 60px;
  background: linear-gradient(to right bottom, #507dff, #ffa69e);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  flex: 1 1 auto;
  transition: all 0.3s ease;
  text-align: center;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  color: tomato;
  font-size: 0.785rem;
`;

const GoHomeButton = styled.button`
  position: absolute;
  top: 15px;
  left: 0;
  cursor: pointer;
  z-index: 10;
  font-size: 3rem;
  margin: 0 auto;
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.normally};

  &:hover {
    opacity: 0.7;
  }
`;

const Collection = styled.div``;

const BgImage = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 2rem;
`;

const NotPosts = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const AdminPage = () => {
  let AllPostPage = 1;

  const { user, loading: userLoading }: any = useSelector(
    (state: RootState) => state.auth
  );
  const { posts } = useSelector((state: RootState) => state.posts);
  const { newsPosts } = useSelector((state: RootState) => state.newsPosts);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const navigator = useNavigate();

  useEffect(() => {
    dispatch(fetchGetPosts(AllPostPage));
  }, []);

  return (
    <Component>
      <Title>
        adminPage <BgImage src='/images/cat.jpg' alt='' />
      </Title>
      <Wrapper>
        {/* 페이지 나가기 버튼 */}
        <GoHomeButton onClick={() => navigator('/')}>
          <IoMdArrowRoundBack data-tooltip-id='my-tooltip-1' />
          <ReactTooltip
            id='my-tooltip-1'
            place='bottom'
            content='뒤로가기'
            style={{ fontSize: '.5rem' }}
          />
        </GoHomeButton>

        {/* 뒤로가기 버튼과 게시물들을 분리시키기위해서 씀 */}
        <Collection
          style={{ display: 'flex', justifyContent: 'center' }}
        ></Collection>

        <Collection style={{ marginTop: '5rem' }}>
          {posts.length !== 0 && <AllPosts posts={posts} />}
          {newsPosts.length !== 0 && <AllPosts newsPosts={newsPosts} />}
        </Collection>
      </Wrapper>
    </Component>
  );
};

export default AdminPage;
