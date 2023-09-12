import { styled } from 'styled-components';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import NewsItem from './NewsItem';

const Component = styled.div``;

const PageWrapper = styled.div`
  ul {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      padding: 0.5rem;
      color: #666;
    }
  }

  a {
    padding: 0.5rem;
    cursor: pointer;
  }

  .active {
    color: black;
    font-weight: bold;
  }
`;

interface IPaginatedItems {
  itemsPerPage: number;
  items: any;
}

const NewList = ({ itemsPerPage, items }: IPaginatedItems) => {
  // 여기서는 항목 오프셋을 사용함 페이지 오프셋을 사용할 수도 있음
  // 작업 중인 API 또는 데이터를 따름
  const [itemOffset, setItemOffset] = useState(0);

  // 다른 리소스에서 항목 가져오기를 시뮬레이션함
  // (이것은 소품의 항목이거나 로컬 상태에서 로드된 항목일 수 있음
  // useEffect 및 useState가 있는 API 끝점에서)
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // 사용자가 다른 페이지를 요청하기 위해 클릭할 때 호출
  const onPageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };

  return (
    <Component>
      <NewsItem currentItems={currentItems} />

      <PageWrapper>
        <ReactPaginate
          breakLabel='...'
          nextLabel=' >'
          onPageChange={onPageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='< '
          renderOnZeroPageCount={null}
          activeClassName='active'
        />
      </PageWrapper>
    </Component>
  );
};

export default NewList;
