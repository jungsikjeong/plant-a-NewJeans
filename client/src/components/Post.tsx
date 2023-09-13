import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { keyframes, styled } from 'styled-components';
import { BsExclamation } from 'react-icons/bs';
import FileUpload from './FileUpload';
import PostModal from './Modal/PostModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  setPostModalState,
  setIsPostModal,
  removeAllImage,
  clearPosts,
} from '../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import TextEditor from './TextEditor';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

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

const Button = styled.button<{ bgColor: string }>`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid #eee;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    color: #fff;
    background-color: ${({ bgColor }) => bgColor};
  }
`;

const Post = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [contentsLength, setContentsLength] = useState('');
  const [imageFile, setImageFile] = useState([]);
  const [uploadONBtn, setUploadONBtn] = useState(false);

  const navigator = useNavigate();

  const { isModal, images, postTitle, postContents, currentImageIndex } =
    useSelector((state: RootState) => state.postModal);
  const { uploadImages } = useSelector((state: RootState) => state.upload);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onImagePreview = (index: number) => {
    const data = { title, contents, uploadImages, index };

    dispatch(setIsPostModal());
    dispatch(setPostModalState(data));
  };

  const onPageReset = () => {
    dispatch(removeAllImage());
    setImageFile([]);
    navigator('/');
  };

  const titleLengthWarning = useMemo(() => {
    if (title.trim().length < 2) {
      return '제목은 최소 2글자이상 작성해주세요';
    }

    if (title.length > 6) {
      return '제목은 6글자 이하로 작성해주세요';
    }
    return '';
  }, [title]);

  const contentsLengthWarning = useMemo(() => {
    if (contents.length < 1) {
      return '내용은 최소 한글자이상 작성해주세요';
    }
    if (contents.length > 600) {
      return '내용은 600글자 이하로 작성해주세요';
    }
    return '';
  }, [contents]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (titleLengthWarning) {
      return alert(titleLengthWarning);
    }

    if (contentsLengthWarning) {
      return alert(contentsLengthWarning);
    }

    const body = {
      title,
      contents,
    };

    const formData = new FormData();

    for (const image of imageFile) {
      formData.append('images', image as any);
    }

    formData.append('data', JSON.stringify(body));

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    try {
      const res = await api.post('/posts', formData, config);
      if (res.status === 200) {
        dispatch(clearPosts());
        alert('게시글 작성이 완료되었습니다.');
        navigator('/pages/gallery');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const titleLengthRef = useRef<HTMLInputElement>(null);
  const contentsLengthRef = useRef<HTMLTextAreaElement>(null);

  // 제목,내용 length css
  useEffect(() => {
    if (title.length > 6) {
      titleLengthRef.current &&
        titleLengthRef.current.style.setProperty('color', 'red');
    } else {
      titleLengthRef.current &&
        titleLengthRef.current.style.setProperty('color', 'black');
    }
    if (contents.length > 600) {
      contentsLengthRef.current &&
        contentsLengthRef.current.style.setProperty('color', 'red');
    } else {
      contentsLengthRef.current &&
        contentsLengthRef.current.style.setProperty('color', 'black');
    }
  }, [title, contents]);

  useEffect(() => {
    if (contents.length > 0) {
      setContentsLength(contents.replace(/<\/?[^>]+(>|$)/g, ''));
    }
  }, [contents]);

  // 페이지 뒤로가기 Check
  useEffect(() => {
    window.addEventListener('popstate', () => onPageReset());
    return () => {
      window.addEventListener('popstate', () => onPageReset);
    };
  }, []);

  return (
    <Component>
      <Wrapper>
        <Header>
          <Box>
            <h3 className='page-title'>Create a gallery</h3>
          </Box>
          <Box style={{ cursor: 'pointer' }} data-tooltip-id='my-tooltip-1'>
            <BsExclamation />
            작성시 유의사항
          </Box>
          <ReactTooltip
            id='my-tooltip-1'
            place='bottom'
            content='다른 버니즈들을 위해서 정성을 담아 작성해주세요!'
          />
        </Header>

        <Form onSubmit={onSubmit}>
          <Box>
            <h3 className='text'>
              <span className='essential'>*</span> Title
            </h3>
            &nbsp;
            <span className='textLength'>
              <span ref={titleLengthRef}>{title.length}</span>
              /6
            </span>
          </Box>
          <Title
            placeholder='사진의 제목을 작성해주세요'
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
            <span className='textLength'>
              <span ref={contentsLengthRef}>{contentsLength.length}</span>
              /600
            </span>
          </Box>

          <TextEditor contents={contents} setContents={setContents} />

          {isModal && (
            <PostModal
              imageURL={images}
              postTitle={postTitle}
              postContents={postContents}
              currentImageIndex={currentImageIndex}
            />
          )}
          <FileUpload
            onImagePreview={onImagePreview}
            setImageFile={setImageFile}
          />
          <Button type='submit' bgColor={'skyblue'}>
            작성하기
          </Button>
          <Button type='button' bgColor={'tomato'} onClick={onPageReset}>
            취소하기
          </Button>
        </Form>
      </Wrapper>
    </Component>
  );
};

export default Post;
