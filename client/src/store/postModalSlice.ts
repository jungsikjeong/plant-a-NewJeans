import { createSlice } from '@reduxjs/toolkit';

export const postModalSlice = createSlice({
  name: 'postModalSlice',
  initialState: {
    isModal: false,
    images: [],
    postTitle: '',
    postContents: '',
    currentImageIndex: 0,
  },
  reducers: {
    setIsPostModal(state) {
      state.isModal = !state.isModal;
      state.currentImageIndex = 0; // 모달이 열릴 때마다 초기화
    },
    setPostModalClose(state) {
      state.isModal = false;
    },
    setPostModalState(state, action) {
      state.images = action.payload.uploadImages;
      state.postTitle = action.payload.title;
      state.postContents = action.payload.contents;
      state.currentImageIndex = action.payload.index; // 클릭한 이미지의 index 저장
    },
  },
});
