import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { Button } from './common/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Galleries from './Galleries';

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
  margin: 0 auto;
  margin-top: 5rem;
  max-width: 960px;
  position: relative;
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

const Form = styled.form`
  animation: ${ScreenFrames} 0.75s;
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.786rem;
    margin-top: 0.2rem;
    padding: 0.5rem;
    text-align: center;
  }
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #bbb;
  transition: all 0.3s ease;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border: 1px solid #777;
  }
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

const EditFormButton = styled(Button)<{ buttonStyles: string }>`
  cursor: ${({ buttonStyles }) => (buttonStyles ? 'pointer' : 'default')};
  transition: all 0.3s ease;
  color: #ffffff;
  font-weight: bold;
  background-color: ${({ buttonStyles }) => (buttonStyles ? 'gray' : '#eee')};
`;

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
  const [formVisible, setFormVisible] = useState(false);
  const [userCheck, setUserCheck] = useState(false);
  const [selectDeleteMode, setSelectDeleteMode] = useState(false); // 게시글 선택 삭제 모드
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]); // 게시글 삭제할 포스터
  const { user, loading: userLoading }: any = useSelector(
    (state: RootState) => state.auth
  );
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigator = useNavigate();

  // 정보 변경하기전에 확인하는 코드
  const onSetUserCheck = () => {
    // 소셜로그인한 유저라면, 사용자 확인 할 필요가 없음
    if (user.provider !== '') {
      return setFormVisible((prev) => !prev);
    }

    if (!formVisible) {
      setUserCheck((prev) => !prev);
    } else if (formVisible) {
      setFormVisible((prev) => !prev);
      setUserCheck(false);
    }
  };

  useEffect(() => {
    // dispatch(fetchMyPageGetPosts());
  }, []);

  //   if (loading || userLoading) {
  //     return <Loading />;
  //   }

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

        {/* {posts.length !== 0 && (
          <Galleries
            posts={posts}
            loading={loading}
            selectDeleteMode={selectDeleteMode}
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
          />
        )} */}
        {/* {selectDeleteMode && (
          <Alert>삭제하고 싶은 게시물을 선택해주세요.</Alert>
        )} */}

        {/* 게시글 삭제하는 버튼 */}
        {/* {posts.length !== 0 && (
          <DeletePost
            setSelectDeleteMode={setSelectDeleteMode}
            selectDeleteMode={selectDeleteMode}
            selectedPosts={selectedPosts}
          />
        )} */}
      </Wrapper>
      {posts.length === 0 && (
        <NotPosts
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          아직 작성된 게시글들이 없네요..
          <br />
        </NotPosts>
      )}
    </Component>
  );
};

export default AdminPage;
