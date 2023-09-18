import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../api';

export interface INewsPosts {
  contents: string;
  date: string;
  image: string[];
  title: string;
  user: string;
  __v: number;
  _id: string;
}

// 전체 게시글 가져오기
export const fetchAllNewsPosts = createAsyncThunk(
  'newsPosts/fetchAllNewsPosts',
  async () => {
    const { data } = await axios.get(`/api/newsPosts`);

    // const lastPage = parseInt(headers['last-page'], 10);

    return { data };
  }
);

// 특정 게시물 가져오기
export const fetchGetNewsPost = createAsyncThunk(
  'newsPosts/fetchGetNewsPost',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/newsPosts/${id}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// 게시물 검색하기
export const fetchSearchNewsPosts = createAsyncThunk(
  'newsPosts/fetchGetNewsPosts',
  async (searchData: any, { rejectWithValue }) => {
    const { option, inputValue } = searchData;
    try {
      const { data } = await axios.get(
        `/api/newsPosts/search?option=${option}&inputValue=${inputValue}`
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const newsPostsSlice = createSlice({
  name: 'newsPostsSlice',
  initialState: {
    loading: true,
    newsPosts: [] as INewsPosts[],
    newsPost: null as INewsPosts | null,
    lastPage: 0,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNewsPosts.pending, (state, action) => {
        state.loading = true;
        state.newsPosts = [];
      })
      .addCase(fetchAllNewsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.newsPosts = state.newsPosts.concat(action.payload.data);
        // state.lastPage = action.payload.lastPage;

        state.error = null;
      })
      .addCase(fetchAllNewsPosts.rejected, (state, action) => {
        state.loading = false;
        state.newsPosts = [];
      })

      .addCase(fetchGetNewsPost.pending, (state, action) => {
        state.loading = true;
        state.newsPost = null;
      })
      .addCase(fetchGetNewsPost.fulfilled, (state, action) => {
        state.loading = false;
        state.newsPost = action.payload;
        state.error = null;
      })
      .addCase(fetchGetNewsPost.rejected, (state, action) => {
        state.loading = false;
        state.newsPost = null;
      })

      .addCase(fetchSearchNewsPosts.pending, (state, action) => {
        state.loading = true;
        state.newsPosts = [];
      })
      .addCase(fetchSearchNewsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.newsPosts = action.payload;
        // state.lastPage = action.payload.lastPage;

        state.error = null;
      })
      .addCase(fetchSearchNewsPosts.rejected, (state, action) => {
        state.loading = false;
        state.newsPosts = [];
      });
  },
});
