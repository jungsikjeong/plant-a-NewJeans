import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { StyleSheetManager } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { fetchByAuth } from './store/authSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import isPropValid from '@emotion/is-prop-valid';

import About from './components/About';
import History from './components/History/History';
import Album from './components/Album';
import Gallery from './components/Gallery';
import News from './components/News/News';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Post from './components/Post';
import KakaoCallBack from './components/KakaoCallBack';
import MyPage from './components/MyPage/MyPage';
import Home from './components/Home';
import Header from './components/header/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import EditPost from './components/EditPost';
import NewsPost from './components/News/NewsPost';
import AdminPage from './components/AdminPage';
import EditNews from './components/News/EditNews';

const theme = {
  fonts: {
    logo: 'Chela One, cursive',
    sentence: 'Nanum Pen Script, cursive',
    normally: 'Noto Sans KR, sans-serif',
  },
};

const App = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchByAuth());
  }, []);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <GlobalStyles />
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pages/About' element={<About />} />
            <Route path='/pages/history' element={<History />} />
            <Route path='/pages/album' element={<Album />} />
            <Route path='/pages/gallery' element={<Gallery />} />
            <Route path='/pages/news' element={<News />} />
            <Route path='/pages/signin' element={<SignIn />} />
            <Route path='/pages/signup' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/pages/mypage' element={<MyPage />} />
            </Route>
            <Route element={<PrivateRoute isAdmin={true} />}>
              <Route path='/pages/adminpage' element={<AdminPage />} />
            </Route>
            <Route element={<PrivateRoute isAdmin={true} />}>
              <Route path='/pages/newsPost/edit/:id' element={<EditNews />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/pages/edit/:id' element={<EditPost />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/pages/post' element={<Post />} />
            </Route>
            <Route path='/pages/newsPost' element={<NewsPost />} />
            <Route path='/auth/kakao/callback' element={<KakaoCallBack />} />

            <Route path='*' element={<Navigate replace to='/' />} />
          </Routes>
          <Footer />
        </CookiesProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
