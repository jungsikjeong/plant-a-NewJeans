import axios from 'axios';
import React, { useEffect } from 'react';
import { fetchByAuth } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

const KakaoCallBack = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const fetchData = async () => {
      const CODE = new URL(window.location.href).searchParams.get('code');
      const GRANT_TYPE = 'authorization_code';
      const CLIENT_ID = `${process.env.REACT_APP_REST_API}`;
      const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';

      try {
        // 카카오 토큰 요청
        const res = await axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${CODE}`,
          {},
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        );

        if (res.status === 200) {
          // 엑세스 토큰 발급
          const result = await axios.post('/api/auth/kakao', {
            access_token: res.data.access_token,
          });

          if (
            result.status === 200 &&
            result.data.token &&
            result.data.access_token
          ) {
            localStorage.setItem('token', JSON.stringify(result.data.token));
            localStorage.setItem(
              'kakaoToken',
              JSON.stringify(result.data.access_token)
            );

            dispatch(fetchByAuth());
            navigator('/');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div>KakaoCallBack</div>;
};

export default KakaoCallBack;
