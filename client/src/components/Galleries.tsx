import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { styled } from 'styled-components';
import PostModal from './Modal/PostModal';
import randomGalleryImage from '../utils/randomGalleryImage';
import { RootState, setIsPostModal } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useLocation } from 'react-router-dom';

const Component = styled.div`
  width: 100%;
  margin-top: 5rem;

  @media (max-width: 640px) {
    margin-top: 3rem;
  }
`;

const Wrapper = styled.div``;

const Box = styled.div<{ heightStyle?: string }>`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 250px;
  padding: 0.5rem;

  @media (min-width: 1024px) {
    height: ${({ heightStyle }) => (heightStyle ? '500px' : '700px')};
  }

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 0.625rem;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  }
`;

const OneBox = styled(Box)<{ mypage: string }>`
  width: 50%;
  height: ${({ mypage }) => (mypage ? '250px' : '700px')};

  @media (min-width: 768px) {
    margin: 0 auto;
  }
`;

interface IPost {
  _id: string;
  user: string;
  title: string;
  contents: string;
  image: string[];
  date: string;
}

interface IGalleries {
  posts?: IPost[];
  loading?: boolean;
  selectDeleteMode?: boolean;
  selectedPosts?: string[];
  setSelectedPosts?: (value: any) => void;
}

const Galleries = ({
  posts,
  loading,
  selectedPosts,
  selectDeleteMode,
  setSelectedPosts,
}: IGalleries) => {
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [writer, setWriter] = useState('');
  const [postId, setPostId] = useState('');
  const [defaultImages, setDefaultImages] = useState<string[]>([]);
  const [pathName, setPathName] = useState(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { pathname } = useLocation();
  const { isModal } = useSelector((state: RootState) => state.postModal);

  const onCheckboxChange = (postId: string) => {
    if (selectedPosts?.includes(postId)) {
      // 이미 선택된 경우 선택 해제
      setSelectedPosts &&
        setSelectedPosts(selectedPosts?.filter((id) => id !== postId));
    } else {
      // 선택되지 않은 경우 선택
      selectedPosts &&
        setSelectedPosts &&
        setSelectedPosts([...selectedPosts, postId]);
    }
  };

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
      setPostId(item._id);
      setWriter(item.user);
    } else {
      dispatch(setIsPostModal());
      setTitle(item.title);
      setContents(item.contents);
      setImageURL(item.image);
      setPostId(item._id);
      setWriter(item.user);
    }
  };

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
    setPathName(pathname === '/pages/mypage');
  }, []);

  return (
    <Component>
      {isModal && (
        <PostModal
          postId={postId}
          writer={writer}
          imageURL={imageURL}
          postTitle={title}
          postContents={contents}
        />
      )}

      {posts?.length === 1 ? (
        posts.map((post, index) => (
          <Wrapper key={index}>
            {post.image[0] === '' ? (
              <OneBox
                onClick={() => {
                  onModalActivate(post, defaultImages[index]);
                }}
                mypage={pathName ? 'true' : ''}
              >
                <img src={defaultImages[index]} alt='' />
              </OneBox>
            ) : (
              <OneBox
                onClick={() => onModalActivate(post)}
                mypage={pathName ? 'true' : ''}
              >
                <img
                  src={`https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/gallery/${post.image[0]}`}
                  alt=''
                />
              </OneBox>
            )}
          </Wrapper>
        ))
      ) : (
        <Carousel
          swipeable={true}
          showArrows={true}
          showStatus={false}
          autoPlay={false}
          infiniteLoop={false}
          centerMode={true}
          centerSlidePercentage={50}
          transitionTime={850}
          showThumbs={false}
          interval={3500}
        >
          {posts?.map((post, index) => (
            <Wrapper key={index}>
              {post.image[0] === '' ? (
                <>
                  {selectDeleteMode && (
                    <input
                      type='checkbox'
                      checked={selectedPosts?.includes(post._id)}
                      onChange={() => onCheckboxChange(post._id)}
                    />
                  )}
                  <Box
                    heightStyle={pathName ? 'true' : ''}
                    onClick={() => {
                      onModalActivate(post, defaultImages[index]);
                    }}
                  >
                    <img src={defaultImages[index]} alt='' />
                  </Box>
                </>
              ) : (
                <>
                  {selectDeleteMode && (
                    <input
                      type='checkbox'
                      checked={selectedPosts?.includes(post._id)}
                      onChange={() => onCheckboxChange(post._id)}
                    />
                  )}
                  <Box
                    onClick={() => onModalActivate(post)}
                    heightStyle={pathName ? 'true' : ''}
                  >
                    <img
                      src={`https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/gallery/${post.image[0]}`}
                      alt=''
                    />
                  </Box>
                </>
              )}
            </Wrapper>
          ))}
        </Carousel>
      )}
    </Component>
  );
};

export default Galleries;
