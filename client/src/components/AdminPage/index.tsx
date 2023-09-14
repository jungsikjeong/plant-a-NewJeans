import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { Button } from '../common/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsPostModal } from '../../store';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { fetchGetPosts } from '../../store/postsSlice';
import AdminItems from './AdminItems';
import Loading from '../Loading';
import { fetchAllNewsPosts } from '../../store/newsPostsSlice';
import AdminModal from '../Modal/AdminModal';

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
  @media (max-width: 375px) {
    height: 160vh;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
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

const SubTitle = styled.h3`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const List = styled.ul`
  background-color: white;
`;

const ListWrap = styled.div`
  max-height: 450px;
  overflow-y: scroll;
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

const Collection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 786px) {
    padding: 10px;
    grid-template-columns: 1fr;
  }
`;

const CatImage = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 2rem;
`;

const AdminPage = () => {
  let AllPostPage = 1;

  const [imageURL, setImageURL] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [writer, setWriter] = useState('');
  const [postId, setPostId] = useState('');
  const [whatClicked, setWhatClicked] = useState(''); // 새소식 혹은 갤러리게시판중 어떤걸 클릭했는지

  const { isModal } = useSelector((state: RootState) => state.postModal);
  const { posts, loading: postLoading } = useSelector(
    (state: RootState) => state.posts
  );
  const { newsPosts, loading: newsLoading } = useSelector(
    (state: RootState) => state.newsPosts
  );

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const navigator = useNavigate();

  const onModalActivate = (
    item: {
      user: string;
      title: string;
      contents: string;
      image: string[];
      _id: string;
    },
    newsClick?: boolean,
    postsClick?: boolean
  ) => {
    newsClick && setWhatClicked('news');
    postsClick && setWhatClicked('posts');
    dispatch(setIsPostModal());
    setTitle(item.title);
    setContents(item.contents);
    setImageURL(item.image);
    setPostId(item._id);
    setWriter(item.user);
  };

  useEffect(() => {
    dispatch(fetchGetPosts(AllPostPage));
    dispatch(fetchAllNewsPosts());
  }, []);

  if (postLoading || newsLoading) {
    return <Loading />;
  }

  return (
    <Component>
      {isModal && (
        <AdminModal
          whatClicked={whatClicked}
          postId={postId}
          writer={writer}
          imageURL={imageURL}
          postTitle={title}
          postContents={contents}
        />
      )}

      <Title>
        adminPage <CatImage src='/images/cat.jpg' alt='' />
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
          <List>
            <SubTitle>갤러리</SubTitle>

            <ListWrap className='scrollable-list'>
              {posts.length !== 0 &&
                posts.map((post, index) => (
                  <AdminItems
                    data={post}
                    posts={true}
                    key={index}
                    onModalActivate={onModalActivate}
                  />
                ))}
            </ListWrap>
          </List>

          <List>
            <SubTitle>새소식</SubTitle>
            <ListWrap className='scrollable-list'>
              {newsPosts.length !== 0 &&
                newsPosts.map((newsPost, index) => (
                  <AdminItems
                    data={newsPost}
                    news={true}
                    key={index}
                    onModalActivate={onModalActivate}
                  />
                ))}
            </ListWrap>
          </List>
        </Collection>
      </Wrapper>
    </Component>
  );
};

export default AdminPage;
