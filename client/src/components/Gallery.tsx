import React, { useEffect, useRef, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { keyframes, styled } from 'styled-components';
import Nothing from './Nothing';
import PostModal from './Modal/PostModal';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState, clearPosts, setIsPostModal } from '../store';
import { fetchGetPosts } from '../store/postsSlice';
import randomGalleryImage from '../utils/randomGalleryImage';
import Loading from './Loading';

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
  animation: ${ScreenFrames} 0.75s;
  position: relative;
  padding: 8.5rem 0;
  min-height: 100vh;
  background: #f2d9d9;

  .title {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(60px - (1280px - 100vw) * 0.0214047);
    color: #f781be;
  }

  .subTitle {
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: calc(50px - (1280px - 100vw) * 0.0214047);
    color: #fff;
  }

  p {
    line-height: 1.3;
    font-weight: 300;
    font-size: calc(18px - (1280px - 100vw) * 0.002166);
  }

  @media (max-width: 1024px) {
    padding-top: 0.5rem;
  }
`;

const Wrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 720px) {
    margin-top: 3rem;
  }
`;

const List = styled.ul`
  display: grid;
  gap: 1rem;
  margin-top: 5rem;
  padding: 1rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 720px) {
    margin-top: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.li`
  width: 100%;
  height: 500px;
  cursor: pointer;
  img {
    object-fit: cover;
  }

  @media (max-width: 720px) {
    height: 180px;
  }
`;

const Gallery = () => {
  let page = 1;

  const [imageURL, setImageURL] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [writer, setWriter] = useState('');
  const [postId, setPostId] = useState('');

  const [defaultImages, setDefaultImages] = useState<string[]>([]);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { posts, loading, lastPage } = useSelector(
    (state: RootState) => state.posts
  );
  const { isModal } = useSelector((state: RootState) => state.postModal);

  const observer = useRef<IntersectionObserver | null>(null);
  // 감시할 타겟 엘리먼트를 참조하는 Ref
  const sentinelRef = useRef<HTMLDivElement>(null);

  const onModalActivate = (
    item: {
      user: string;
      title: string;
      contents: string;
      image: string[];
      _id: string;
    },
    randomImage?: string
  ) => {
    if (randomImage) {
      setImageURL([randomImage]);
      dispatch(setIsPostModal());
      setTitle(item.title);
      setContents(item.contents);
      setWriter(item.user);
      setPostId(item._id);
    } else {
      dispatch(setIsPostModal());
      setTitle(item.title);
      setContents(item.contents);
      setImageURL(item.image);
      setWriter(item.user);
      setPostId(item._id);
    }
  };

  const disabled = posts.length === 0 || posts.length === lastPage;

  useEffect(() => {
    dispatch(fetchGetPosts(page));
  }, []);

  useEffect(() => {
    if (posts) {
      const initialDefaultImages = Array.from(
        { length: posts.length },
        (_, index) => randomGalleryImage().url
      );
      setDefaultImages(initialDefaultImages);
    }
  }, [posts]);

  useEffect(() => {
    // observer 생성
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!disabled) {
            console.log('Load more data!');
            page++;
            dispatch(fetchGetPosts(page));
          }
        }
      },
      { threshold: 1.0 } // 타겟 엘리먼트가 완전히 뷰포트 내에 들어올 때 감지
    );

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [disabled]);

  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, []);

  return (
    <Component>
      {loading && <Loading />}

      {isModal && (
        <PostModal
          imageURL={imageURL as any}
          postTitle={title}
          postContents={contents}
          writer={writer}
          postId={postId}
        />
      )}

      <Wrapper>
        <div>
          <span className='title'>Gallery.</span>&nbsp;&nbsp;&nbsp;
          <span className='subTitle'>NewJeans</span>
        </div>

        <List>
          {!loading && posts.length === 0 && posts ? (
            <Nothing />
          ) : (
            posts.map((post, index) => (
              <Zoom triggerOnce key={index}>
                <Item>
                  {!post.image[0] || post.image[0].length === 0 ? (
                    <img
                      src={defaultImages[index]}
                      alt=''
                      onClick={() => {
                        onModalActivate(post, defaultImages[index]);
                      }}
                    />
                  ) : (
                    <img
                      onClick={() => onModalActivate(post)}
                      src={`https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/gallery/${post.image[0]}`}
                      alt=''
                    />
                  )}
                </Item>
              </Zoom>
            ))
          )}
        </List>

        <div ref={sentinelRef} style={{ height: '10px' }}></div>
      </Wrapper>
    </Component>
  );
};

export default Gallery;
