import React, { useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Button } from '../common/Styles';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { api } from '../../api';
import { fetchMyPageGetPosts } from '../../store/postsSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

const fromLeftToRight = keyframes`
 from{
  left:-120rem;
 }
 to{
  left:0;
 }
`;

const Component = styled.div`
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Collection = styled.div`
  position: absolute;
  top: 0;
  left: -120rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fromLeftToRight} 0.75s forwards;
`;

const CollectionWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const CloseBtn = styled(Button)`
  position: absolute;
  right: 0;
  cursor: pointer;
  z-index: 10;
  font-size: 1.4rem;
  margin: 0 auto;
  color: #fff;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.normally};

  &:hover {
    opacity: 0.7;
  }
`;

const Trashcan = styled(Button)<{ visible: string }>`
  color: black;
  font-size: 25px;
  padding: 0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const ModeButton = styled(Button)`
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.7s;

  &:hover {
    opacity: 0.8;
  }

  &.selectBtn {
    p {
      border-bottom: 1px solid #ff8e00;
    }
  }
`;

interface IDeletePost {
  selectedPosts: string[];
  selectDeleteMode: boolean;
  setSelectDeleteMode: (value: (prev: any) => boolean) => void;
}

const DeletePost = ({
  selectDeleteMode,
  setSelectDeleteMode,
  selectedPosts,
}: IDeletePost) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onAllDelete = async () => {
    if (window.confirm('정말 게시글 모두 삭제하시겠습니까?')) {
      try {
        const res = await api.delete('/posts/all/delete');
        if (res.status === 200) {
          dispatch(fetchMyPageGetPosts());
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('아니오');
    }
  };

  const onSelectDelete = async () => {
    if (
      window.confirm(
        `총 ${selectedPosts.length}개의 게시물을 삭제하시겠습니까?`
      )
    ) {
      try {
        const data = [...selectedPosts];

        const res = await api.delete('/posts/select/delete', { data });
        if (res.status === 200) {
          dispatch(fetchMyPageGetPosts());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSelectDeleteMode = () => {
    setSelectDeleteMode((prev: any) => !prev);
  };

  // 모바일 모드에서는 툴팁 가림
  const onResize = () => {
    setIsMobile(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Component>
      <Wrapper>
        <Trashcan
          visible={!deleteMode ? 'true' : ''}
          data-tooltip-id='tooltip-2'
          onClick={() => setDeleteMode(true)}
        >
          {/* 휴지통 아이콘 */}
          <RiDeleteBin5Line />
        </Trashcan>

        {deleteMode && (
          <Collection>
            <CollectionWrap>
              <ModeButton onClick={onAllDelete}>ALL DELETE</ModeButton>

              {selectDeleteMode ? (
                <ModeButton className='selectBtn' onClick={onSelectDelete}>
                  <p>선택된 게시글 삭제하기</p>
                </ModeButton>
              ) : (
                <ModeButton onClick={onSelectDeleteMode}>
                  select delete
                </ModeButton>
              )}

              <CloseBtn
                onClick={() => {
                  setDeleteMode(false);
                  setSelectDeleteMode(() => false);
                }}
              >
                <AiOutlineClose />
              </CloseBtn>
            </CollectionWrap>
          </Collection>
        )}
      </Wrapper>

      {/* 퉅팁 */}
      {isMobile > 768 && (
        <ReactTooltip
          id='tooltip-2'
          place='bottom'
          content='클릭하면 삭제모드가 활성화 되요!'
          style={{ fontSize: '.5rem' }}
        />
      )}
    </Component>
  );
};

export default DeletePost;
