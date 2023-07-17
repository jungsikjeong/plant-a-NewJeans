import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Home from './components/Home';
import Header from './components/header/Header';
import Footer from './components/Footer';
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
      <Footer />
    </ThemeProvider>
  );
};

export default App;
