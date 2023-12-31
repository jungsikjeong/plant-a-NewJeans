import React, { FormEvent, useEffect, useState } from 'react';
import { styled, keyframes } from 'styled-components';
import NewList from './NewList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
  fetchAllNewsPosts,
  fetchSearchNewsPosts,
} from '../../store/newsPostsSlice';
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
  padding: 8.5rem 0;
  min-height: 100vh;
  animation: ${ScreenFrames} 0.75s;
  border-bottom: 1px solid #eee;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  max-height: 350px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  background-image: url('/images/뉴진스배너3.jpg');
`;

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  @media (max-width: 1024px) {
    padding: 3rem 1rem;
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: calc(60px - (1280px - 100vw) * 0.0214047);
  text-align: center;
  color: rgb(88, 88, 88);

  span {
    color: rgb(247, 129, 190);
  }
`;

const NewsWrapper = styled.div`
  margin-top: 3.5rem;
`;

const NewsSearch = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-bottom: 10px;

  select {
    outline: none;
    padding: 0.5rem 1rem;
    height: 40px;
    border: 1px solid #bbb;
  }

  input {
    outline: none;
    width: 250px;
    height: 40px;
    border: 1px solid #bbb;
    padding: 0.5rem;
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 100%;
    min-width: 40px;
    padding: 0;
    background-size: 17px;
    color: #bbb;
    transition: all 0.3s ease;

    &:hover {
      color: #000;
    }
  }
`;

const News = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchOption, setSearchOption] = useState('title');
  const [searchInput, setSearchInput] = useState('');

  const { newsPosts, loading } = useSelector(
    (state: RootState) => state.newsPosts
  );

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    const searchData = { option: searchOption, inputValue: searchInput };
    dispatch(fetchSearchNewsPosts(searchData)); // 페이지 번호 1로 고정 (초기 페이지)
  };

  useEffect(() => {
    dispatch(fetchAllNewsPosts());
  }, []);

  return (
    <Component>
      {loading && <Loading />}

      <Banner />
      <Wrapper>
        <Logo>
          <span>plant.</span> news
        </Logo>

        <NewsWrapper>
          <NewsSearch>
            <select
              onChange={(e) => setSearchOption(e.target.value)}
              value={searchOption}
            >
              <option value='title'>제목</option>
              <option value='contents'>내용</option>
              <option value='titleAndContent'>제목+내용</option>
            </select>
            &nbsp;
            <form onSubmit={onSearchSubmit}>
              <input
                type='text'
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <button onClick={onSearchSubmit}>검색</button>
            </form>
          </NewsSearch>

          <NewList itemsPerPage={itemsPerPage} items={newsPosts} />
        </NewsWrapper>
      </Wrapper>
    </Component>
  );
};

export default News;
