import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../api';

interface IPosts {
  contents: string;
  date: string;
  image: string[];
  title: string;
  user: string;
  __v: number;
  _id: string;
}

// 전체 게시글 가져오기
export const fetchGetPosts = createAsyncThunk(
  'posts/fetchByPosts',
  async (page: number) => {
    const { data, headers } = await axios.get(`/api/posts?page=${page}`);

    const lastPage = parseInt(headers['last-page'], 10);

    return { data, lastPage };
  }
);

// 마이페이지 게시글 가져오기
export const fetchMyPageGetPosts = createAsyncThunk(
  'posts/fetchMyPageGetPosts',
  async (_, { rejectWithValue }) => {
    try {
      // console.log(axios.defaults.headers.common['Authorization']);
      const { data } = await api.get('/users/mypage');

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState: {
    loading: true,
    posts: [] as IPosts[],
    lastPage: 0,
    error: null,
  },
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },

    clearPosts(state) {
      state.posts = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPosts.pending, (state, action) => {
        state.loading = true;
        state.posts = [];
      })
      .addCase(fetchGetPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.concat(action.payload.data);
        state.lastPage = action.payload.lastPage;
        state.error = null;
      })
      .addCase(fetchGetPosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
      })

      .addCase(fetchMyPageGetPosts.pending, (state, action) => {
        state.loading = true;
        state.posts = [];
      })
      .addCase(fetchMyPageGetPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchMyPageGetPosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.payload as any;
      });
  },
});
