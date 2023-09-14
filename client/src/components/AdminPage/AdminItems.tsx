import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Component = styled.li`
  cursor: pointer;
`;

const Wrapper = styled.div``;

const Post = styled.div`
  display: flex;
  padding: 1rem;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 0.5rem;
  width: 100%;
  .title {
    display: flex;
    font-weight: 500;
  }

  .username {
    opacity: 0.75;
  }
`;

const AdminItems = ({ data, posts, news, onModalActivate }: any) => {
  return (
    <Component>
      <Wrapper>
        {data && (
          <Post onClick={() => onModalActivate(data, news, posts)}>
            {posts ? (
              <img
                src={
                  data.image.length !== 0 && data.image[0].trim() !== ''
                    ? `https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/gallery/${data?.image[0]}`
                    : '/images/defaultImage.png'
                }
                alt='갤러리 이미지'
              />
            ) : (
              <img
                src={
                  data.image.length !== 0
                    ? `https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/news/${data?.image[0]}`
                    : '/images/defaultImage.png'
                }
                alt='갤러리 이미지'
              />
            )}
            <Contents>
              <p className='title'>
                {data.title.length > 20 ? `${data.title}...` : data.title}
                <span
                  style={{
                    marginLeft: 'auto',
                  }}
                >
                  {news && (
                    <Link to={`/pages/newsPost/edit/${data._id}`}>수정</Link>
                  )}{' '}
                  <span>삭제</span>
                </span>
              </p>

              <p className='username'>
                {data.username} | {data.date.slice(0, 7)}
              </p>
            </Contents>
          </Post>
        )}
      </Wrapper>
    </Component>
  );
};

export default AdminItems;
