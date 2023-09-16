import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { BsExclamation } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import { Tooltip as ReactTooltip } from 'react-tooltip';
import { RootState } from '../../store';
import NewsPostEditor from './NewsPostQuill';
import { Navigate } from 'react-router-dom';
import Loading from '../Loading';

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
  min-height: 110vh;
  border-bottom: 1px solid #eee;
  background: #f2d9d9;
  display: flex;
  justify-content: center;
  animation: ${ScreenFrames} 0.75s;
  font-family: ${({ theme }) => theme.fonts.normally};

  .textLength {
    font-family: ${({ theme }) => theme.fonts.logo};
  }

  .essential {
    color: #44d7be;
  }
`;

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;

  @media (min-width: 1024px) {
    margin-top: 5rem;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  color: #666;
  font-size: 0.875rem;
  margin: 1rem 0;
  .page-title {
    font-size: 2rem;
    font-family: ${({ theme }) => theme.fonts.logo};
    color: black;
    background: linear-gradient(to right bottom, #ffa69e, #507dff);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;

  .text {
    font-family: ${({ theme }) => theme.fonts.logo};
    padding: 0.3rem 0;
  }
`;

const Title = styled.input`
  margin-bottom: 1rem;
  height: 35px;
  outline: none;
  background-color: inherit;
  border: 1px solid #eee;
  padding: 0.5rem;
  border-radius: 5px;
`;

const EditNews = () => {
  const [title, setTitle] = useState(''); // news 제목
  const [contents, setContents] = useState(''); // news 내용
  const titleLengthRef = useRef<HTMLInputElement>(null);

  const { user, loading: userLoading }: any = useSelector(
    (state: RootState) => state.auth
  );

  // 제목 길이에 css
  useEffect(() => {
    if (title.length > 40) {
      titleLengthRef.current &&
        titleLengthRef.current.style.setProperty('color', 'red');
    } else {
      titleLengthRef.current &&
        titleLengthRef.current.style.setProperty('color', 'black');
    }
  }, [title, contents]);

  if (userLoading) {
    return <Loading />;
  }

  if (!userLoading && user && user.manager !== 'admin') {
    alert('관리자가 아니면 접근할 수 없습니다.');

    return <Navigate to='/' />;
  }

  return (
    <Component>
      <Wrapper>
        <Header>
          <Box>
            <h3 className='page-title'>Create a News'</h3>
          </Box>
          <Box style={{ cursor: 'pointer' }} data-tooltip-id='my-tooltip-1'>
            <BsExclamation />
            작성시 유의사항
          </Box>
          <ReactTooltip
            id='my-tooltip-1'
            place='bottom'
            content='버니즈들이 궁금할만한 소식을 정성스럽게 작성해주세요!'
          />
        </Header>

        <Form>
          <Box>
            <h3 className='text'>
              <span className='essential'>*</span> Title
            </h3>
            &nbsp;
            <span className='textLength'>
              <span ref={titleLengthRef}>{title.length}</span>/ 40
            </span>
          </Box>
          <Title
            placeholder='뉴스의 제목을 작성해주세요'
            type='text'
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <Box>
            <h3 className='text'>
              <span className='essential'>*</span> Contents
            </h3>
            &nbsp;
            <span className='textLength'></span>
          </Box>

          <NewsPostEditor
            title={title}
            contents={contents}
            setContents={setContents}
          />
        </Form>
      </Wrapper>
    </Component>
  );
};

export default EditNews;
