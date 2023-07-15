import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Home from './components/Home';
import Header from './components/header/Header';
import { ThemeProvider } from 'styled-components';

const theme = {
  fonts: {
    logo: 'Chela One, cursive',
    sentence: 'Nanum Pen Script, cursive',
    normally: 'Noto Sans KR, sans-serif',
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
