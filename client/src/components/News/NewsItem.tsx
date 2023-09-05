import React, { useRef } from 'react';
import { keyframes, styled } from 'styled-components';
import testData from '../../utils/testData';

const OpenAnimation = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    visibility: hidden;
  }
  to {
    max-height: 684px;
    opacity: 1;
    visibility: visible;
  }
`;
const CloseAnimation = keyframes`
  from {
    max-height: 684px;
    opacity: 1;
    visibility: visible;
  }
  to {
    max-height: 0;
    opacity: 0;
    visibility: hidden;
  }
`;

const List = styled.ul`
  border-top: 1px solid #8d8d8d;
  border-bottom: 1px solid #8d8d8d;
  font-size: 14px;
  width: 100%;
  color: #000;
`;

const Item = styled.li`
  position: relative;
  padding: 15px 0 15px 55px;
  font-size: 14px;
  border-bottom: 1px solid #e7e7e7;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &::before {
    content: 'Q';
    position: absolute;
    left: 20px;
    top: 16px;
    font-size: 13px;
    @media (max-width: 1024px) {
      left: 10px;
    }
  }

  @media (max-width: 1024px) {
    padding: 15px 0 15px 35px;
  }
`;

const SubItem = styled.div`
  position: relative;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  max-height: 0;

  .title {
    padding: 1.5rem 0;
  }

  &::before {
    content: 'A';
    position: absolute;
    left: -34px;
    top: 26px;
    font-size: 13px;
    @media (max-width: 1024px) {
      left: -24px;
    }
  }
  &.open {
    display: block;
    opacity: 1;
    visibility: visible;
    animation: ${OpenAnimation} 0.5s ease-in-out forwards;
  }

  &.close {
    animation: ${CloseAnimation} 0.5s ease-in-out forwards;
  }

  img {
    max-width: 600px;
  }
`;

interface INewsItem {
  id: number;
  title: string;
  url: string;
}

const NewsItem = ({ currentItems }: { currentItems: INewsItem[] }) => {
  const subItemRef = useRef<any[]>([]);

  const onItemClick = (itemId: number) => {
    const item = subItemRef.current[itemId];

    if (item.classList.contains('open')) {
      item.classList.remove('open');
      item.classList.add('close');
    } else {
      item.classList.remove('close');
      item.classList.add('open');
    }
  };

  return (
    <List>
      {currentItems.map((item, index) => (
        <Item onClick={() => onItemClick(item.id)} key={index}>
          <p className='title'>{item.title}</p>

          <SubItem ref={(el: any) => (subItemRef.current[item.id] = el)}>
            <p className='title'>{item.title}</p>
            <img src={item.url} alt='' />
          </SubItem>
        </Item>
      ))}
    </List>
  );
};

export default NewsItem;
