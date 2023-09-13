import React from 'react';
import { styled } from 'styled-components';

const Component = styled.section`
  background-color: white;
`;

const Wrapper = styled.div``;

const Title = styled.h3`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

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

  .title {
    font-weight: 500;
  }

  .username {
    opacity: 0.75;
  }
`;

interface IPosts {
  contents: string;
  date: string;
  image: string[];
  title: string;
  username: string;
  user: string;
  __v: number;
  _id: string;
}
interface INewsPosts {
  contents: string;
  date: string;
  image: string[];
  title: string;
  user: string;
  __v: number;
  _id: string;
}

interface IAllPosts {
  posts?: IPosts[];
  newsPosts?: INewsPosts[];
}

const AllPosts = ({ posts, newsPosts }: IAllPosts) => {
  return (
    <Component>
      <Wrapper>
        <Title>갤러리</Title>
        {posts?.length !== 0 &&
          posts?.map((post, index) => (
            <Post key={index}>
              <img
                src={`https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/gallery/${post.image[0]}`}
                alt='갤러리 이미지'
              />
              <Contents>
                <p className='title'>{post.title}</p>
                <p className='username'>
                  {post.username} | {post.date.slice(0, 7)}
                </p>
              </Contents>
            </Post>
          ))}
      </Wrapper>
    </Component>
  );
};

export default AllPosts;
