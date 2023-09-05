import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByAuth } from '../store/authSlice';
import axios from 'axios';
import { RootState } from '../store';
import SocialKakao from './SocialKakao';

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
  padding: 8.5rem 0rem;
  height: 100vh;
  border-bottom: 1px solid #eee;
  background: #f2d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ScreenFrames} 0.75s;
  font-family: ${({ theme }) => theme.fonts.normally};

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 350px;
  min-height: 30rem;
  padding: 1rem;
  margin: 0 auto;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 5px;
`;

const Logo = styled.div`
  h2 {
    color: #000;
    font-weight: bold;
    font-size: 1.5rem;
  }

  p {
    line-height: 40px;
    color: #bbb;
    font-size: 0.875rem;
  }

  .underscore {
    border-bottom: 1px solid #bbb;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
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

const Button = styled.button<{ buttonStyles?: string }>`
  margin-top: 1rem;
  padding: 0.5rem;

  color: ${({ buttonStyles }) => (buttonStyles ? '#000' : '#bbb')};
  background-color: ${({ buttonStyles }) =>
    buttonStyles ? 'yellow' : '#fff9c9'};
  letter-spacing: -1px;
  border-radius: 5px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 0.875rem;
  color: #888;
  padding: 1rem 0;
  transition: all 0.3s ease;

  a {
    &:hover {
      font-weight: 500;
    }
  }

  span {
    font-size: 0.765rem;
    padding: 0 0.5rem;
  }
`;

const Message = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  color: tomato;
  font-size: 0.785rem;
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const { email, username, password } = formData;

  const [message, setMessage] = useState('');
  const [buttonStyles, setButtonStyles] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const navigator = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const inputRef = useRef<HTMLInputElement[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/\s/g, ''),
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || username === '') {
      inputRef.current[0].focus();
      return setMessage('이름을 입력해주세요');
    }
    if (username.length < 2) {
      inputRef.current[0].focus();
      return setMessage('이름이 너무 짧아요(최소 두글자)');
    }
    if (username.length > 5) {
      inputRef.current[0].focus();
      return setMessage('이름이 너무 길어요(최소 다섯글자)');
    }
    if (!email || email === '') {
      inputRef.current[1].focus();
      return setMessage('이메일을 입력해주세요');
    }

    if (password.length < 6) {
      inputRef.current[2].focus();
      return setMessage('비밀번호는 6글자이상 입력해주세요');
    }
    if (password.length > 6) {
      inputRef.current[2].focus();
      return setMessage('비밀번호는 6글자까지만 입력해주세요');
    }

    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem('token', JSON.stringify(res.data.token));

        dispatch(fetchByAuth());
        navigator('/');
      }
    } catch (err: any) {
      const message = err.response.data.msg;
      setMessage(message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (email && username && password && password.length >= 6) {
      setButtonStyles(true);
    }

    if (
      email === '' ||
      username === '' ||
      password === '' ||
      password.length < 6
    ) {
      setButtonStyles(false);
    }
  }, [email, username, password]);

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <Component>
      <Wrapper>
        <Logo>
          <h2>조금 더 친해지기</h2>
          <p>
            <span className='underscore'>회원가입</span>을 통해 뉴진스에게
            다가가보세요
          </p>
        </Logo>
        <Form onSubmit={onSubmit}>
          <Input
            type='type'
            placeholder='이름 입력'
            style={{ marginBottom: '.5rem' }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
            name='username'
            ref={(el: HTMLInputElement) => (inputRef.current[0] = el)}
          />
          <Input
            type='email'
            placeholder='이메일 입력'
            style={{ marginBottom: '.5rem' }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
            name='email'
            ref={(el: HTMLInputElement) => (inputRef.current[1] = el)}
          />
          <Input
            type='password'
            placeholder='비밀번호 입력'
            name='password'
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
            ref={(el: HTMLInputElement) => (inputRef.current[2] = el)}
          />
          {message && <Message>{message}</Message>}

          <Button buttonStyles={buttonStyles ? 'true' : ''}>회원가입</Button>
        </Form>
        <Box>
          <Link to='/pages/signin'>로그인</Link>
          <Link to='/pages/password'>비밀번호 찾기</Link>
        </Box>
        <Box>
          <hr style={{ width: '42%' }} />
          <span>또는</span>
          <hr style={{ width: '42%' }} />
        </Box>
        <Box>
          <SocialKakao />
        </Box>
      </Wrapper>
    </Component>
  );
};

export default SignUp;
