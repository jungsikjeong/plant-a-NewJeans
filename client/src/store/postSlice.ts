import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

interface IPost {
  contents: string;
  date: string;
  image: string[];
  imageUrls?: string[];
  title: string;
  user: string;
  __v: number;
  _id: string;
}

// 특정 게시물 가져오기
export const fetchGetPost = createAsyncThunk(
  'post/fetchByPost',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/posts/${id}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    loading: true,
    post: {} as IPost,
    error: null,
  },
  reducers: {
    clearPost(state) {
      state.post = {} as any;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchGetPost.pending, (state, action) => {
        state.loading = true;
        state.post = {
          contents: '',
          date: '',
          image: [],
          title: '',
          user: '',
          __v: '' as any,
          _id: '',
        };
      })
      .addCase(fetchGetPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.error = null;
      })
      .addCase(fetchGetPost.rejected, (state, action) => {
        state.loading = false;
        state.post = {
          contents: '',
          date: '',
          image: [],
          title: '',
          user: '',
          __v: '' as any,
          _id: '',
        };
        state.error = action.payload as any;
      });
  },
});
