import React from 'react';
import { Link } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 14px;
  border: 1px solid #bbb;
  transition: all 0.3s ease;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border: 1px solid #777;
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
  color: #bbb;
  background-color: #fff9c9;
  letter-spacing: -1px;
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

const KakaoButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  color: #bbb;
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    color: #000;
  }

  @media (max-width: 500px) {
    color: #000;
  }
`;

const SignUp = () => {
  return (
    <Component>
      <Wrapper>
        <Logo>
          <h2>조금 더 친해지기</h2>
          <p>로그인을 통해 뉴진스에게 다가가보세요</p>
        </Logo>
        <Form>
          <Input
            type='email'
            placeholder='이메일 입력'
            style={{ marginBottom: '.5rem' }}
          />
          <Input type='password' placeholder='비밀번호 입력' />
          <Button>로그인</Button>
        </Form>
        <Box>
          <Link to='/pages/signup'>회원가입</Link>
          <Link to='/pages/password'>비밀번호 찾기</Link>
        </Box>
        <Box>
          <hr style={{ width: '42%' }} />
          <span>또는</span>
          <hr style={{ width: '42%' }} />
        </Box>
        <Box>
          <KakaoButton>
            <RiKakaoTalkFill size={29} /> &nbsp;카카오계정으로 로그인
          </KakaoButton>
        </Box>
      </Wrapper>
    </Component>
  );
};

export default SignUp;
