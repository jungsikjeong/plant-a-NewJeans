import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface INewsPosts {
  contents: string;
  date: string;
  image: string[];
  title: string;
  user: string;
  __v: number;
  _id: string;
}

// 전체 게시글 가져오기
export const fetchGetNewsPosts = createAsyncThunk(
  'newsPosts/fetchGetNewsPosts',
  async () => {
    const { data } = await axios.get(`/api/newsPosts`);

    // const lastPage = parseInt(headers['last-page'], 10);

    return { data };
  }
);

export const newsPostsSlice = createSlice({
  name: 'newsPostsSlice',
  initialState: {
    loading: true,
    newsPosts: [] as INewsPosts[],
    lastPage: 0,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetNewsPosts.pending, (state, action) => {
        state.loading = true;
        state.newsPosts = [];
      })
      .addCase(fetchGetNewsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.newsPosts = state.newsPosts.concat(action.payload.data);
        // state.lastPage = action.payload.lastPage;

        state.error = null;
      })
      .addCase(fetchGetNewsPosts.rejected, (state, action) => {
        state.loading = false;
        state.newsPosts = [];
      });
  },
});
