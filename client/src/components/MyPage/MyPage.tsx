import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { styled, keyframes } from 'styled-components';
import { RootState } from '../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchMyPageGetPosts } from '../../store/postsSlice';
import Galleries from '../Galleries';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { api } from '../../api';
import CheckForm from './CheckForm';
import { Button } from '../common/Styles';
import { fetchByAuth } from '../../store/authSlice';
import { useForm } from 'react-hook-form';
import DeletePost from './DeletePost';
import Alert from '../common/Alert';

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

const User = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

const MyPage = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [userCheck, setUserCheck] = useState(false);
  const [selectDeleteMode, setSelectDeleteMode] = useState(false); // 게시글 선택 삭제 모드
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]); // 게시글 삭제할 포스터
  const { user, loading: userLoading }: any = useSelector(
    (state: RootState) => state.auth
  );
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ defaultValues: { username: user.username, password: '' } });

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

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/users/edit/profile', {
        username: data.username,
        password: data.password,
      });
      if (res.status === 200) {
        dispatch(fetchByAuth());
        setValue('password', '');
        alert('정보가 변경되었습니다.');
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchMyPageGetPosts());
  }, []);

  if (loading || userLoading) {
    return <Loading />;
  }

  return (
    <Component>
      <Title>
        mypage <BgImage src='/images/cat.jpg' alt='' />
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

        <User>
          <p>{user?.username}</p>
          <Button bgColor={'tomato'} onClick={onSetUserCheck}>
            <span>Change information</span>
          </Button>

          {user && user.provider === '' && userCheck && (
            <CheckForm
              setFormVisible={setFormVisible}
              setUserCheck={setUserCheck}
              email={user.email}
            />
          )}

          {formVisible && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <p>정보변경을 해주세요..</p>

              <Input
                type='text'
                placeholder='이름 입력'
                {...register('username', {
                  required: true,
                  maxLength: {
                    value: 5,
                    message: '이름은 5글자이하로 입력해주세요',
                  },
                  minLength: {
                    value: 2,
                    message: '이름은 2글자이상 입력해주세요.',
                  },
                })}
              />

              {user.provider === '' && (
                <Input
                  type='password'
                  placeholder='비밀번호 입력'
                  {...register('password', {
                    required: false,
                    maxLength: {
                      value: 6,
                      message: '비밀번호는 6글자이하로 입력해주세요',
                    },
                    minLength: {
                      value: 6,
                      message: '비밀번호는 6글자까지 입력해주세요.',
                    },
                  })}
                />
              )}
              {/* {message && <Message>{message}</Message>} */}
              {errors && (
                <Message>
                  {errors.username?.message as any}
                  <br />
                  {errors.password?.message as any}
                </Message>
              )}

              <EditFormButton buttonStyles={isValid ? 'true' : ''}>
                변경하기
              </EditFormButton>
            </Form>
          )}
        </User>

        {posts.length !== 0 && (
          <Galleries
            posts={posts}
            loading={loading}
            selectDeleteMode={selectDeleteMode}
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
          />
        )}
        {selectDeleteMode && (
          <Alert>삭제하고 싶은 게시물을 선택해주세요.</Alert>
        )}

        {/* 게시글 삭제하는 버튼 */}
        {posts.length !== 0 && (
          <DeletePost
            setSelectDeleteMode={setSelectDeleteMode}
            selectDeleteMode={selectDeleteMode}
            selectedPosts={selectedPosts}
          />
        )}
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
          아직 작성한 게시글이 없습니다..
          <br />
        </NotPosts>
      )}
    </Component>
  );
};

export default MyPage;
