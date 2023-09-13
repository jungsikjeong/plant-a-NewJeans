import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { api } from '../api';
import axios from 'axios';

// 유저 인증
export const fetchByAuth = createAsyncThunk('auth/fetchByAuth', async () => {
  const { data } = await api.get('/auth');
  return data;
});

export const fetchByKakaoLogout = createAsyncThunk(
  'auth/logoutAsync',
  async (id: string) => {
    try {
      const token = JSON.parse(localStorage.getItem('kakaoToken') as string);

      const header = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${token}`,
      };

      const data = new URLSearchParams();
      data.append('target_id', id);

      await axios.post(
        'https://kapi.kakao.com/v1/user/logout',
        data.toString(), // URL 인코딩된 문자열로 변환
        { headers: header }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: '',
    loading: false,
  },

  reducers: {
    logout(state) {
      // console.log(current(state.user));
      localStorage.removeItem('token');
      localStorage.removeItem('kakaoToken');
      localStorage.removeItem('adminToken');
      state.user = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchByAuth.pending, (state) => {
        state.user = '';
        state.loading = true;
      })
      .addCase(fetchByAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(fetchByAuth.rejected, (state) => {
        state.user = '';
        state.loading = false;
        localStorage.removeItem('token');
        localStorage.removeItem('kakaoToken');
        localStorage.removeItem('adminToken');
      });
  },
});
