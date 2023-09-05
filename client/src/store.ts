import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './store/authSlice';
// import { postsSlice } from './store/postsSlice';
import { uploadImageSlice } from './store/uploadImageSlice';
import { postModalSlice } from './store/postModalSlice';
import { postsSlice } from './store/postsSlice';
import { postSlice } from './store/postSlice';

export const { logout } = authSlice.actions;
export const { setImages, oldImages, removeThatImage, removeAllImage } =
  uploadImageSlice.actions;
export const { setIsPostModal, setPostModalState, setPostModalClose } =
  postModalSlice.actions;
export const { getPosts, clearPosts } = postsSlice.actions;
export const { clearPost } = postSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    upload: uploadImageSlice.reducer,
    postModal: postModalSlice.reducer,
    posts: postsSlice.reducer,
    post: postSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
