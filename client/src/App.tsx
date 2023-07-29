import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Home from './components/Home';
import Header from './components/header/Header';
import Footer from './components/Footer';
import { ThemeProvider } from 'styled-components';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import About from './components/About';
import History from './components/History/History';
import Album from './components/Album';
import Gallery from './components/Gallery';
import News from './components/News/News';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const theme = {
  fonts: {
    logo: 'Chela One, cursive',
    sentence: 'Nanum Pen Script, cursive',
    normally: 'Noto Sans KR, sans-serif',
  },
};

const App = () => {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <ThemeProvider theme={theme}>
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
        </Routes>
        <Footer />
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
